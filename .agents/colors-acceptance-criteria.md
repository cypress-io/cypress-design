# Colors Page — Acceptance Criteria

## Sections

| Section              | Anchor       |
| -------------------- | ------------ |
| Hero                 | (top)        |
| Primary brand colors | `#brand`     |
| Primary colors       | `#primary`   |
| Secondary colors     | `#secondary` |
| Tertiary colors      | `#tertiary`  |
| Color contrast       | `#a11y`      |
| Complementary colors | `#pairings`  |
| Token reference      | `#usage`     |

## Palette (core feature)

- **10 color scales** across 3 tiers (Primary, Secondary, Tertiary), **113 swatches** total
- Each swatch shows its step number, hex value, and WCAG contrast grade (AAA / AA / ·)
- **Copy on click** — clicking a swatch copies its Tailwind class (e.g. `bg-jade-300`) to the clipboard and briefly overlays "Copied" on the swatch for 900 ms
- WCAG grades are computed at **build time** (no runtime JS needed for the grade itself)

## Right-rail TOC

- All 20 entries: Brand colors, Primary/Secondary/Tertiary colors (3 tier groups), 10 scale names, Color contrast, Complementary colors, Token reference, JS variables, CSS variables, Tailwind classes
- Tier groups (Primary/Secondary/Tertiary) are depth-2 entries; scale names and token subsections are depth-3 (indented)
- TOC links scroll the page to the correct heading anchor

## Navigation pager

- Links to adjacent pages: ← Install / Icons →
- Both links are present and point to the correct routes

## Layout

- Page renders without the `.markdown` prose wrapper (no auto-styled `<p>`, `<ul>`, etc.)
- No component is wrapped in an unwanted `<p>` tag by the MDX/Astro processor

## Known Issues

### User Experience

### Developer Experience

- **[Low / Won't fix now] ColorPalette deep relative import** — `ColorPalette.astro` imports `cyColors` via `../../../../../css/src/color-constants` rather than through `@cypress-design/css`. Not resolving because `yarn dev` does not watch-build `css/dist/`; switching to the package import would require a manual `yarn workspace @cypress-design/css build:lib` on every color change during local dev. The relative path hits the TypeScript source directly and Astro compiles it on the fly, which is the better DX for now. Revisit once `css/src/**/*.ts` is added to `watch-constants.mjs`. `docs/src/pages/colors/components/ColorPalette.astro:3` _(PR #660, Copilot)_

### Code Quality
