# Agent guidance

Before doing any work, you MUST read:

- `/.agents/architecture.md` — repo structure, build, deploy.
- `/.agents/index.md` — router for design, voice, and component guidance. Fetch only the pillars and components the task needs. Don't load them all preemptively.

Before claiming any UI / visual / content task is done, run `/.agents/review-checklist.md` against your own diff.

Everything under `/.agents/` is also served at `https://design.cypress.io/agents/` for consumer repos to fetch — same files, single source of truth.

## Skills

Task-specific guidance lives in `/.agents/skills/<skill-name>.md`. Each skill has YAML frontmatter with a `description` telling you when to load it. Read the relevant skill(s) before starting matching work; don't load them preemptively.

Available skills:

- `skill(implement-component)` — use when implementing a new component, or adding a variant/size/state to an existing one, from a Figma spec.
- `skill(cy-review-pr-comments)` — use to review the latest GitHub Copilot review comments on the PR for the current branch, triage them, update `.agents/known-issues.md`, and reply to or resolve each comment appropriately.
