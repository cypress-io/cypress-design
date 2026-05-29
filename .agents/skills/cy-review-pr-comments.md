---
name: cy-review-pr-comments
description: Use to review the latest unresolved review comments on the PR for the current branch — from any author (you, Copilot, or teammates) — triage them, agree a plan with the user before executing, update .agents/known-issues.md, and reply to or resolve each comment appropriately.
---

# cy-review-pr-comments

Review the unresolved PR comments for the current branch — **from any author**: your own review notes, Copilot, or teammates — triage each one, route actionable items to `.agents/known-issues.md`, and reply to or resolve comments appropriately. **Agree the plan with the user before executing any replies/resolves (Step 4.5).**

**Token strategy:** Steps 1–2 (fetch) and Step 5 (act) run in this session. Step 3 (classify + draft replies) is delegated to a cheap sub-agent so this session never loads the full comment corpus into its context.

## Goal

1. Fetch all open, unresolved review comments on the PR for the current branch, regardless of author.
2. Delegate classification and reply drafting to a cheap sub-agent.
3. Review the sub-agent's JSON output.
4. **Present the triage plan and get the user's go-ahead before executing (Step 4.5).**
5. Post replies, resolve threads, and append bucket-C items to `.agents/known-issues.md`.

---

## Step 1 — Find the PR

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr list --head "$BRANCH" --json number,url,headRefName --limit 1
```

Extract the PR number. If there is no open PR for this branch, stop and tell the user.

---

## Step 2 — Fetch review comments from any author (unresolved only)

Fetch every unresolved review comment, regardless of who wrote it — your own review notes, Copilot, and teammates all count. The only authors we deliberately drop are automated **status/CI bots** (e.g. `cypress[bot]` run-result summaries), which are noise, not feedback.

```bash
PR=<number>
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
OWNER="${REPO%/*}"
NAME="${REPO#*/}"

# Authors to drop: automated status/CI bots that post run summaries, not feedback.
# Everything else (you, Copilot, teammates) is in scope. Extend this regex if other
# status bots show up — do NOT add real reviewers.
NOISE_BOTS='^(cypress\[bot\]|github-actions\[bot\]|codecov\[bot\])$'

# Get IDs of already-resolved threads so we can skip them. Apply the SAME `NOISE_BOTS`
# exclusion used below — otherwise a resolved thread owned by a filtered bot would inflate
# RESOLVED_COUNT and break the `TOTAL_INSCOPE == RESOLVED_COUNT + UNRESOLVED_COUNT` check.
# Paginate via `endCursor` — `first:100` alone misses threads on large PRs.
# gh api --jq can't take `--arg`, so emit {id, login} and apply the noise filter in a
# standalone jq (which can).
RESOLVED_IDS=$(gh api graphql --paginate -f query='
  query($owner:String!, $repo:String!, $pr:Int!, $endCursor:String) {
    repository(owner:$owner, name:$repo) {
      pullRequest(number:$pr) {
        reviewThreads(first:100, after:$endCursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            isResolved
            comments(first:1) {
              nodes { databaseId author { login } }
            }
          }
        }
      }
    }
  }
' -f owner="$OWNER" -f repo="$NAME" -F pr=$PR \
  --jq '.data.repository.pullRequest.reviewThreads.nodes[]
        | select(.isResolved == true)
        | {id: .comments.nodes[0].databaseId, login: .comments.nodes[0].author.login}' \
  | jq -s --arg noise "$NOISE_BOTS" '[.[] | select(.login | test($noise) | not) | .id]')

# Inline review comments — root comments only, any author except noise bots, excluding
# already-resolved threads.
# IMPORTANT: filter to ROOT comments (`in_reply_to_id == null`). A review thread is keyed
# by its root comment; replies share the thread's resolved state but have their own ids.
# `RESOLVED_IDS` only holds each thread's first (root) comment id, so without this filter a
# reply inside a resolved thread leaks back in as "unresolved" (and the sanity math below
# breaks). Triaging root comments also means one row per thread, which is what you want.
# IMPORTANT: pipe to standalone `jq` (not `gh api --jq`). `gh api --jq` does NOT
# forward `--argjson`/`--arg` to the underlying jq, so the filters would silently no-op.
gh api "repos/$REPO/pulls/$PR/comments" --paginate \
  | jq --argjson resolved "$RESOLVED_IDS" --arg noise "$NOISE_BOTS" \
    '[.[] | select(.in_reply_to_id == null)
          | select(.user.login | test($noise) | not)
          | select(.id as $id | $resolved | index($id) | not)
          | {id, author: .user.login, body, path, line, original_line, pull_request_review_id, html_url}]'

# Top-level review bodies (any author except noise bots). Pipe to standalone `jq`
# so `--arg` is honored (gh api --jq does not forward it).
gh api "repos/$REPO/pulls/$PR/reviews" --paginate \
  | jq --arg noise "$NOISE_BOTS" '[.[] | select(.user.login | test($noise) | not)
        | select(.body != "")
        | {id, author: .user.login, body, html_url}]'
```

Collect the output as a compact JSON array — this is the only data the sub-agent needs. Keep the `author` field on each item so the sub-agent (and you) can weight feedback by source. If the filtered array is empty, stop and tell the user there are no unresolved comments to triage.

### Sanity check before dispatching to the sub-agent

Before passing comments to the sub-agent, verify the filter actually ran. Compute three counts and confirm the math:

```bash
# Count ROOT comments only — one per thread — so this matches RESOLVED_IDS (also one
# root id per resolved thread) and the root-only fetch above.
TOTAL_INSCOPE=$(gh api "repos/$REPO/pulls/$PR/comments" --paginate \
  | jq --arg noise "$NOISE_BOTS" '[.[] | select(.in_reply_to_id == null) | select(.user.login | test($noise) | not)] | length')
RESOLVED_COUNT=$(echo "$RESOLVED_IDS" | jq 'length')
UNRESOLVED_COUNT=<length of the filtered array you just produced>
```

`TOTAL_INSCOPE` MUST equal `RESOLVED_COUNT + UNRESOLVED_COUNT`. If it doesn't, the resolved-thread filter is broken — STOP and investigate before invoking the sub-agent. Otherwise the sub-agent will dutifully classify already-fixed comments as "Already Fixed" and produce a plan that posts redundant replies on resolved threads. (Both sides count one root comment per thread; `RESOLVED_IDS` spans all authors, matching the all-author scope of the fetch.)

---

## Step 3 — Delegate to a cheap sub-agent

Spawn the smallest/cheapest model available and ask it to classify every comment and draft a reply for each. Pass only the comment JSON and the triage rules — do not give it the full codebase or architecture docs.

### Claude Code

```bash
claude --model claude-haiku-4-5 --print "$(cat <<'PROMPT'
You are triaging PR review comments for the cypress-io/cypress-design repository. Comments come from
mixed authors — identified by the `author` field on each item: the repo owner/teammates (humans)
and Copilot (the `copilot`/`*-bot` reviewer). Classify each comment into exactly one bucket and
draft a short reply.

Weight feedback by author:
- HUMAN authors (repo owner, teammates): treat as high-signal intent. Do NOT bucket-B a human's own
  comment as "misunderstands the codebase" — they set the conventions. If a human asks for a change,
  it is almost always bucket C (actionable) unless it's already fixed (bucket A). When unsure what a
  human meant, say so in the reply rather than dismissing it.
- COPILOT: often wrong. Do not default to agreeing. Evaluate on merits — many comments flag
  intentional patterns, misunderstand the codebase, or add no value. Prefer bucket B over C when
  there is genuine doubt.

BUCKETS
A  Already Fixed   — the concern was addressed in a later commit; code no longer exists or was changed.
B  Irrelevant      — flags an intentional repo pattern, misunderstands the codebase, or lacks the context to be actionable.
C  Actionable      — a real issue not yet fixed, confirmed after independent evaluation.

REPO POLICIES (use these to identify bucket B comments)
- Tailwind-only: no SASS, CSS Modules, or styled-components
- No hex colors: always use design tokens / Tailwind classes
- WindiCSS remnants are tracked migration debt — do not fix now
- "Consider adding comments" suggestions are out of scope unless they explain a non-obvious WHY
- Accessibility covered in a component's instructions.md is already handled
- Anything contradicting .agents/architecture.md or the design pillar files (.agents/index.md routes to colors, typography, spacing, iconography, voice, principles)

REPLY TEMPLATES (2–4 sentences, plain text, no markdown headers)
A: "Fixed — [what changed and why it satisfies the concern]."
B: "Closing as out-of-scope: [one sentence on the repo policy]. See [file] for details."
C: "Acknowledged. [One sentence on the planned fix]. Tracked in .agents/known-issues.md."

For bucket C also output:
- category: one of "User Experience" | "Security & Privacy" | "Accessibility & Standards" | "Developer Experience" | "Code Quality"
- severity: one of "Critical" | "High" | "Medium" | "Low" | "Possible"
- title: short noun phrase (≤8 words)
- description: one sentence

OUTPUT: a single JSON array — one object per comment, no extra text.
Schema: [{id, bucket, reply, category?, severity?, title?, description?}]

COMMENTS:
<paste compact JSON array here>
PROMPT
)"
```

### Other agents (Codex, Gemini CLI, etc.)

Use the equivalent "non-interactive, cheapest model" flag for your tool. Pass the same prompt above. The output must be the JSON array — instruct the model accordingly.

### Fallback (no sub-agent support)

If your environment cannot spawn a sub-agent, perform the classification yourself using the same rules above, then continue to Step 4.

---

## Step 4 — Review sub-agent output

Parse the JSON array. Sanity-check:

- Every input comment has exactly one output object.
- Bucket C entries have `category`, `severity`, `title`, and `description`.
- Reply text looks reasonable (no hallucinated file names, correct bucket tone).

**Do not rubber-stamp the sub-agent output.** For every bucket C entry, read the flagged code yourself and confirm the concern is real. Downgrade to bucket B if the comment flags an intentional pattern or doesn't hold up under scrutiny. It is expected and desirable to push back on Copilot — a well-reasoned bucket B reply is better than an unnecessary code change. (Don't apply that skepticism to a human author's own comments — see Step 3.)

---

## Step 4.5 — Agree the plan before executing

**Do not post replies, resolve threads, or write to `.agents/known-issues.md` until the user has signed off on the plan.** Figuring out _what to do_ with each comment is a separate step from _doing it_ — surface the triage first.

Present a compact table the user can skim — one row per comment:

| #   | Author     | Where            | Bucket | Proposed action                                        | Code change?     |
| --- | ---------- | ---------------- | ------ | ------------------------------------------------------ | ---------------- |
| 1   | ryanjwilke | `Tooltip.vue:36` | C      | Drop redundant comment; move rationale into spacing.md | yes (this round) |
| 2   | Copilot    | `Plans.vue:12`   | B      | Close out-of-scope (intentional pattern)               | no               |

For each row also show the one-line reply you'll post. Then ask for a go-ahead. Honor scoped answers — the user may approve some rows and defer or override others (e.g. "reply but don't resolve #1", "skip #2"). Apply any bucket/severity/action corrections the user gives before proceeding.

Only after the user approves do you move to Step 5. Bucket-C code changes the user approves should be made (and verified) **before** you post the matching "Fixed in `<sha>`" reply.

In a fully autonomous run (`CI=true`, no human present), skip the interactive sign-off but still produce the table in your output as the record of what you decided, then proceed.

---

## Step 5 — Reply and resolve, one thread at a time

For every entry in the sub-agent's JSON output, do reply-then-resolve **back-to-back before moving to the next entry**. Don't batch all replies and then all resolves — that splits the audit trail and makes it easy to leave threads dangling when something interrupts you mid-loop.

### Resolve-or-leave-open rule

Resolve immediately after posting the reply when the reply says any of:

- **"Fixed in `<sha>`"** — Bucket A, or Bucket C you fixed inline in this same round.
- **"Closing as out-of-scope"** / Copilot misread / intentional pattern — Bucket B.

Leave the thread **open** only when the reply says the work is **tracked for later** in `.agents/known-issues.md` — a real Bucket C you've logged but haven't fixed in this round. Those threads are the visible signal that follow-up is owed.

### 5a. Post the reply

Inline comments — use `in_reply_to`:

```bash
gh api "repos/$REPO/pulls/$PR/comments" \
  -X POST \
  -f body="<reply>" \
  -F in_reply_to=<comment_id>
```

Top-level review bodies — post as a PR issue comment:

```bash
gh api "repos/$REPO/issues/$PR/comments" \
  -X POST \
  -f body="<reply>"
```

### 5b. Resolve the thread (skip only for tracked-for-later Bucket C)

```bash
# 1. Get thread node IDs (paginated — `first:100` alone misses threads on large PRs)
gh api graphql --paginate -f query='
  query($owner:String!, $repo:String!, $pr:Int!, $endCursor:String) {
    repository(owner:$owner, name:$repo) {
      pullRequest(number:$pr) {
        reviewThreads(first:100, after:$endCursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            id
            isResolved
            comments(first:1) { nodes { databaseId } }
          }
        }
      }
    }
  }
' -f owner="$OWNER" -f repo="$NAME" -F pr=$PR \
  --jq '.data.repository.pullRequest.reviewThreads.nodes[]
        | select(.comments.nodes[0].databaseId == <comment_id>)
        | .id'

# 2. Resolve
gh api graphql -f query='
  mutation($threadId:ID!) {
    resolveReviewThread(input:{threadId:$threadId}) {
      thread { isResolved }
    }
  }
' -f threadId="<thread_node_id>"
```

**Perf tip:** fetch all thread node IDs once at the start of Step 5 (single graphql call → map of `databaseId → threadId`) instead of one round-trip per comment.

---

## Step 6 — Update `.agents/known-issues.md`

For every bucket C entry that is **not fixed inline this round**, add an item to `.agents/known-issues.md` (create the file if it doesn't exist).

### File structure

```markdown
# Known Issues

## Known Issues

### User Experience

### Security & Privacy

### Accessibility & Standards

### Developer Experience

### Code Quality
```

### Entry format

```markdown
- **[Severity] Title** — Description. `path/to/file.ts:line` _(PR #NNN, <author>)_
```

### Sorting rule

Keep severity tags (**Critical** → **High** → **Medium** → **Low** → **Possible**) and **always re-sort the entire category top-to-bottom by severity** after adding or editing an item — don't just append.

### Category assignment

Assign each issue to its most critical category:

- XSS risk → Security & Privacy
- Missing `aria-label` breaking keyboard nav → Accessibility & Standards
- Flaky test masking a regression → Developer Experience

---

## Step 7 — Re-request Copilot review (optional)

If this round addressed Copilot findings and you want another pass, add Copilot to `requested_reviewers`:

```bash
gh pr edit "$PR" --add-reviewer "@copilot"
```

**Use the `gh` CLI, not the raw REST call.** `gh api -X POST .../requested_reviewers -f 'reviewers[]=Copilot'` silently no-ops when Copilot has already reviewed the PR. `gh pr edit --add-reviewer "@copilot"` handles the "re-request after prior review" case correctly.

Skip this step if the only changes since the previous review round are reply text or doc edits Copilot already saw (no production code changes).

### Hard stop conditions (break the death spiral)

Copilot can loop indefinitely — every push triggers a new pass, and it often finds _something_ (often a Low nit or a hallucinated path). Stop and declare done when any of these fire:

1. **3-round cap.** After 3 re-review rounds on a single PR, stop regardless of new findings.
2. **Zero-Medium+ rule.** If a round produces only Low severity, "Possible", or "consider…"-class findings, do not re-trigger Copilot. Reply, resolve, and stop.
3. **Hallucination guard.** If Copilot flags the same nonexistent path or symbol twice across rounds (verified by `ls` / `grep` returning nothing), stop. Post a single reply pointing out the file does not exist; do not round-trip further.
4. **No-code-change rule.** If the only changes since the previous round are reply text or doc edits Copilot already reviewed, skip the re-request entirely.

---

## Checklist

- [ ] Comments fetched from all authors (you, Copilot, teammates); only status/CI bots filtered out
- [ ] Already-resolved threads filtered out before classification
- [ ] `TOTAL_INSCOPE == RESOLVED_COUNT + UNRESOLVED_COUNT` sanity check passed before sub-agent dispatch
- [ ] Stopped early if no unresolved comments remain
- [ ] All unresolved comments (any author) have a sub-agent classification
- [ ] Sub-agent output reviewed for correctness; human-authored comments weighted as high-signal (not auto-bucket-B)
- [ ] Triage plan presented and user signed off before any replies/resolves/known-issues writes (Step 4.5)
- [ ] Every comment has a posted reply, with the matching resolve call made immediately after (not batched)
- [ ] Threads where the reply said "fixed" or "out of scope" are resolved on GitHub (covers Bucket A, B, and any Bucket C fixed inline in this round)
- [ ] Threads where the reply said "tracked under Known Issues" are left open
- [ ] Bucket C entries appended to `.agents/known-issues.md`, sorted by severity within each category
- [ ] Copilot re-review triggered only if there were Copilot findings and production code changed (Step 7)
