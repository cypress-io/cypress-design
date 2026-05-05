# Agent guidance

Before doing any work, you MUST read:

- /.agents/architecture.md
- /.agents/design.md

## Skills

Task-specific guidance lives in `/.agents/skills/<skill-name>/SKILL.md`. Each skill has YAML frontmatter with a `description` telling you when to load it. Read the relevant skill(s) before starting matching work; don't load them preemptively.

Available skills:

- `skill(implement-component)` — use when implementing a new component, or adding a variant/size/state to an existing one, from a Figma spec.
- `skill(cy-review-pr-comments)` — use to review the latest GitHub Copilot review comments on the PR for the current branch, triage them, update `.agents/known-issues.md`, and reply to or resolve each comment appropriately.

## Components

When using or referencing a specific component, read its docs on demand (don't preemptively load all of them):

- `components/<Name>/ReadMe.md` — public consumer docs rendered on the design system site (live demos + short description + Figma link). Keep terse. Framework-agnostic.
- `components/<Name>/instructions.md` — agent-facing **usage** doc: props, variants, sizes, states, accessibility, known limitations. Framework-agnostic. Load this when you're using or referencing the component from another codebase. Treat anything documented here as supported; anything missing isn't.
- `components/<Name>/<framework>/ReadMe.md` — framework-specific install command, import path, and runnable code examples (`react/` for React, `vue/` for Vue). Load only the one matching the consuming project; skip the other.
- `components/<Name>/architecture.md` — agent-facing **implementation** doc: file layout, constants keying, interaction-model rationale, extension points, and gotchas that matter when extending, fixing, or rebuilding the component. Load this _in addition to_ `instructions.md` when the task involves changing the component itself.

Not every component has these two files yet — add them when a component is created or meaningfully revised.

Available: `Accordion`, `Alert`, `Button`, `Checkbox`, `DocMenu`, `Icon`, `Logo`, `Menu`, `Modal`, `Spinner`, `StatusIcon`, `Tabs`, `Tag`, `TestResult`, `Textbox`, `Tooltip`.

When adding a new component, update this list.
