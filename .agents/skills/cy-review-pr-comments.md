---
name: cy-review-pr-comments
description: Use to review the latest GitHub Copilot review comments on the PR for the current branch, triage them, update .agents/known-issues.md, and reply to or resolve each comment appropriately.
---

# cy-review-pr-comments

Review Copilot PR comments for the current branch, triage each one, update the known-issues log, and reply to or resolve comments appropriately.

## Goal

1. Fetch all open Copilot review comments on the PR for the current branch.
2. For each comment, decide the outcome (fix acknowledged / irrelevant / already fixed).
3. Reply to and/or resolve each comment on GitHub.
4. Add new actionable issues to `.agents/known-issues.md`.

---

## Step 1 — Find the PR

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr view --head "$BRANCH" --json number,url,headRefName
```

Extract the PR number. If there is no open PR for this branch, stop and tell the user.

---

## Step 2 — Fetch Copilot review comments

Fetch all review threads that are **not yet resolved** and were left by GitHub Copilot:

```bash
PR=<number>
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

# Pull review comments (inline, on code)
gh api "repos/$REPO/pulls/$PR/comments" --paginate \
  --jq '[.[] | select(.user.login | test("copilot"; "i"))]'

# Pull top-level review bodies (non-inline)
gh api "repos/$REPO/pulls/$PR/reviews" --paginate \
  --jq '[.[] | select(.user.login | test("copilot"; "i"))]'
```

For each comment capture:

- `id` — comment ID (needed for replies and resolution)
- `body` — the text of the comment
- `path` — file path (for inline comments)
- `line` / `original_line` — line number
- `pull_request_review_id` — parent review ID
- `html_url` — link for reference

---

## Step 3 — Triage each comment

Classify every comment into one of three buckets:

### A — Already Fixed

The concern was addressed in a subsequent commit on this branch. Evidence: the code the comment refers to no longer exists or was changed to satisfy the concern.

**Action:** Reply with a brief explanation of what was done, then resolve.

### B — Irrelevant / Out of Context

The comment flags a pattern that is intentional in this repo, is addressed elsewhere in the codebase, or requires context the reviewer could not have (e.g., WindiCSS migration in progress, Web Components shadow DOM encapsulation, Tailwind-only styling policy, known-issues already tracked). These comments cost more to change than they are worth.

Common irrelevant patterns in this repo:

- Suggestions to add SASS/CSS Modules/styled-components (Tailwind-only policy)
- Complaints about WindiCSS remnants (tracked migration debt, do not fix now)
- Generic "add error handling" in internal design-system utilities (not user-facing)
- Suggestions to add hex colors (design token policy forbids hex)
- "Consider adding comments" on code that is intentionally terse by repo policy
- Accessibility suggestions that are already covered by the component's `instructions.md`
- Any suggestion that contradicts `.agents/architecture.md` or `.agents/design.md`

**Action:** Reply explaining why the comment does not apply (cite the relevant policy, file, or known-issue), then resolve.

### C — Valid / Actionable

The comment identifies a real issue that should be fixed but has not been yet.

**Action:** Reply acknowledging the issue, briefly describe the fix plan, and add the issue to `.agents/known-issues.md`. Do **not** resolve yet — leave open so the fix can be tracked.

---

## Step 4 — Reply to comments

Use the GitHub API to post a reply to each inline comment:

```bash
gh api "repos/$REPO/pulls/$PR/comments" \
  -X POST \
  -f body="<your reply text>" \
  -f in_reply_to=<comment_id>
```

For top-level review bodies, reply as a PR comment:

```bash
gh api "repos/$REPO/issues/$PR/comments" \
  -X POST \
  -f body="<your reply text>"
```

### Reply tone guidelines

- Be concise (2–4 sentences max).
- For **A (Already Fixed)**: "Fixed in [short description] — [what changed and why it satisfies the concern]."
- For **B (Irrelevant)**: "Closing as out-of-scope: [one sentence explaining the repo policy or context that makes this inapplicable]. See [file/doc] for details."
- For **C (Actionable)**: "Acknowledged. [One sentence describing the planned fix]. Tracked in `.agents/known-issues.md`."

---

## Step 5 — Resolve comments

GitHub does not expose a direct "resolve thread" REST endpoint for pull request review comment threads. Use the GraphQL API instead:

```bash
# Get the thread node ID for the comment
THREAD_NODE_ID=$(gh api graphql -f query='
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
        | .id')

# Resolve the thread
gh api graphql -f query='
  mutation($threadId:ID!) {
    resolveReviewThread(input:{threadId:$threadId}) {
      thread { isResolved }
    }
  }
' -f threadId="$THREAD_NODE_ID"
```

Resolve threads in buckets **A** and **B** after posting the reply.  
Leave bucket **C** threads open.

---

## Step 6 — Update `.agents/known-issues.md`

For every bucket **C** comment, append the issue to `.agents/known-issues.md`.

### File location

`.agents/known-issues.md` — create if it does not exist.

### File structure

```markdown
# Known Issues

## Known Issues

### User Experience

<!-- Issues that directly impact end-user functionality, navigation, or content display -->

### Security & Privacy

<!-- Authentication, authorization, XSS risks, data leakage, cache control -->

### Accessibility & Standards

<!-- WCAG compliance, semantic HTML, SEO (noindex/indexation) -->

### Developer Experience

<!-- Test reliability, build-time errors, development environment issues -->

### Code Quality

<!-- Unused code, duplication, technical debt, inconsistencies (non-user-facing) -->
```

### Categories

| Category                      | What belongs here                                                           |
| ----------------------------- | --------------------------------------------------------------------------- |
| **User Experience**           | Directly impacts end-user functionality, navigation, or content display     |
| **Security & Privacy**        | Authentication, authorization, XSS risks, data leakage, cache control       |
| **Accessibility & Standards** | WCAG compliance, semantic HTML, SEO (noindex/indexation)                    |
| **Developer Experience**      | Test reliability, build-time errors, development environment issues         |
| **Code Quality**              | Unused code, duplication, technical debt, inconsistencies (non-user-facing) |

Assign each issue to its **primary** category based on the most critical aspect.

### Severity levels (within each category)

`Critical` → `High` → `Medium` → `Low` → `Possible`

### Entry format

```markdown
- **[Severity] Short title** — One-sentence description. `path/to/file.ts:line` _(PR #NNN, Copilot)_
```

### Sorting rule

**After adding or editing any entry, re-sort the entire category so that Critical/High items precede Medium, and Medium precedes Low.** Verify the ordering of every category you touch before considering the edit complete.

### Category assignment for multi-aspect issues

If an issue spans multiple categories, assign it to the most critical one:

- XSS risk → Security & Privacy (not Code Quality)
- Missing `aria-label` on a button that breaks keyboard nav → Accessibility & Standards (not UX)
- A flaky test that masks a real regression → Developer Experience (not Code Quality)

---

## Checklist

Before finishing, confirm:

- [ ] All Copilot comments were reviewed (none skipped)
- [ ] Every comment received a reply
- [ ] Bucket A and B threads are resolved on GitHub
- [ ] Bucket C threads are left open
- [ ] `.agents/known-issues.md` entries are sorted by severity within each category
- [ ] No new entries were appended without re-sorting their category
