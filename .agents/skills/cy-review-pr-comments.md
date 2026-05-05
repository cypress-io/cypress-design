---
name: cy-review-pr-comments
description: Use to review the latest GitHub Copilot review comments on the PR for the current branch, triage them, update .agents/known-issues.md, and reply to or resolve each comment appropriately.
---

# cy-review-pr-comments

Review Copilot PR comments for the current branch, triage each one, update the known-issues log, and reply to or resolve comments appropriately.

**Token strategy:** Steps 1–2 (fetch) and Step 5 (act) run in this session. Step 3 (classify + draft replies) is delegated to a cheap sub-agent so this session never loads the full comment corpus into its context.

## Goal

1. Fetch all open Copilot review comments on the PR for the current branch.
2. Delegate classification and reply drafting to a cheap sub-agent.
3. Review the sub-agent's JSON output.
4. Post replies, resolve threads, and write `.agents/known-issues.md`.

---

## Step 1 — Find the PR

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr view --head "$BRANCH" --json number,url,headRefName
```

Extract the PR number. If there is no open PR for this branch, stop and tell the user.

---

## Step 2 — Fetch Copilot review comments

```bash
PR=<number>
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

# Inline review comments
gh api "repos/$REPO/pulls/$PR/comments" --paginate \
  --jq '[.[] | select(.user.login | test("copilot"; "i"))
        | {id, body, path, line, original_line, pull_request_review_id, html_url}]'

# Top-level review bodies
gh api "repos/$REPO/pulls/$PR/reviews" --paginate \
  --jq '[.[] | select(.user.login | test("copilot"; "i"))
        | {id, body, html_url}]'
```

Collect the output as a compact JSON array — this is the only data the sub-agent needs.

---

## Step 3 — Delegate to a cheap sub-agent

Spawn the smallest/cheapest model available in your environment and ask it to classify every comment and draft a reply for each. Pass only the comment JSON and the triage rules — do not give it the full codebase or architecture docs.

### Claude Code

```bash
claude --model claude-haiku-4-5 --print "$(cat <<'PROMPT'
You are triaging GitHub Copilot PR review comments for the cypress-design repository.
Classify each comment into exactly one bucket and draft a short reply.

BUCKETS
A  Already Fixed   — the concern was addressed in a later commit; code no longer exists or was changed.
B  Irrelevant      — flags an intentional repo pattern or lacks the context to be actionable.
C  Actionable      — a real issue not yet fixed.

REPO POLICIES (use these to identify bucket B comments)
- Tailwind-only: no SASS, CSS Modules, or styled-components
- No hex colors: always use design tokens / Tailwind classes
- WindiCSS remnants are tracked migration debt — do not fix now
- "Consider adding comments" suggestions are out of scope
- Accessibility covered in a component's instructions.md is already handled
- Anything contradicting .agents/architecture.md or .agents/design.md

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

Correct any obvious errors before proceeding. You do not need to re-read the full comment bodies — the sub-agent output is the source of truth for this step.

---

## Step 5 — Post replies

**Inline comments** — use `in_reply_to`:

```bash
gh api "repos/$REPO/pulls/$PR/comments" \
  -X POST \
  -f body="<reply>" \
  -F in_reply_to=<comment_id>
```

**Top-level review bodies** — post as a PR issue comment:

```bash
gh api "repos/$REPO/issues/$PR/comments" \
  -X POST \
  -f body="<reply>"
```

---

## Step 6 — Resolve threads (buckets A and B only)

GitHub requires the GraphQL API to resolve a review thread:

```bash
# 1. Get thread node IDs
gh api graphql -f query='
  query($owner:String!, $repo:String!, $pr:Int!) {
    repository(owner:$owner, name:$repo) {
      pullRequest(number:$pr) {
        reviewThreads(first:100) {
          nodes {
            id
            isResolved
            comments(first:1) { nodes { databaseId } }
          }
        }
      }
    }
  }
' -f owner="<owner>" -f repo="<repo>" -F pr=<number> \
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

Leave bucket C threads open.

---

## Step 7 — Update `.agents/known-issues.md`

For every bucket C entry in the sub-agent output, add an item to `.agents/known-issues.md` (create the file if it doesn't exist).

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
- **[Severity] Title** — Description. `path/to/file.ts:line` _(PR #NNN, Copilot)_
```

### Sorting rule

Re-sort every category you touch top-to-bottom by severity (`Critical` → `High` → `Medium` → `Low` → `Possible`) before finishing. Do not just append.

### Category assignment

Assign each issue to its most critical category:

- XSS risk → Security & Privacy
- Missing `aria-label` breaking keyboard nav → Accessibility & Standards
- Flaky test masking a regression → Developer Experience

---

## Checklist

- [ ] All Copilot comments have a sub-agent classification
- [ ] Sub-agent output reviewed for correctness
- [ ] Every comment has a posted reply
- [ ] Bucket A and B threads are resolved on GitHub
- [ ] Bucket C threads are left open
- [ ] `.agents/known-issues.md` entries sorted by severity within each category
