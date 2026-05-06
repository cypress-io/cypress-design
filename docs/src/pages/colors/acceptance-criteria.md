# Colors Page — Acceptance Criteria

## Hero section

- Displays "Foundations · v2.0" label in purple above the headline
- Headline reads: "Colors, _with intent._" — italic portion in gray-700
- Subheadline summarises the palette's purpose (≤ 3 sentences)
- Stat row shows: "10 hues · 113 swatches", "WCAG-scored against light and dark surfaces", and a dark-mode roadmap badge

## Brand colors

- Three brand cards rendered side-by-side on ≥ sm breakpoint (Teal, Jade, Indigo)
- Each card shows: color chip, hue name in Poppins, description, and token + hex code
- Cards are informational only (no interactive behaviour required)

## Full palette

- A11y legend appears above the palette; it must NOT be wrapped in a `<p>` tag by the MDX processor
- Ten color scales rendered in tier order: Primary → Secondary → Tertiary
- Each tier has a heading and blurb
- Each scale has: name heading with color chip, role label, description, and a grid of swatches
- Swatch grid uses two rows; column count = `ceil(steps / 2)`
- Each swatch displays: step number (top-left), hex value (bottom-left), WCAG grade badge (bottom-right)
- WCAG grades are computed at build time — no client-side JS required for the grade itself
- Dark swatches are scored against white (#ffffff); light swatches are scored against ink (#1B1E2E)
- Grades: AAA ≥ 7:1 · AA ≥ 4.5:1 · "·" (fails)
- Swatches that fail contrast render the badge at 45% opacity
- Clicking a swatch copies its Tailwind class (e.g. `bg-jade-300`) to the clipboard and briefly shows "Copied" overlay
- Scale headings carry `id="scale-{name}"` so the right-rail TOC links scroll correctly

## Reading contrast section

- Two paragraphs explaining WCAG AA and AAA thresholds
- Inline `<code>` examples for step numbers (600, 300, 400–500)

## Color pairings

- Six pairing cards in a 1/2/3-column responsive grid
- Each card shows two nested color rectangles and the token names below

## Navigation pager

- Previous → Install · Next → Icons
- Links use `border-gray-100` default, `hover:border-gray-400` on hover

## Right-rail TOC

- All h2 and h3 headings are listed in the TOC: brand, palette, each scale (gray → magenta), a11y, pairings
- TOC is populated via the `tocHeadings` prop (manual list), not `getHeadings()`, because scale headings are rendered by Astro components

## Layout

- Page uses `rawContent={true}` on `BaseLayout` to bypass the `.markdown` CSS wrapper
- No `<p>` tag wrapping around any block-level JSX/Astro component

## File structure

```
docs/src/pages/colors/
  index.astro               ← page entry point
  acceptance-criteria.md    ← this file
  components/
    BrandCard.astro
    ColorLegend.astro
    ColorPalette.astro
    PairingCard.astro
```

All four components are color-page-specific and must not live in `docs/src/components/`.
