---
name: colors
description: Fetch when choosing colors, picking tokens for backgrounds/text/borders, evaluating contrast, or designing color pairings. Skip for non-visual code.
---

# Cypress Design System: Colors

## Principles

- **Color has meaning. Don't waste it.** Decorative color (random tag colors, accent colors with no semantic load) implies a signal that isn't there. Reserve color for meaning; use neutrals where meaning isn't required.
- **Use semantic tokens, not raw hex values.** Tokens carry intent; hex carries only appearance and breaks the moment the palette evolves.
- **Color alone can't carry meaning.** Pair color with shape, icon, label, or position — colorblind users, dimmed screens, and bright sunlight all defeat color-only signals.

For the broader thinking on how color fits into visual hierarchy, see [principles/visual-hierarchy.md](https://design.cypress.io/agents/principles/visual-hierarchy.md).

## Palette

The full color palette is hosted at `https://design.cypress.io/colors.css` (full token set at `https://design.cypress.io/tokens.css`). Import it (`<link rel="stylesheet" href="https://design.cypress.io/colors.css">`) or copy the `:root` block into any new HTML file. Never invent new hex values when one of these works.

**10 hues · 113 swatches**, organized in three tiers:

## Primary (carry the brand)

- **Gray** — `--cy-gray-25` → `--cy-gray-1100` (14 steps). Neutrals, text, borders, surfaces.
- **Jade** — `--cy-jade-50` → `--cy-jade-1000`. Cypress green. Success, passing tests, healthy state. **Never use for generic confirmation.**
- **Teal** — `--cy-teal-50` → `--cy-teal-1000`. Brand signature. `--cy-teal-600` (#00595D) is the brand anchor.
- **Indigo** — `--cy-indigo-50` → `--cy-indigo-1000`. Links, focus rings, interactivity. `--cy-indigo-500` (#4956E3) is the link anchor.

## Secondary (semantic accents)

- **Purple** — accent, complement to teal.
- **Red** — error, failing tests, destructive actions. Use sparingly.
- **Orange** — warning, flaky, pending, degraded. Warmer than red.

## Tertiary (generated content only)

- **Fuchsia**, **Green** (yellow-green, distinct from jade), **Magenta** — reserved for syntax highlighting and chart series. Don't reach for these in normal UI.

## Contrast guidance

- For text on white, reach for **600 or darker**.
- For text on dark surfaces (gray-1000), reach for **300 or lighter**.
- The middle steps (400–500) are for fills, borders, and decorative surfaces — not body text.
- Body text needs WCAG AA (4.5:1); fine print needs AAA (7:1).

## Pairings that work

Proven on white surfaces:

- `jade-200` + `teal-600`
- `purple-300` + `indigo-700`
- `indigo-400` + `gray-1000`
- `indigo-400` + `teal-200`
- `orange-300` + `purple-700`
- `jade-200` + `indigo-800`
