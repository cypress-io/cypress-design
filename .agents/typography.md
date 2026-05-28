---
name: typography
description: Fetch when setting font family, size, weight, line-height, or letter-spacing. Skip for layout-only or color-only changes.
---

# Typography

## Principles

- **Stick to the defined type scale.** Arbitrary font sizes scattered across surfaces signal a system nobody owns. Adding a new size is a sign the scale needs review, not a one-off exception.
- **Hierarchy comes from size, weight, and space — not decoration.** Underlines, italics, all-caps, and color swaps for emphasis muddy hierarchy. Build it with restrained scale moves and generous spacing around the elements that matter most.
- **Line length and line height matter as much as size.** Keep body measure (line length) in the 45–75 character range; pair font size with proportional line height (1.4–1.6 for body). Type is a system, not a single dial.
- **Body text has a job; display text has a different job.** Body is for reading at length — optimize for readability and rhythm. Display is for catching attention — optimize for impact. Don't confuse the two.

For the broader thinking on how typography fits into visual hierarchy, see [principles/visual-hierarchy.md](./principles/visual-hierarchy.md).

## Font families

Brand-heavy properties (marketing, docs, public-facing sites) use Google Fonts to ensure a consistent experience across all devices.

- **Poppins** — headings on marketing, docs, and brand-heavy properties
- **Roboto** — body copy on marketing, docs, and brand-heavy properties
- **Roboto Mono** — code on marketing, docs, and brand-heavy properties
- **System** — body copy for Cypress Cloud & Cypress App
- **System Mono** — code for Cypress Cloud & Cypress App

Never set `font-family` inline — the correct stack is applied by the global context.

## Scale & spacing

- Use the type scale exposed by Tailwind defaults via `@cypress-design/css`.
- `16px` — minimum for legible body content (`text-base`)
- `14px` — secondary/supporting information only (`text-sm`)
- `12px` — reserve for high info-density scenarios; use sparingly (`text-xs`)
- Headings: prefer the existing `<h1>`–`<h4>` styles in `docs/`; do not introduce new sizes.
- Line-height stays on the 4px grid (`leading-5`, `leading-6`, `leading-7` — see [spacing.md](./spacing.md)).
