---
name: spacing
description: Fetch when setting margins, padding, gaps, sizing, or any layout dimension. Skip for color-only or copy-only edits.
---

# Spacing — base-4 (4px baseline grid)

## Principles

- **Spacing is a design element, not whitespace.** The gaps between elements communicate relationship and hierarchy as clearly as the elements themselves. Treat spacing as part of the design, not the absence of one.
- **Padding and margin are different concepts.** Padding lives inside a component (breathing room around its content). Margin lives between components (the relationship between them). Mixing the two breaks reusability and makes layouts brittle.
- **Group with proximity. Separate with space.** Elements that belong together should be visually closer than elements that don't. This is the cheapest hierarchy tool available and the most underused.
- **Vertical rhythm matters.** Consistent vertical spacing between elements creates a sense of order users feel without naming it. Breaking rhythm should serve a purpose — punctuating a section, signaling a different kind of content — not happen by drift.

For the broader thinking on how spacing fits into visual hierarchy, see [principles/visual-hierarchy.md](./principles/visual-hierarchy.md).

## The grid

All margins, padding, gaps, spacing, and sizing values must align to a **4px baseline grid** — every value should be a multiple of 4 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, …). This matches Tailwind's spacing scale where `h-4` == `height: 16px`, `p-2` == `padding: 8px`, etc. Don't reach for 5px, 7px, 10px, 14px, 18px — round to the nearest 4.
