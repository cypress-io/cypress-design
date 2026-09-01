---
name: colors
description: Fetch when choosing colors, picking tokens for backgrounds/text/borders, evaluating contrast, or designing color pairings. Skip for non-visual code.
---

# Cypress Design System: Colors

## Principles

- **Color has meaning. Don't waste it.** Decorative color (random tag colors, accent colors with no semantic load) implies a signal that isn't there. Reserve color for meaning; use neutrals where meaning isn't required.
- **Use semantic tokens, not raw hex values.** Tokens carry intent; hex carries only appearance and breaks the moment the palette evolves. This includes arbitrary alpha modifiers on a token (`gray-1000/[.08]`) — if you need a wash or tint, that's a sign a dedicated token is missing, not a license to fabricate one inline. Never reach for `!important` to force a color to win a specificity fight; fix the selector instead.
- **Color alone can't carry meaning.** Pair color with shape, icon, label, or position — colorblind users, dimmed screens, and bright sunlight all defeat color-only signals.
- **Use the component's own API before styling around it.** If a component exposes a color/variant prop (e.g. a `fillColor` prop), use it — don't duplicate the component with a CSS override or a second copy just to change its color.

For the broader thinking on how color fits into visual hierarchy, see [principles/visual-hierarchy.md](https://design.cypress.io/agents/principles/visual-hierarchy.md).

## Palette

The full color palette is hosted at `https://design.cypress.io/colors.css` (full token set at `https://design.cypress.io/tokens.css`). Import it (`<link rel="stylesheet" href="https://design.cypress.io/colors.css">`) or copy the `:root` block into any new HTML file. Never invent new hex values when one of these works.

**10 hues · 113 swatches**, organized in three tiers:

## Primary (carry the brand)

- **Gray** — `--cy-gray-25` → `--cy-gray-1100` (14 steps). Neutrals, text, borders, surfaces.
- **Jade** — `--cy-jade-50` → `--cy-jade-1000`. Cypress green. Success, passing tests, healthy state. **Never use for generic confirmation.**
- **Teal** — `--cy-teal-50` → `--cy-teal-1000`. Brand signature. `--cy-teal-600` (#00595D) is the brand anchor.
- **Indigo** — `--cy-indigo-50` → `--cy-indigo-1000`. Links, focus rings, interactivity, and the **running/in-progress** status (see StatusIcon). `--cy-indigo-500` (#4956E3) is the link anchor; `indigo-400` is the running-status anchor.

## Secondary (semantic accents)

- **Purple** — accent, complement to teal.
- **Red** — error, failing tests, destructive actions. Use sparingly.
- **Orange** — warning, flaky, pending, degraded, and **errored** status. Warmer than red — reserve red for a hard failure, orange for "something's off but it didn't fail cleanly."

Status colors specifically (passed/failed/running/skipped/errored/queued) are locked in as component tokens, not free choices — see `components/StatusIcon/instructions.md` before picking a color for any run/spec/test status indicator rather than inferring one from this page's general descriptions.

## Match the product surface's palette

Don't default to indigo/teal everywhere. Cloud product surfaces (dashboard, run results) lean jade/teal; other surfaces have their own established palette. Check what the surrounding page already uses before introducing a new hue, and keep divider/border shades consistent within one surface instead of several near-identical grays.

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
