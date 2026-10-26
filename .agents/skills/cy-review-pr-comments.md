---
name: cy-review-pr-comments
description: Use to review the unresolved review comments on the PR for the current branch — from any author (you, Copilot, or teammates) — triage them, agree a plan with the user before acting, open GitHub issues for follow-ups, and reply to each comment. Never resolves threads.
---

# cy-review-pr-comments

Triage every unresolved review comment on the current branch's PR, agree the plan with the user, then make the fixes, open issues for deferred work, and reply.

**Never resolve a thread.** The person who opened it resolves it once they've confirmed the reply or the fix. Your reply is the hand-off.

## Step 1 — Fetch what needs a reply

```bash
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
PR=$(gh pr view --json number -q .number)   # stop if there's no open PR
MARK='<!-- cy-review-pr-comments -->'
```

Every reply this skill posts ends with `$MARK`. You usually post as the user's own GitHub account, so the login can't tell your replies from the user's own review notes; the marker can.

**Inline threads.** Keep threads that are unresolved and whose last comment doesn't carry the marker. Since you never resolve, a thread you've already answered stays unresolved; skipping it stops a re-run from replying twice. Paginate — `first:100` alone misses threads on large PRs.

```bash
gh api graphql --paginate -F owner="${REPO%/*}" -F repo="${REPO#*/}" -F pr="$PR" -f query='
  query($owner:String!, $repo:String!, $pr:Int!, $endCursor:String) {
    repository(owner:$owner, name:$repo) { pullRequest(number:$pr) {
      reviewThreads(first:100, after:$endCursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          isResolved path line
          rootComment: comments(first:1) { nodes { databaseId author { login } body url } }
          lastComment: comments(last:1) { nodes { body } }
        }
      }
    } }
  }' --jq '.data.repository.pullRequest.reviewThreads.nodes[]
           | select(.isResolved | not)
           | {path, line, root: .rootComment.nodes[0], lastBody: .lastComment.nodes[0].body}' \
  | jq -s --arg mark "$MARK" '[.[] | select(.lastBody | contains($mark) | not) | del(.lastBody)]'
```

`gh api --jq` doesn't forward `--arg`/`--argjson`, so any filter that needs a variable goes in a standalone `jq`, as above.

**Top-level review comments** have no resolved state, so filter them by time: keep human reviews with a body, submitted after your last marked PR comment. Skip Copilot's review bodies — they summarize its inline comments, which you're already triaging.

```bash
SINCE=$(gh api "repos/$REPO/issues/$PR/comments" --paginate \
  | jq -rs --arg mark "$MARK" '[.[][] | select(.body | contains($mark)) | .created_at] | max // ""')
gh api "repos/$REPO/pulls/$PR/reviews" --paginate \
  | jq -s --arg since "$SINCE" '[.[][] | select(.body != "")
      | select(.user.type != "Bot" and (.user.login | test("copilot"; "i") | not))
      | select(.submitted_at > $since)
      | {id, author: .user.login, body, html_url}]'
```

If both lists are empty, tell the user there's nothing to triage and stop.

## Step 2 — Triage each comment

Read the code each comment points at and the branch diff (`git diff origin/main...HEAD`), then put it in one bucket:

- **A — Already fixed.** A later commit addressed it. Confirm in the diff; don't infer it from the comment.
- **B — Out of scope.** It flags an intentional pattern, contradicts the repo's guidance, or doesn't hold up. Name the file that says so: `/.agents/architecture.md` for code and styling, the pillar docs routed from `/.agents/index.md` for design, or the component's `instructions.md`.
- **C — Actionable.** A real problem not fixed yet. Either fix it this round or defer it to an issue.

Weight by author:

- **Humans** set the conventions. Their requests are almost always A or C; if you can't tell what they meant, say so in the reply rather than putting it in B.
- **Copilot** is often wrong. Evaluate it on the merits and prefer B when in doubt — a well-reasoned out-of-scope reply beats an unnecessary code change.

## Step 3 — Agree the plan before acting

Don't change code, open issues, or post replies until the user signs off. Show one row per comment, with the reply you'll post:

| #   | Author  | Where            | Bucket | Action                           | Reply                                   |
| --- | ------- | ---------------- | ------ | -------------------------------- | --------------------------------------- |
| 1   | jdoe    | `Tooltip.vue:36` | C      | Fix this round                   | Fixed in `<sha>`: …                     |
| 2   | Copilot | `Plans.vue:12`   | B      | No change (intentional, see doc) | Out of scope: … See `.agents/colors.md` |

Honor scoped answers ("skip #2", "defer #1") and apply the user's corrections before you continue.

## Step 4 — Act

1. **Fix** the approved C items, run the checks `AGENTS.md` names before pushing, and push. A "Fixed in `<sha>`" reply needs a pushed commit to point at.
2. **Open an issue** for each deferred C item, before its reply so the reply can link it. Search first (`gh issue list --state open --search "<keywords>"`) and comment on an existing issue rather than opening a duplicate. Lead the body with the problem, then where (`path:line`), then a link to the review comment. Only apply labels the repo already has. Follow-ups go in issues, never in agent-facing files — `AGENTS.md` explains why.
3. **Reply** once per thread:
   - Inline: `gh api "repos/$REPO/pulls/$PR/comments" -X POST -f body="<reply>" -F in_reply_to=<root databaseId>`
   - Top-level reviews: one PR comment answering all of them, not one per review: `gh api "repos/$REPO/issues/$PR/comments" -X POST -f body="<reply>"`
4. **Re-request review** from each human whose changes-requested review you addressed: `gh pr edit "$PR" --add-reviewer <login>`.

Replies are plain text, two to four sentences: "Fixed in `<sha>`: …", "Out of scope: … See `<file>`.", or "Tracked in #<issue>: …". End every reply with `$MARK` on its own line; GitHub doesn't render it.

## Re-requesting Copilot

Re-request only when production code changed since its last review. Use `gh pr edit "$PR" --add-reviewer "@copilot"`; the raw `requested_reviewers` REST call silently does nothing once Copilot has reviewed the PR.

Copilot finds something on almost every pass. Stop re-requesting when any of these is true:

- It has reviewed this PR three times.
- A round produced only nits, "consider …" suggestions, or low-severity findings.
- It flagged the same nonexistent path or symbol twice. Reply once saying the file doesn't exist, and stop.
