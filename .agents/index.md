---
name: index
description: Router for Cypress Design System agent guidance. Fetch this first; it points at the specific guidance file(s) needed for the current task.
---

# Cypress Design System — agent index

Fetch only what the task needs. Don't preload all files.

## Framing — why this matters

The design system is what unblocks everyone else. Mature design systems exist because they make the rest of the company faster — they warrant dedicated team investment for the same reason any other platform investment does: leverage. Treat them as a force multiplier, not a side project. A few non-negotiables shape how this one is structured:

- **One design system spans every surface — product and marketing.** Splitting the system creates inconsistency that customers feel even if they can't name it. The goal from day one is a single system that feeds both the product and the marketing site.
- **A design system is more than components.** Tokens, color, spacing, typography, icons, motion, content patterns, and usage guidelines all count. Without that breadth and without documentation, contributions stay nice-to-haves instead of must-haves.
- **Build inside the real framework, not a microsite.** New surfaces should live inside the main app or marketing framework so branding stays automatic and code stays maintainable. Microsites are easy to launch but burden everyone who has to maintain them later — and they're often a way to skip consensus and avoid the hard work of integrating into the real system. Shipping the easiest possible solution and calling it production-ready is an illusion of progress, not progress.

## Principles

Foundational thinking that frames how we make design and product decisions. Fetch when starting design, product, UX, illustration, or AI-assisted work — the pillar files apply the principles to specific tokens and rules.

- [principles/ai.md](./principles/ai.md) — using AI to build, design, write, or review
- [principles/ux.md](./principles/ux.md) — UX, product design, and business-goal principles (where business goals meet user needs, JTBD, restraint, pricing)
- [principles/visual-hierarchy.md](./principles/visual-hierarchy.md) — directing the eye with color, icons, spacing, size
- [principles/feedback.md](./principles/feedback.md) — reviewing work and giving feedback

## Design pillars

Several pillars lead with a `## Principles` section that governs the tokens and rules below it (colors, typography, spacing, iconography, illustrations). Others (voice, personas, accessibility) are organized differently — open each file for the structure that fits its content.

- [colors.md](./colors.md) — color tokens, contrast, pairings
- [typography.md](./typography.md) — font, size, weight, line-height
- [spacing.md](./spacing.md) — margins, padding, gaps, layout dimensions
- [iconography.md](./iconography.md) — creating or styling icons
- [illustrations.md](./illustrations.md) — illustration principles, style, theme, and guidelines
- [voice.md](./voice.md) — UI copy, errors, empty states
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

Run [review-checklist.md](./review-checklist.md) against your diff.
