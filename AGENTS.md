# Agent guidance

Before doing any work, you MUST read:

- `/.agents/architecture.md` — repo structure, build, deploy.
- `/.agents/index.md` — router for design, voice, and component guidance. Fetch only the pillars and components the task needs. Don't load them all preemptively.

Before claiming any UI / visual / content task is done, run `/.agents/review-checklist.md` against your own diff.

When opening a PR, lead the description with the problem and goal (why / what) before the implementation (how) — see [`.github/pull_request_template.md`](.github/pull_request_template.md). Reviewers, human and AI, evaluate against the stated goal; a description that's all _how_ steers them toward syntax nitpicks instead of substance.

Everything under `/.agents/` is also served at `https://design.cypress.io/agents/` for consumer repos to fetch — same files, single source of truth.

## Component files

Each component may have:

- `components/<Name>/instructions.md` — consumer-facing API docs (props, variants, states, accessibility)
- `components/<Name>/architecture.md` — implementation details (file layout, constants, interaction rationale, gotchas). Load alongside `instructions.md` when modifying a component.
- `components/<Name>/react/ReadMe.md` and `components/<Name>/vue/ReadMe.md` — install command, import path, code examples

Not every component has all files yet — add them when a component is created or meaningfully revised. When adding a new component, update the component list in `/.agents/index.md`.

## Pages

Page-specific acceptance criteria and known issues live in `/.agents/pages/<page-name>.md`. Load the relevant file when working on or verifying a docs page.

Available pages:

- `pages/colors.md` — `/colors` page sections, palette behavior, TOC, known issues

## Skills

Task-specific guidance lives in `/.agents/skills/<skill-name>.md`. Each skill has YAML frontmatter with a `description` telling you when to load it. Read the relevant skill(s) before starting matching work; don't load them preemptively.

Available skills:

- `skill(implement-component)` — use when implementing a new component, or adding a variant/size/state to an existing one, from a Figma spec.
- `skill(cy-review-pr-comments)` — use to review the latest GitHub Copilot review comments on the PR for the current branch, triage them, update `.agents/known-issues.md`, and reply to or resolve each comment appropriately.
