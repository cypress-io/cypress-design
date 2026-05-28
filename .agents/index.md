---
name: index
description: Router for Cypress Design System agent guidance. Fetch this first; it points at the specific guidance file(s) needed for the current task.
---

# Cypress Design System — agent index

Fetch only what the task needs. Don't preload all files.

## Principles

Foundational thinking that frames how we make design and product decisions. Fetch when starting design, product, UX, illustration, or AI-assisted work — the pillar files apply the principles to specific tokens and rules.

- [principles/ai.md](./principles/ai.md) — using AI to build, design, write, or review
- [principles/ux.md](./principles/ux.md) — UX and product design fundamentals
- [principles/business-and-user-needs.md](./principles/business-and-user-needs.md) — UX where business goals meet user needs
- [principles/visual-hierarchy.md](./principles/visual-hierarchy.md) — directing the eye with color, icons, spacing, size
- [principles/illustration.md](./principles/illustration.md) — illustration craft and house style
- [principles/design-systems.md](./principles/design-systems.md) — meta-principles about design systems
- [principles/feedback.md](./principles/feedback.md) — reviewing work and giving feedback
- [principles/accessibility.md](./principles/accessibility.md) — accessibility as a baseline

## Design pillars

Each pillar leads with the principles that govern it, then the specific tokens and rules.

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
