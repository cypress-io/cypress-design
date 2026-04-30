# Design guidance

## Colors — Cypress Design System

The full color palette lives in `cypress-colors.css` at the project root. Import it (`<link rel="stylesheet" href="cypress-colors.css">`) or copy the `:root` block into any new HTML file. Never invent new hex values when one of these works.

**10 hues · 113 swatches**, organized in three tiers:

### Primary (carry the brand)

- **Gray** — `--cy-gray-25` → `--cy-gray-1100` (14 steps). Neutrals, text, borders, surfaces.
- **Jade** — `--cy-jade-50` → `--cy-jade-1000`. Cypress green. Success, passing tests, healthy state. **Never use for generic confirmation.**
- **Teal** — `--cy-teal-50` → `--cy-teal-1000`. Brand signature. `--cy-teal-600` (#00595D) is the brand anchor.
- **Indigo** — `--cy-indigo-50` → `--cy-indigo-1000`. Links, focus rings, interactivity. `--cy-indigo-500` (#4956E3) is the link anchor.

### Secondary (semantic accents)

- **Purple** — accent, complement to teal.
- **Red** — error, failing tests, destructive actions. Use sparingly.
- **Orange** — warning, flaky, pending, degraded. Warmer than red.

### Tertiary (generated content only)

- **Fuchsia**, **Green** (yellow-green, distinct from jade), **Magenta** — reserved for syntax highlighting and chart series. Don't reach for these in normal UI.

### Contrast guidance

- For text on white, reach for **600 or darker**.
- For text on dark surfaces (gray-1000), reach for **300 or lighter**.
- The middle steps (400–500) are for fills, borders, and decorative surfaces — not body text.
- Body text needs WCAG AA (4.5:1); fine print needs AAA (7:1).

### Pairings that work

Proven on white surfaces:

- `jade-200` + `teal-600`
- `purple-300` + `indigo-700`
- `indigo-400` + `gray-1000`
- `indigo-400` + `teal-200`
- `orange-300` + `purple-700`
- `jade-200` + `indigo-800`

## Iconography

- **All line icons use a 2px stroke** ("flat icon" style). Avoid 1px or 1.5px strokes — they read too thin at small sizes.
- Apply this to `strokeWidth="2"` on every `<svg>` line icon. SVGs should use `stroke="currentColor"`, `fill="none"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- Brand logos are exempt — leave them as-is.

## Spacing — base-4 (4px baseline grid)

All margins, padding, gaps, spacing, and sizing values must align to a **4px baseline grid** — every value should be a multiple of 4 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, …). This matches Tailwind's spacing scale where `h-4` == `height: 16px`, `p-2` == `padding: 8px`, etc. Don't reach for 5px, 7px, 10px, 14px, 18px — round to the nearest 4.
