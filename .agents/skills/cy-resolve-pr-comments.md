---
name: cy-resolve-pr-comments
description: Use to reply to and resolve open Copilot PR review threads that have been addressed by recent commits. Delegates "was this fixed?" analysis to a cheap sub-agent, then posts replies and resolves threads on GitHub.
---

# cy-resolve-pr-comments

For each open Copilot review thread on the current PR, determine whether recent commits have addressed the concern, post a reply explaining the fix, and resolve the thread.

**Token strategy:** Steps 1–2 (fetch) and Step 5 (act) run in this session. Step 3 (analysis + reply drafting) is delegated to a cheap sub-agent.

## Goal

1. Fetch all open (unresolved) Copilot threads and recent commits.
2. Delegate "fixed or not?" analysis to a cheap sub-agent.
3. Post replies on threads the sub-agent marks as fixed.
4. Resolve those threads on GitHub.

---

## Step 1 — Find the PR

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr view "$BRANCH" --json number,url,headRefName
```

Extract the PR number. Stop and tell the user if no open PR exists.

---

## Step 2 — Fetch open threads and recent commits

```bash
PR=<number>
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
OWNER=$(echo "$REPO" | cut -d/ -f1)
REPONAME=$(echo "$REPO" | cut -d/ -f2)

# Open (unresolved) Copilot inline comments
gh api "repos/$REPO/pulls/$PR/comments" --paginate \
  --jq '[.[] | select(.user.login | test("copilot"; "i"))
        | {id, body, path, line}]' > /tmp/copilot-comments.json

# Thread resolution state — keep only unresolved ones
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
' -f owner="$OWNER" -f repo="$REPONAME" -F pr=$PR \
  --jq '[.data.repository.pullRequest.reviewThreads.nodes[]
        | select(.isResolved == false)
        | {threadId: .id, commentId: .comments.nodes[0].databaseId}]' \
  > /tmp/open-threads.json

# Cross-reference: only comments whose thread is unresolved
OPEN_COMMENT_IDS=$(jq '[.[].commentId]' /tmp/open-threads.json)
jq --argjson ids "$OPEN_COMMENT_IDS" \
  '[.[] | select(.id as $id | $ids | index($id) != null)]' \
  /tmp/copilot-comments.json > /tmp/open-comments.json

# Recent commits on this branch since it diverged from main
git log main..HEAD --oneline | head -30 > /tmp/recent-commits.txt

# Diff of those commits
git diff main...HEAD --stat > /tmp/diff-stat.txt
git diff main...HEAD > /tmp/diff.txt
```

If `/tmp/open-comments.json` is an empty array, stop and tell the user there are no open Copilot threads to resolve.

---

## Step 3 — Delegate to a cheap sub-agent

Pass the open comments, recent commits, and diff to the cheapest model. Ask it to decide — for each comment — whether the concern has been addressed.

### Claude Code

```bash
claude --model claude-haiku-4-5 --print "$(cat <<'PROMPT'
You are reviewing open GitHub Copilot PR comments to determine whether recent
commits have already addressed each concern.

For each comment, output one of:
  FIXED   — the concern is clearly resolved by the commits/diff below
  OPEN    — not yet addressed

If FIXED, also draft a short reply (2–4 sentences) explaining what changed.

REPLY STYLE
- Plain text, no markdown headers
- Start with "Fixed — " followed by what changed and why it satisfies the concern
- Be specific: name the file or line if helpful

OUTPUT: a single JSON array, one object per comment, no extra text.
Schema: [{id, verdict, reply?}]
  id      — the comment id (integer)
  verdict — "FIXED" or "OPEN"
  reply   — present only when verdict is "FIXED"

OPEN COPILOT COMMENTS:
<contents of /tmp/open-comments.json>

RECENT COMMITS:
<contents of /tmp/recent-commits.txt>

DIFF STAT:
<contents of /tmp/diff-stat.txt>

DIFF:
<contents of /tmp/diff.txt>
PROMPT
)"
```

Populate the `<contents of ...>` placeholders with the actual file contents before running. Pipe or here-doc the full diff in — do not truncate it.

### Fallback (no sub-agent support)

Perform the analysis yourself using the same rules and output the same JSON schema, then continue to Step 4.

---

## Step 4 — Review sub-agent output

Parse the JSON. Sanity-check:

- Every open comment has exactly one output object.
- `FIXED` verdicts have a `reply` field.
- Reply text references real files/changes from the diff (no hallucinations).
- Tone is correct ("Fixed — …").

Correct any obvious errors before proceeding.

---

## Step 5 — Post replies and resolve threads

For each comment where `verdict == "FIXED"`:

**Post the reply:**

```bash
gh api "repos/$REPO/pulls/$PR/comments" \
  -X POST \
  -f body="<reply>" \
  -F in_reply_to=<comment_id>
```

**Look up the thread node ID** (use `/tmp/open-threads.json` already fetched):

```bash
jq -r --argjson id <comment_id> \
  '.[] | select(.commentId == $id) | .threadId' \
  /tmp/open-threads.json
```

**Resolve the thread:**

```bash
gh api graphql -f query='
  mutation($threadId:ID!) {
    resolveReviewThread(input:{threadId:$threadId}) {
      thread { isResolved }
    }
  }
' -f threadId="<thread_node_id>"
```

Leave `OPEN` threads untouched.

---

## Checklist

- [ ] Open threads fetched and filtered to Copilot-only
- [ ] Stopped early if no open threads remain
- [ ] Sub-agent output reviewed for accuracy
- [ ] Reply posted on every FIXED thread
- [ ] Every FIXED thread resolved via GraphQL
- [ ] OPEN threads left untouched
