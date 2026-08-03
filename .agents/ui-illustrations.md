---
name: ui-illustrations
description: Fetch when producing a shrunken, abstracted illustration of a product screen — a UI image that pairs with a paragraph to show a feature's context and story without being a screenshot. Covers the abstraction contract, element budget, scale, alignment, icon fidelity, and the render-and-verify loop. For watercolor / marketing illustration craft see illustrations.md.
---

# UI illustrations

A UI illustration is a small, deliberately abstracted picture of a product screen. It sits next to a paragraph, shows the reader where a feature lives and what it does, and then stops. It is not a screenshot and must not age like one.

## Why they exist

**Screenshots create maintenance debt; UI illustrations don't.** A real screenshot pins the page to the product's current pixels — every visual change in the app invalidates every marketing surface that shows it. A UI illustration carries the same story at a fraction of the upkeep because it only commits to the parts of the UI that are durable.

**The job is intent, not inventory.** The reader should finish the paragraph knowing what the feature does and roughly where it lives. They should not be able to audit the UI against it. If someone can diff your illustration against the live product and find discrepancies that matter, you abstracted too little.

**Pair one illustration with one idea.** Same rule as [illustrations.md](https://design.cypress.io/agents/illustrations.md): one primary expression per section. If the paragraph makes two points, that's two illustrations or a narrower paragraph.

## The abstraction contract

Decide per element which side of the line it sits on. This is the difference between an illustration and a screenshot.

**Text is opt-in, not opt-out.** Default every string to a light gray rounded shape. Include real text _only_ when it is crucial to the story of the image or the feature being illustrated. Text invites the reader to stop and read; every word they read is attention taken from the paragraph the illustration is supporting. Gray shapes communicate "there is text here" without spending that attention, and they never go stale.

**Keep as real text** — only the strings that carry the story:

- The feature-defining labels a reader needs to understand what they're looking at: the rule name, the status word, the one metric the feature is about
- Whatever the adjacent paragraph explicitly references

If you can delete a string and the illustration still makes the paragraph's point, delete it.

**Keep concrete but non-textual** — the durable parts that carry meaning without words:

- Structural layout: which regions exist and how they relate
- State color and iconography: pass / fail / inconclusive / ignored
- The visual anchor: whatever the paragraph is actually pointing at

**Abstract to placeholders** — everything else:

- Body copy, descriptions, table cells, usernames, timestamps → gray rounded shapes
- Real customer names, project names, URLs, run IDs → gray shapes or omitted
- Avatars → an illustrated stand-in, never a real person
- Precise counts and dates → round, plausible, obviously illustrative; or a shape
- Navigation, breadcrumbs, tabs, settings chrome → delete outright

**Never** invent a UI affordance the product doesn't have. Abstraction removes detail; it does not add features.

## Where assets come from

A strict hierarchy. Every rung you skip shows up as a pattern the reader doesn't recognize.

1. **The illustration Figma files.** Existing illustrations and their parts are components — tooltips, DOM highlights, tags, hero portraits, buttons. Pull the exact construction with `get_design_context` and the exported art with `download_assets`. If a pattern exists there, reusing it is mandatory; approximating it is the most common way an illustration drifts off-brand.
2. **`icon-registry/icons-static/`** for every icon (rules in step 8 below).
3. **Generation (Nano Banana Pro via Higgsfield), only for art that does not exist yet.** Generate once, commit the file as a versioned asset, reuse it everywhere — regenerating per illustration makes the same character drift between surfaces. Before generating anything, check Figma: the asset probably exists.

Never hand-draw a substitute for figurative or branded art — no CSS silhouettes for characters, no generic icon standing in for a product mark. If the real asset is unreachable, say so and stop; a lookalike is worse than a placeholder.

**Demo content: `cy.heroes`.** The fake application shown inside product illustrations. It exists so we never show a customer's app, and its content is canonical, not borrowed — hero names and theme stay as _real text_ (a named exception to text-is-opt-in), and portraits come from the Heroes App Figma file. The cast and their spec live with the design team; don't invent new heroes.

## Frame and aspect ratio

**Illustrations are 16:9.** Site-wide default, for screenshots, videos, and placeholder art alike. A one-off ratio reads as a mistake next to the pages around it and breaks the column rhythm the layouts assume. A genuine need for a different ratio is a deliberate exception to raise, not something to introduce quietly.

**The exception: content placed inside `Browser`.** When the illustration will be wrapped in browser chrome, 16:9 applies to the _assembled mockup_, not to your asset. The caller sizes the whole mockup to 16:9 and the toolbar eats part of that height, so **the content asset must be shorter than the full 16:9 frame**. Authoring at the full 16:9 height makes the assembled mockup taller than 16:9 once chrome is added.

Formula: `content height = (width × 9/16) − toolbar height`.

Toolbar height depends on `Browser`'s own rendered width, via container query — not the viewport:

| `Browser` width | Toolbar                     |
| --------------- | --------------------------- |
| < 896px         | ~25px (`h-6` + 1px border)  |
| ≥ 896px         | ~41px (`h-10` + 1px border) |

**Worked example — the common case.** `Browser` renders at 800px wide, which is below the 896px threshold: mockup 800×450, toolbar ~25px, so the **content asset is 800×425**. At ≥896px redo the math with the ~41px toolbar; never reuse 425 at a different width.

**The browser chrome itself is a component: `Window / Browser`** (Figma file `Component — Windows (v1.0)`, key `EVfe4zg4hZPqZses82RhfI`, node `1:718`). Never draw browser chrome by hand — use its spec. It has one boolean, `Downscaled`, and the two variants are the source of the two toolbar tiers above:

|                 | `Downscaled=False`                  | `Downscaled=True`                                |
| --------------- | ----------------------------------- | ------------------------------------------------ |
| Toolbar height  | 40px                                | 24px                                             |
| Toolbar padding | 16px                                | 8px                                              |
| Traffic lights  | 52×12 (12px dots)                   | 32×8 (8px dots)                                  |
| URL input       | 12px text, 4px radius, restart icon | 8px text, 14px tall, 3px radius, no restart icon |
| Frame radius    | 8px                                 | 6px                                              |

Shared by both: white frame, 1px `rgba(27,30,46,0.15)` border, `#F3F4FA` toolbar with `#E1E3ED` bottom border, centered URL input at 37.5% width (`#D0D2E0` border, `#9095AD` text, "localhost:8080"), traffic lights + back/forward chevrons left, plus + grid actions right, soft drop shadow.

`Downscaled=True` is a deliberate miniature — used when the browser should read as a small window inside a larger composition. Its 8px URL text is authored, not a violation of the no-scaling rule: the variant exists precisely so miniaturization is a designed state rather than a transform. Pick the variant by role — a hero browser gets `False`, an inset or secondary window gets `True` — not by canvas size alone; both appear at small and large sizes across the corpus.

Full sizing rules live in the cypress.io repo at `.agents/architecture/illustrations.md`.

## Method

Work in this order. Skipping to layout is what produces near-misses.

The expensive failure mode is iterating renders against feedback that source data would have answered up front. One pass of source-gathering — node metadata, design context on the key components, asset downloads — replaces several rounds of build-render-correct. Budget the first third of the work for reading the source, not for producing pixels.

### 1. Measure the source — from the Figma file, never from a screenshot

**Get the numbers from the source component, not from a picture of it.** Existing illustrations live in Figma (`Illustrations — Accessibility`, `Heroes App`, and siblings). `get_metadata` on the node returns exact region widths, row heights, icon sizes, and text-block dimensions. Measuring pixels off an exported PNG introduces a scale error that then propagates into every other decision — a heading measured 15px instead of 12px forces a text wrap, which forces a narrower panel, which breaks the layout.

If you genuinely only have a screenshot, it is almost always @2x — divide every measurement by 2 to get logical px, and say that your numbers are estimates.

Reference geometry from the accessibility details-page illustration (`BqeqqHqeczSnbLJZxdnaOO`, node `11:95347`), authored at **1216×646**:

| Region                  | Size                     |
| ----------------------- | ------------------------ |
| Side navigation         | 64 wide                  |
| Sidebar (rules panel)   | 344 wide, 64-tall header |
| Snapshot (app preview)  | 808 wide                 |
| Sidebar content padding | 12                       |
| Element row             | 28 tall                  |
| Icons                   | 16×16                    |
| Header buttons          | 32×32                    |
| Tag                     | 16 tall                  |
| DOM highlight overlay   | 96×96                    |
| Dark tooltip            | 195×28                   |
| Selection rail          | 4 wide                   |

Two patterns from this source that are easy to get wrong:

- **The injected-app surround.** The snapshot region is Cypress Cloud _containing_ the customer's application: a Gray/50 (`#F3F4FA`) field with the app inset 16px on a white, bordered, 4px-radius surface. Without the gray surround the two interfaces read as one product. The app content is taller than the frame and bleeds off the bottom of the surround.
- **The dark element tooltip** is `#2E3247`, 4px radius, 28px tall, 4px/8px padding, 8px gap, with a centered rounded caller on its bottom edge. Contents: the corner-bracket + red X errored-element icon (exact SVGs from the illustration file, `#E45770`), then SF Mono Semibold 12/20 — selector base in white, class/id in `#C8A7F5`, dimensions in `#BFC2D4`. The selector is one token (`img.hero-avatar`, no space). Center the caller on the highlighted element; never let a tooltip overlap the app's own chrome or clip at the frame edge.
- **DOM highlight overlays** are a 4-layer component, not a dashed border: `#E45770` fill at 45% opacity over the element, 1px solid `#E45770` inner stroke at 60%, 1px dashed **white** stroke with `mix-blend-mode: soft-light`, and — selected state only — a 2px solid `#E45770` outer stroke at −3px with 3px radius. Reuse this construction; do not invent a substitute.

### 2. Author at design-system 1:1

**Everything sits on a base-4 grid.** Paddings, gaps, and container insets are 4, 8, 12, 16, 20, 24… Grids stretch their cards to fill the container — a fixed-width card leaving an awkward remainder strip against the container edge is a layout bug, not a crop. Sidebar-style panels anchor flush to the frame edges they own (top/left/bottom), not floating with margins, when they represent chrome overlaying a canvas.

**Never use fractional values.** No half-pixel font sizes, sizes, spacing, radii, or offsets — `12.5px` type, `4.5px` gaps, `-1.5px` offsets are all wrong. Every value is a whole pixel. Fractions creep in when you eyeball a measurement instead of reading it from the source, and they render as blurred edges at 1x. If a Figma node itself reports a fractional offset, round it.

These illustrations are built from real design-system sizes — 16px icons, 28px rows, 20px text blocks — not from an enlarged approximation. **Do not scale content up or down.** Fit the frame by deleting elements and reflowing layout (next two steps), never by resizing what survives.

**Elements hold their scale; containers may be re-proportioned.** A card can be narrower or shorter than its source and re-flow its contents; the type and icons inside it may not change size. Re-cut placeholder bars to fit the new container width rather than clipping them mid-bar.

Worked example — 1216×646 reframed to 800×425 (identical 1.882 aspect ratio, so it is a reframe, not a re-proportion): delete the 64px nav, keep the sidebar at its authored 344, and give the remainder to the snapshot. The snapshot loses width, so its 3-column hero grid reflows to 2 columns rather than being cropped. Vertically, 646 → 425 crops 221px off the bottom.

### 3. Set the element budget

The target frame is smaller than the source, so elements must be deleted at full size. Never scale content down to make it fit. Delete in this order until the budget is met:

1. Global navigation — sidebars, rails, logos, help and account controls. **There is never room for navigation in a UI illustration.** It carries no story and eats 8–12% of the width.
2. Page chrome — breadcrumbs, tab bars, toolbars, filter rows not central to the feature
3. Repeated rows beyond what proves the pattern — three rows read as a list; ten read as a table
4. Secondary regions — anything the paragraph doesn't reference
5. Only then consider cropping

### 4. Reflow the layout to fit the frame

Structural reflow is allowed and often necessary — it is not the same as compression. Dropping a three-column table to two columns, stacking two side-by-side regions, or removing the navigation to reclaim horizontal space are all legitimate responses to a smaller frame. What stays forbidden is shrinking the _elements_ to fit more of the original structure in.

The distinction: reflow changes **how many things are shown and where**; compression changes **how big things are**. Reflow freely, compress never.

When dropping columns, keep the ones the paragraph is about and the ones that differentiate rows. Drop columns whose values are identical down the list — they carry no information per row.

### 5. Promote regions to peer cards

Do not preserve the app frame with a hole where the navigation was. Once the chrome is gone, each surviving region becomes its own rounded white card with a hairline border and a soft shadow, sitting on a plain background with a real gutter between cards. The illustration reads as a composition of product surfaces, not as a screenshot missing its sidebar.

### 6. Crop on the vertical axis only

- **Bottom bleed is the only continuation signal.** A card cut by the bottom edge reads as "this list continues," which matches how the reader experiences scrolling.
- **Never bleed off the right edge.** Horizontal clipping reads as a broken layout, not as a crop.
- **Protect the anchor completely.** The region the paragraph points at keeps all four borders and its full content, including its footer. The text-heavy list region is the one that absorbs the loss.
- **Never clip a floating element.** Tooltips, popovers, and badges are either fully in frame or removed. A tooltip sliced by the frame edge reads as a rendering bug.
- **Only bleed real content.** Fading or cutting a final row implies more content below it. If the region genuinely ends there, let it end — a fabricated continuation signal is a lie about the product.

### 7. Align to explicit axes

Near-misses here are what make an illustration feel "off" without the reader being able to say why. Flex gaps drift; grids don't.

- Repeated rows use a **fixed column grid**, not flex gaps. If row one shows `img` then `#profile-pic`, row two's `img` and `#icon-lightning` start at the same two x positions.
- Connector rails, status dots, and selection bars share **one vertical axis** through the whole list.
- Nested content (a bullet list under a row) aligns to its **own left edge**, not to the indent it inherited from its container.
- Labels introducing a list align with the list, not with the row above it.
- Placeholder bars in a row share one baseline and one height.

### 8. Use the real icons

**Never substitute a generic icon set for a Cypress mark.** Tabler, Lucide, Heroicons and similar are not acceptable stand-ins — the marks are the most repeated shapes in the image, so a wrong one is visible everywhere at once. Pull the actual SVG from `icon-registry/icons-static/` at the nearest size and inline it.

Frequently needed, by way of example:

| Concept          | Registry file                         |
| ---------------- | ------------------------------------- |
| Failing element  | `object-errored-element_x16.svg`      |
| Passing element  | `object-tested-element_x16.svg`       |
| Untested element | `object-untested-element_x16.svg`     |
| Ignored element  | `object-ignored-element_x16.svg`      |
| Element selector | `technology-element-selector_x16.svg` |

`find icon-registry/icons-static -name "*<concept>*"` before reaching for anything else. Construction rules (2px stroke, `currentColor`) are in [iconography.md](https://design.cypress.io/agents/iconography.md).

#### Make the icons actually render

Getting the right icon into the file is half the job; getting it to render reliably is the other half. When this goes wrong it goes wrong silently — the layout looks finished and the marks are simply absent.

- **Inline the SVG markup. Never `<img src="…svg">`, never an icon webfont, never a CDN stylesheet.** Any external request is a race the headless screenshot can lose, and when it loses, every glyph renders as an empty box. Read the registry file and paste its markup into the HTML.
- **Set color explicitly.** Registry icons carry `fill="none"` on the root and expect the `Icon` component to supply color. Inlined raw they default to dark navy, not to your text color. Apply `fill: currentColor` (or per-path fills) and set `color` on the parent.
- **Map the two-tone classes.** Icons with `class="icon-light"` / `class="icon-dark"` need both mapped — typically `.icon-light { fill: <tint> }` and `.icon-dark { stroke: <status color> }`. Unmapped, they render single-tone or wrong-tone.
- **Add `width` and `height` to the inlined `<svg>`.** The registry files ship a `viewBox` only, so an unsized inline SVG takes an unpredictable intrinsic size.
- **Confirm in the render, not the markup.** Read the output PNG and check every distinct mark is present and the right color before delivering.

### 9. Reproduce kept text exactly

Labels you chose to keep are quoted material — copy them character for character. `img#post-image` is one CSS selector; `img #post-image` is two labels and a different meaning. Check spaces, casing, angle brackets, and punctuation against the source.

## Placeholder language

Light gray rounded shapes are the primary material of a UI illustration — most of the surface area is them, and consistency here is what makes a set of illustrations look like one system.

- **Gray bars stand in for text**: fully rounded ends, light neutral gray, one height per role (heading bars heavier than body bars), brand purple reserved for the one bar representing a link or primary label. Their job is to say "text lives here" and be skipped over.
- **Vary bar widths** to imply real sentences; identical widths read as a loading state.
- **Image placeholders** use the muted-shape convention (simple geometric forms on a tinted field), not a photo and not an icon.
- **Avatars** are illustrated characters, never photographs and never a generic person glyph.
- **Add a focal accent when simplification leaves a region flat.** Deleting detail can drain a large area of interest; a single saturated shape restores the read. Subtraction isn't uniform — sometimes the smaller version needs an element the source didn't have.

## Deliver at @2x and verify

Design at logical size, ship at 2×. Blurry assets undercut everything else on the page.

Build the illustration as a standalone HTML file sized to the logical frame, then render it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=800,425 --screenshot=out@2x.png "file://$PWD/illustration.html"
```

`--window-size` takes logical px; the scale factor doubles the output. Confirm the PNG's real dimensions before delivering — a 1600×850 file proves the 800×425 layout rendered at 2×.

**Then look at the render — with an element inventory, not an impression.** List every element in the source region you kept (nav, rings, tooltip icon, surrounds, badges, connectors) and mark each one present, intentionally removed, or missing. Every review round in practice has been a missing element that was plainly visible in the original — the gray injected-app surround, the avatar rings, the tooltip's icon — not a subtle style gap. Impressionistic comparison passes over exactly these. Open the PNG and check it against the source side by side. A live-preview widget in a chat column is not proof: it may be transform-scaled to fit, so it shows neither the true size nor the true crop. Iterate on the file and re-render until the comparison holds.

## Self-check before delivering

- [ ] Frame is 16:9, or `(width × 9/16) − toolbar` if it goes inside `Browser`
- [ ] Every string that isn't crucial to the story is a gray shape
- [ ] Navigation and page chrome are gone, not shrunk
- [ ] Layout reflowed (columns dropped, regions stacked) rather than scaled down
- [ ] Geometry came from the Figma source node, not a screenshot
- [ ] Nothing was scaled up or down; survivors are at authored design-system size
- [ ] No fractional px values anywhere — font sizes, spacing, radii, offsets all whole numbers
- [ ] All spacing on the base-4 grid; grid cards stretch to fill their container
- [ ] Regions are peer cards on a plain background with a real gutter
- [ ] Bleed is bottom-only; the right edge has a clean margin
- [ ] The anchor region is fully contained, footer included
- [ ] No floating element is clipped; no fabricated fade or cut-off row
- [ ] Repeated rows align on a fixed column grid; rails share one axis
- [ ] Every icon came from `icon-registry/`, inlined with no external requests
- [ ] Every distinct mark is visible and correctly colored in the rendered PNG
- [ ] Kept text matches the source character for character
- [ ] Placeholder bars vary in width and follow the height roles
- [ ] Every reused pattern (tooltip, highlight, tag, card) matches its Figma component — no invented substitutes
- [ ] Figurative/branded art is a real asset (Figma export or committed generation), never hand-drawn
- [ ] Element inventory done: each source element present, intentionally removed, or flagged
- [ ] Rendered at @2x, dimensions verified, compared against the source

## Calibration — when to adjust

| Symptom                                        | Fix                                                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Reads as a screenshot with something missing   | Still carrying the app frame — promote regions to peer cards                                                                   |
| Text wraps where the source didn't             | Type is oversized — you measured a screenshot instead of the Figma node, or narrowed the container instead of cutting elements |
| Feels cramped and hard to read in a paragraph  | Not enough deleted; cut another region and magnify further                                                                     |
| Feels "off" but nothing is identifiably wrong  | Alignment — check for flex gaps where a fixed grid belongs                                                                     |
| Looks broken at the edge                       | Right-edge bleed or a clipped floating element                                                                                 |
| A large region reads as empty                  | Add a focal accent                                                                                                             |
| Reader stops to read the image                 | Too much real text — convert all but the story-critical strings to gray shapes                                                 |
| Assembled mockup is taller than 16:9           | Content asset was authored at the full 16:9 height instead of minus the toolbar                                                |
| Ratio looks wrong next to neighboring sections | Not 16:9                                                                                                                       |
| Someone files a bug against it                 | Too concrete — abstract the dated details to placeholders                                                                      |

## Related

- `.agents/skills/cy-ui-illustration.md` — the invocable procedure built on these rules, with the canonical reference set and render workflow

- [illustrations.md](https://design.cypress.io/agents/illustrations.md) — watercolor / marketing illustration craft; the house style for non-UI imagery
- [iconography.md](https://design.cypress.io/agents/iconography.md) — icon construction and one-icon-per-concept
- [spacing.md](https://design.cypress.io/agents/spacing.md) — layout dimensions and gaps
- [colors.md](https://design.cypress.io/agents/colors.md) — tokens for card surfaces, borders, and status color
- [principles/visual-hierarchy.md](https://design.cypress.io/agents/principles/visual-hierarchy.md) — directing the eye once the detail is gone
- `cypress.io` repo, `.agents/architecture/illustrations.md` — the 16:9 site rule, `Browser.astro` chrome math, and per-page sizing
