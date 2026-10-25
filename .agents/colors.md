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

WCAG 2.2 sets the floor, and these are the ratios we hold to:

- **Body text: 4.5:1** (AA).
- **Fine print: 7:1** (AAA), such as captions and footnotes.
- **Large text and meaningful non-text UI: 3:1.** Large text is 24px and up, or 18.66px and up in bold. Non-text UI is icons, input borders, and focus rings that carry meaning.

Pick the step by surface and hue. Gray needs one step darker than the other hues on light surfaces: `gray-600` is only 4.28:1 on white and 3.90:1 on `gray-50`.

- **Body text (4.5:1)**
  - On white or `gray-50`: gray **700** or darker. Other hues **600** or darker.
  - On `gray-1000`: **300** or lighter.
- **Fine print (7:1)**
  - On white or `gray-50`: gray **800** or darker. Other hues **700** or darker.
  - On `gray-1000`: **300** or lighter.
- **Large text and meaningful icons (3:1)**
  - On white or `gray-50`: gray **600** or darker. Other hues **500** or darker.
  - On `gray-1000`: **400** or lighter.

A few cases need more care:

- **Links:** `indigo-500` is 5.64:1 on white and 5.14:1 on `gray-50`, so it passes AA for link text. Other hues' 500 steps don't all hold up on `gray-50` (`orange-500` drops to 4.20:1), so don't generalize from indigo.
- **Placeholder text needs 4.5:1 like any other text.** WCAG exempts disabled controls, logos, and purely decorative text, but not placeholders. Don't reach for `gray-500` or `gray-600` for placeholders on light surfaces.
- **Any other background needs its own check.** The steps above are measured against white, `gray-50`, and `gray-1000` only. On tinted fills (`jade-50`, `gray-100`) or other dark surfaces, check the actual pair with a contrast checker before shipping.

## Pairings that work

These pair well visually on white surfaces. The ratio between the two colors sets what the pair can carry:

| Pair                        | Ratio  | Safe for                                         |
| --------------------------- | ------ | ------------------------------------------------ |
| `jade-200` + `indigo-800`   | 7.96:1 | Any text, including fine print                   |
| `orange-300` + `purple-700` | 6.65:1 | Body text                                        |
| `jade-200` + `teal-600`     | 5.74:1 | Body text                                        |
| `purple-300` + `indigo-700` | 4.38:1 | Large text, icons, illustration — not body text  |
| `indigo-400` + `gray-1000`  | 4.05:1 | Large text, icons, illustration — not body text  |
| `indigo-400` + `teal-200`   | 2.57:1 | Decoration only — never text or meaningful icons |
