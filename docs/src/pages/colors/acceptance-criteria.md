# Colors Page — Acceptance Criteria

## Sections

| Section                            | Anchor      |
| ---------------------------------- | ----------- |
| Hero                               | (top)       |
| Primary brand colors               | `#brand`    |
| The full palette                   | `#palette`  |
| Reading the contrast scores        | `#a11y`     |
| Fresh complementary color pairings | `#pairings` |

## Palette (core feature)

- **10 color scales** across 3 tiers (Primary, Secondary, Tertiary), **113 swatches** total
- Each swatch shows its step number, hex value, and WCAG contrast grade (AAA / AA / ·)
- **Copy on click** — clicking a swatch copies its Tailwind class (e.g. `bg-jade-300`) to the clipboard and briefly overlays "Copied" on the swatch for 900 ms
- WCAG grades are computed at **build time** (no runtime JS needed for the grade itself)

## Right-rail TOC

- All 14 headings are listed: 3 h2 sections + the 10 scale names as h3s
- TOC links scroll the page to the correct heading anchor

## Navigation pager

- Links to adjacent pages: ← Install / Icons →
- Both links are present and point to the correct routes

## Layout

- Page renders without the `.markdown` prose wrapper (no auto-styled `<p>`, `<ul>`, etc.)
- No component is wrapped in an unwanted `<p>` tag by the MDX/Astro processor
