---
name: cy-git-commit-and-push
description: Use when the agent has finished making changes and needs to commit and push them. Delegates diff summarization to a cheap sub-agent that reads the staged/unstaged changes and recent commit history, then produces a conventional-commit message. The main session reviews the output, stages files, commits, and pushes.
---

# cy-git-commit-and-push

Review local changes, generate a commit message via a cheap sub-agent, commit, and push.

**Token strategy:** The diff and log are collected here, then handed off to `claude-haiku` (or the cheapest available model) for message drafting so the main session doesn't process the full diff corpus. The main session only sees the final JSON and acts on it.

---

## Step 1 — Collect context

```bash
# All unstaged + staged changes (unified, stat header first for scope)
git diff HEAD --stat
echo "---DIFF---"
git diff HEAD

# Recent commits for style reference
git log --oneline -10

# Current branch
git rev-parse --abbrev-ref HEAD
```

If `git diff HEAD` is empty and there are no untracked files, stop and tell the user there is nothing to commit.

---

## Step 2 — Delegate to a cheap sub-agent

Spawn the smallest/cheapest model and pass the diff, stat, log, and branch. Ask it to produce a commit message.

### Claude Code (preferred)

```bash
claude --model claude-haiku-4-5 --print "$(cat <<'PROMPT'
You are writing a git commit message for the cypress-design repository.
Study the diff and recent commit log below, then produce a commit message.

CONVENTIONS
- Title: imperative mood, ≤72 chars, no trailing period
- Follow the style of the recent commit log exactly (terse noun phrases, lower-case verbs)
- Body: bullet list of what changed and why (one bullet per logical group of files)
- Omit the body entirely if the change is trivial and the title is self-explanatory
- Never mention "Claude", "AI", or "auto-generated"
- Do not add a Co-Authored-By trailer — that is added separately

OUTPUT: a single JSON object, no extra text.
Schema: { "title": "...", "body": "..." }
The "body" field may be an empty string if no body is needed.

RECENT COMMITS (style reference):
<paste git log --oneline -10 output here>

BRANCH: <branch name>

DIFF STAT:
<paste git diff HEAD --stat here>

DIFF:
<paste git diff HEAD here>
PROMPT
)"
```

### Fallback (no sub-agent support)

If the environment cannot spawn a sub-agent, draft the commit message yourself using the same conventions above, then skip to Step 4.

---

## Step 3 — Review sub-agent output

Parse the JSON. Sanity-check:

- Title is ≤72 chars and imperative mood.
- Body bullets are accurate (no hallucinated file names).
- Tone matches the recent commit log style.

Correct any obvious errors before proceeding.

---

## Step 4 — Stage, commit, and push

```bash
# Stage all tracked modifications and new files that belong to the change.
# Prefer explicit file lists over `git add -A` to avoid accidentally staging
# secrets or unrelated files. Use `git status --short` to decide what to add.
git add <files>

# Commit — always append the Co-Authored-By trailer.
git commit -m "$(cat <<'EOF'
<title>

<body — omit this block if body is empty>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"

# Push to the tracking remote branch.
git push
```

If the pre-commit hook modifies files (e.g., prettier), re-stage those files and create a **new** commit rather than amending. Never use `--no-verify`.

---

## Checklist

- [ ] `git diff HEAD` was non-empty before proceeding
- [ ] Sub-agent output reviewed for accuracy
- [ ] No secrets or unrelated files staged
- [ ] Commit title ≤72 chars, imperative mood
- [ ] Co-Authored-By trailer present
- [ ] Push succeeded
