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

For the broader thinking on how spacing fits into visual hierarchy, see [principles/visual-hierarchy.md](https://design.cypress.io/agents/principles/visual-hierarchy.md).

## The grid

All margins, padding, gaps, spacing, and sizing values must align to a **4px baseline grid** — every value should be a multiple of 4 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, …). This matches Tailwind's spacing scale where `h-4` == `height: 16px`, `p-2` == `padding: 8px`, etc. Don't reach for 5px, 7px, 10px, 14px, 18px — round to the nearest 4.

**Verify the actual rendered pixels — don't trust the class name alone.** Tailwind's spacing scale is rem-based and assumes a 16px root `font-size`. Some consuming apps don't have one — the cypress-services dashboard vendors `bootstrap-sass`, which sets `html { font-size: 10px }`, so every named spacing utility there renders at 62.5% of its documented value (`h-2` measures 5px, not 8px; tracked as [PD-32](https://cypress-io.atlassian.net/browse/PD-32)). Until each affected app fixes its root font-size (a large, separate migration — never do it as a side effect of an unrelated change), use Tailwind's **arbitrary-value syntax with a literal, base-4 pixel value** instead of the named scale: `h-[8px]` / `gap-[12px]` / `mb-[24px]`, not `h-2` / `gap-3` / `mb-6`. Arbitrary `[Npx]` values compile to real CSS pixels and are immune to root font-size — pick `N` from the same 4/8/12/16/20/24/32/40/48/64 grid either way. When in doubt on any new surface, confirm with `getComputedStyle` rather than assuming the class name means what it says.

## Corners

**4px is the default border radius for everything** — cards, buttons, inputs, badges, panels, wells, tooltips. This is the actual shipped token: `borderRadius.DEFAULT` and `borderRadius.md` are both `4px` in `@cypress-design/css`'s Tailwind theme (`theme.config.ts`), so Tailwind's bare `rounded` / `rounded-md` classes already resolve to the correct value — reach for those, not `rounded-lg`/`rounded-xl`/an arbitrary `borderRadius` value, unless a specific component's spec explicitly calls for a larger radius. When styling outside Tailwind (inline styles, a non-Tailwind CSS-in-JS block, another framework), hardcode `4px`, not a rounder guess.
