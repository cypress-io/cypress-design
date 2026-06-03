---
name: index
description: Router for Cypress Design System agent guidance. Fetch this first; it points at the specific guidance file(s) needed for the current task.
---

# Cypress Design System — agent index

Fetch only what the task needs. Don't preload all files.

## Principles

Foundational thinking that frames how we make design and product decisions. Fetch when starting design, product, UX, illustration, or AI-assisted work — the pillar files apply the principles to specific tokens and rules.

- [principles/ai.md](./principles/ai.md) — using AI to build, design, write, or review
- [principles/ux.md](./principles/ux.md) — UX & design principles (the _what_): designing for users, patterns, naming, empty states, restraint, pricing UX. The business-goal / prioritization / discovery _why_-side lives in product.md
- [principles/product.md](./principles/product.md) — product principles (the _why/whether_): business goals + prioritization, problem definition & discovery, ownership, shipping to learn (measure before launch, don't bundle, set a review date), and post-launch decide. Fetch when planning, prioritizing, defining success, planning research, or reviewing whether shipped work is measured and followed up
- [principles/visual-hierarchy.md](./principles/visual-hierarchy.md) — directing the eye with color, icons, spacing, size
- [principles/feedback.md](./principles/feedback.md) — reviewing work and giving feedback
- [principles/learning-from-feedback.md](./principles/learning-from-feedback.md) — **fetch on every feedback exchange** (PR review, reply to a comment, Slack thread, Zoom recap) — how to spot the rule hiding in a fix and confirm it with the human before documenting
- [principles/releases.md](./principles/releases.md) — shipping releases, betas, and previews; naming stages; managing feedback quality
## Design pillars

Several pillars lead with a `## Principles` section that governs the tokens and rules below it (colors, typography, spacing, iconography, illustrations). Others (voice, personas, accessibility) are organized differently — open each file for the structure that fits its content.

- [colors.md](./colors.md) — color tokens, contrast, pairings
- [typography.md](./typography.md) — font, size, weight, line-height
- [spacing.md](./spacing.md) — margins, padding, gaps, layout dimensions
- [iconography.md](./iconography.md) — creating or styling icons
- [illustrations.md](./illustrations.md) — illustration principles, style, theme, and guidelines
- [voice.md](./voice.md) — UI copy, errors, empty states, tone, capitalization, product naming, mechanics (numbers, dates, punctuation)
- [errors.md](./errors.md) — errors, warnings, deprecations, and other system-to-user failure messages; distilled from the cypress-error-messages skill in aihub
- [personas.md](./personas.md) — who uses Cypress and what they need
- [accessibility.md](./accessibility.md) — when to invest in a11y and the patterns to follow on the surfaces you ship

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

Run [review-checklist.md](./review-checklist.md) against your diff (tokens, spacing, a11y — is the surface built right?).

When the work is a product brief, initiative, or design proposal — not just a UI surface — also run [product-review-checklist.md](./product-review-checklist.md) (problem defined, alternatives compared, success metric + measurement, review date, post-launch decision — should we be building it, and will we know if it worked?).
