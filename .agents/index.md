---
name: index
description: Router for Cypress Design System agent guidance. Fetch this first; it points at the specific guidance file(s) needed for the current task.
---

# Cypress Design System — agent index

Fetch only what the task needs. Don't preload all files.

## Design pillars

- [colors.md](./colors.md) — color tokens, contrast, pairings
- [typography.md](./typography.md) — font, size, weight, line-height
- [spacing.md](./spacing.md) — margins, padding, gaps, layout dimensions
- [iconography.md](./iconography.md) — creating or styling icons
- [voice.md](./voice.md) — UI copy, errors, empty states
- [personas.md](./personas.md) — who uses Cypress and what they need

## Components

Fetch on demand — don't preload all of them:

- `instructions.md` — props, variants, states, accessibility. Load when using or referencing a component. (`https://design.cypress.io/agents/components/<Name>/instructions.md`)
- `<framework>/ReadMe.md` — install command, import path, code examples. Load only the one matching the project (`react/` or `vue/`).

`Accordion` `Alert` `Button` `Checkbox` `Icon` `Logo` `Menu` `Modal` `Spinner` `Tabs` `Textbox` `Tooltip`
`DocMenu` — sidebar navigation used in documentation sites
`StatusIcon` — passed/failed/pending/skipped/running/flaky indicator
`Tag` — small colored label
`TestResult` — single test result row with status, title, and actions

## Before marking done

Run [review-checklist.md](./review-checklist.md) against your diff.

## Producer repo only

- [architecture.md](./architecture.md) — component structure, build pipeline
- [skills/](./skills/) — task-specific skills; read each file's frontmatter for triggers
- `components/<Name>/architecture.md` — file layout, constants, interaction rationale, gotchas. Load alongside `instructions.md` when modifying a component.
- `components/<Name>/ReadMe.md` — public consumer docs (live demos, Figma link). Keep terse.
- Not every component has all files yet — add them when a component is created or meaningfully revised. When adding a new component, update the list above.
