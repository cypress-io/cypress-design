---
name: cy-ui-illustration
description: Build a Cypress UI illustration — an abstracted, deliberately simplified picture of a product screen that pairs with marketing copy at 16:9 (or Browser-inset sizes like 800×425) without going stale when the product changes. Use when asked to create, resize, or adapt a product-UI illustration for any surface — blog, landing pages, product pages, docs, empty states, social media. Covers the source-first workflow (Figma geometry → tokens → assets → HTML → @2x render), the canonical reference set, and the delivery checklist.
---

# cy-ui-illustration

Build UI illustrations the way the design team builds them: measured from the source Figma component, assembled from real assets, abstracted to gray shapes everywhere text isn't the story, rendered at @2x through headless Chrome, and verified with an element inventory.

The full ruleset lives in [ui-illustrations.md](https://design.cypress.io/agents/ui-illustrations.md) — fetch it first, every time. This skill is the procedure and the reference set.

## Canonical reference illustrations

These are the bar. Before building anything, **Read the bundled reference PNG closest to your target** and study how it abstracts, then open its Figma node for geometry and tokens. All are 16:9-family frames with base-4 spacing, whole-pixel values, and real text only where the feature's story needs it.

Bundled in `references/`. **Read at most the one or two closest to your task** — the table below exists so you can choose from text instead of loading every image:

| File                                | Source node                             | What it teaches                                                                                                            |
| ----------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `a11y-analytics-800x425.png`        | `BqeqqHqeczSnbLJZxdnaOO` / `1:3167`     | Chart + rules-list layout at the standard size: stat chips, severity tags, element counts                                  |
| `a11y-analytics-472x284.png`        | `BqeqqHqeczSnbLJZxdnaOO` / `1:4888`     | The same illustration compressed a second tier — what survives at Small                                                    |
| `a11y-inspect-element-1216x646.png` | `BqeqqHqeczSnbLJZxdnaOO` / `11:95347`   | Large-size source: injected-app surround, DOM highlights, dark tooltip, sidebar over canvas                                |
| `test-replay-800x425.png`           | `YmEYv6Nc5M16JenMpj3i0V` / `1829:32735` | **The team's own downsize of the 1286×680 Test Replay** — the answer key: what got deleted, what reflowed, what stayed 1:1 |
| `test-replay-devtools-800x425.png`  | `YmEYv6Nc5M16JenMpj3i0V` / `3482:20320` | Dark theme with devtools Network split at small size                                                                       |
| `ui-coverage-report-800x425.png`    | `SNNT319HHXs6N2qUpgZ9jD` / `1:510`      | Analytics-report layout: metric tiles, tables, link lists                                                                  |
| `app-studio-recording-800x425.svg`  | `enlqSvcI3ijlWRVmHtiAzG` / `1:3602`     | Cypress App / Studio recording — full vector source, inspectable construction                                              |

Comparing `a11y-analytics-800x425.png` against `a11y-analytics-472x284.png` is the fastest way to internalize the method: same story, two authored sizes, every delta a deliberate deletion or reflow.

## The full corpus

Every UI illustration the team has created (some authored as prototypes for fake product videos) lives in these files. Search here first — for any Cypress product surface, an illustration probably already exists in some size. `get_metadata` with the file key and no node id lists pages; drill from there.

| File                                 | Key                      | Pages / contents                                                                                             |
| ------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Illustrations — Accessibility (v1.x) | `BqeqqHqeczSnbLJZxdnaOO` | Analytics                                                                                                    |
| Illustrations — Cypress Cloud (v1.x) | `YmEYv6Nc5M16JenMpj3i0V` | Visual Reviews / Test Replay                                                                                 |
| Illustrations — Cypress App (v1.x)   | `enlqSvcI3ijlWRVmHtiAzG` | Studio :: Recording, **Components** (shared parts)                                                           |
| Illustrations — UI Coverage (v1.x)   | `SNNT319HHXs6N2qUpgZ9jD` | Analytics Report                                                                                             |
| Illustrations — Social (v1.x)        | `WXRcsE7gOaNcDi1V8SvXH0` | 2026 / Q1                                                                                                    |
| Component — Windows (v1.0)           | `EVfe4zg4hZPqZses82RhfI` | `Window / Browser` chrome — `Downscaled` false/true = 40px/24px toolbar; spec in ui-illustrations.md § Frame |

Many illustrations ship in multiple authored sizes (Large 1286×680, Medium/Static 800×425, animated step series). **Before downsizing anything, check whether the design team already authored the small size** — if it exists, it is the spec, not an input to reinterpret.

| Illustration                     | Figma file                                                                        | What it demonstrates                                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Accessibility — inspect element  | `Illustrations - Accessibility (v1.x)` `BqeqqHqeczSnbLJZxdnaOO`, node `11:95347`  | Injected-app gray surround, DOM highlight 4-layer overlay, dark selector tooltip, sidebar overlaying app canvas |
| Cloud — Test Replay              | `Illustrations - Cypress Cloud (v1.x)` `YmEYv6Nc5M16JenMpj3i0V`, node `1148:7825` | Dark chrome, code panel with error state, replay timeline with progress dot, devtools split                     |
| Cloud — Branch Review            | same file — browse pages for the Branch Review symbols                            | Two-panel review layout, diff badges (▲2 ▼1), severity tags, selected-row treatment                             |
| Cloud — Test detail + Cypress AI | same file                                                                         | Overlay panel over dimmed content, action button row, AI attribution rows                                       |
| Cloud — integrations / settings  | same file                                                                         | Settings list patterns: toggles, tabs, locked inputs                                                            |
| Cloud — Run duration chart       | same file                                                                         | Rounded bar chart, commit dots on branch line, callout value pill                                               |
| Heroes App (demo content)        | `Heroes App (v1.1)` `nHuTFOXFgAfbS04LqPgK5v`, node `614:2927`                     | The canonical cy.heroes cast — portraits are exported from here, never regenerated                              |

What "human-made" looks like in these, beyond the written rules:

- **One story per frame, told left-to-right.** Sidebar states the finding; the canvas shows it. Nothing else competes.
- **Real text is scarce and always narrative** — branch names (`develop`, `feature/new-hero`), counts with deltas, test titles, statuses. Body copy never survives.
- **Numbers are art-directed, not random**: small counts for failures (2, 3), round totals for context (2.8k), believable pairs (55% / 87%). Deltas always have direction and color.
- **Theme accents carry warmth**: hero names, `guild.cy.ts`, `/new-hero/superpowers` — the cy.heroes universe threads through every surface so screens feel like one product being used, not lorem ipsum.
- **Depth is restrained**: 1px `#E1E3ED` borders, one soft shadow per floating card, flat fills everywhere else.

## Procedure

1. **Fetch the rules.** `https://design.cypress.io/agents/ui-illustrations.md`. Non-negotiable rules live there: 16:9 / Browser math, design-system 1:1 (never scale), base-4 spacing, whole pixels, text-is-opt-in, bottom-only crop, element deletion order.
2. **Read the source before producing pixels.** `get_metadata` on the Figma node for geometry; `get_design_context` on key child components for exact tokens, type styles, and construction; `download_assets` for portraits, logos, and baked art. If the symbol is a flattened image, window regions out of the export at 1:1 with `background-position` — don't redraw them.
3. **Plan the reframe.** Most sources are already ~1.88:1, so 800×425 is a proportional reframe: delete navigation, reflow columns (3→2), keep panels at authored width, crop bottom only. Write the element budget down before building.
4. **Build a standalone HTML file** at logical size in the scratchpad. Inline every SVG (no webfonts, no external icon requests), use exact hex from the source tokens, whole pixels, base-4 spacing.
5. **Render @2x:**
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=800,425 --screenshot=out@2x.png "file://$PWD/illustration.html"
   ```
6. **Element inventory against the source.** Every source element: present, intentionally removed, or missing. Check icon constructions and colors against the Figma components, not memory. Fix and re-render until the inventory is clean.
7. **Deliver the PNG** with the inventory's intentional removals listed, and flag any judgment calls.

## Failure modes this skill exists to prevent

Each of these happened while developing the ruleset; the review round it cost is the reason it's listed.

- Measuring a screenshot instead of the Figma node → oversized type → cascading layout drift
- Hand-drawing substitutes (CSS avatars, generic icons, invented tooltips/highlights) when the real component or asset exists
- Killing the theme (placeholder avatars, dropped hero names) — abstraction applies to prose, not to the cy.heroes universe
- Missing structural elements that carry meaning: the gray injected-app surround, avatar rings, tooltip icons
- Fixed-width cards leaving remainder strips instead of stretching on the grid
- Fractional pixels, 6–8px radii where the system uses 4px, off-token grays and reds
