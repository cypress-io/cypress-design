---
name: index
description: Router for Cypress Design System agent guidance. Fetch this first; it points at the specific guidance file(s) needed for the current task.
---

# Cypress Design System — agent guidance router

Every file below lives at `https://design.cypress.io/agents/<name>.md` and in the `cypress-design` repo at `.agents/<name>.md`. Fetch only the ones that match the task. Don't preload all of them.

## Pillars

| File                               | Fetch when                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| [colors.md](./colors.md)           | Choosing colors, tokens for backgrounds/text/borders, evaluating contrast, designing pairings. |
| [typography.md](./typography.md)   | Setting font family, size, weight, line-height, letter-spacing.                                |
| [spacing.md](./spacing.md)         | Setting margins, padding, gaps, sizing, or any layout dimension.                               |
| [iconography.md](./iconography.md) | Creating, modifying, or styling icons.                                                         |
| [voice.md](./voice.md)             | Writing user-facing copy — UI strings, errors, empty states, marketing prose.                  |
| [content.md](./content.md)         | Writing button labels, error messages, empty states, form copy.                                |
| [personas.md](./personas.md)       | Tailoring copy or flows to QA engineers, application developers, or eng managers.              |

## Components

For a specific component, fetch its public usage doc:

`https://design.cypress.io/agents/components/<Name>/instructions.md`

(Available components are listed in the repo's root `AGENTS.md`. Each component's `instructions.md` is framework-agnostic and covers props, variants, states, accessibility.)

## Self-review

| File                                         | Fetch when                                                                                                                                               |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [review-checklist.md](./review-checklist.md) | **Before claiming any UI / visual / content task is done.** Walk through every applicable check against your own diff; fix violations before committing. |

## Architecture (producer repo only)

Only relevant if you're working _inside_ `cypress-design` itself, not consuming it:

| File                                 | Fetch when                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [architecture.md](./architecture.md) | Adding/modifying components, deciding `components/` vs `packages/`, working on the build pipeline. |
| [skills/](./skills/)                 | Task-specific skills — see each file's frontmatter for trigger conditions.                         |
