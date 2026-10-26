---
name: cy-ui-illustration
description: Build a Cypress UI illustration — an abstracted, deliberately simplified picture of a product screen that pairs with marketing copy at 16:9 (or Browser-inset sizes like 800×425) without going stale when the product changes. Use when asked to create, resize, or adapt a product-UI illustration for any surface — blog, landing pages, product pages, docs, empty states, social media. Covers the source-first workflow (Figma geometry → tokens → assets → HTML → @2x render), the canonical reference set, and where every existing illustration lives in Figma.
---

# cy-ui-illustration

Build UI illustrations the way the design team builds them: measured from the source Figma component, assembled from real assets, abstracted to gray shapes everywhere text isn't the story, rendered at @2x, and verified with an element inventory.

The rules live in [ui-illustrations.md](https://design.cypress.io/agents/ui-illustrations.md) — fetch it first, every time. This skill is the order of work, the reference set, and the map of where existing illustrations live.

## Canonical reference illustrations

These are the bar. Before building anything, **read the bundled reference closest to your target** and study how it abstracts, then open its Figma node for geometry and tokens. All are 16:9-family frames with base-4 spacing, whole-pixel values, and real text only where the feature's story needs it.

Bundled in `references/`. **Read at most the one or two closest to your task** — the table exists so you can choose from text instead of loading every image:

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

## Where existing illustrations live

Every UI illustration the team has made (some as prototypes for product videos) lives in these files. For any Cypress product surface, one probably exists in some size — search here first. `get_metadata` with a file key and no node id lists its pages.

| File                                 | Key                      | What's in it                                                                                                                                                           |
| ------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Illustrations — Accessibility (v1.x) | `BqeqqHqeczSnbLJZxdnaOO` | Analytics; inspect element (`11:95347`)                                                                                                                                |
| Illustrations — Cypress Cloud (v1.x) | `YmEYv6Nc5M16JenMpj3i0V` | Test Replay at 1286×680 (`1148:7825`) and smaller; Visual Reviews; Branch Review, Test detail + Cypress AI, integrations / settings, run-duration chart (browse pages) |
| Illustrations — Cypress App (v1.x)   | `enlqSvcI3ijlWRVmHtiAzG` | Studio :: Recording; **Components** page of shared parts                                                                                                               |
| Illustrations — UI Coverage (v1.x)   | `SNNT319HHXs6N2qUpgZ9jD` | Analytics Report                                                                                                                                                       |
| Illustrations — Social (v1.x)        | `WXRcsE7gOaNcDi1V8SvXH0` | 1200×630 composites; see ui-illustrations.md § The composite mode                                                                                                      |
| Component — Windows (v1.0)           | `EVfe4zg4hZPqZses82RhfI` | `Window / Browser` chrome; see ui-illustrations.md § Frame and aspect ratio                                                                                            |
| Heroes App (v1.1)                    | `nHuTFOXFgAfbS04LqPgK5v` | The cy.heroes cast (`614:2927`) — export portraits from here, never regenerate them                                                                                    |

Many illustrations ship in several authored sizes (Large 1286×680, Medium 800×425, animated step series). **Before downsizing anything, check whether the design team already authored the small size** — if it exists, it's the spec, not an input to reinterpret.

`get_metadata`, `get_design_context`, `get_screenshot`, and `download_assets` are Figma connector tools. Complete the connector's own setup (session, required skills) before the first call.

## What human-made looks like

Beyond the written rules, the reference set shares these habits:

- **One story per frame, told left to right.** The sidebar states the finding; the canvas shows it. Nothing else competes.
- **Real text is scarce and always narrative** — branch names (`develop`, `feature/new-hero`), counts with deltas, test titles, statuses. Body copy never survives.
- **Numbers are art-directed, not random**: small counts for failures (2, 3), round totals for context (2.8k), believable pairs (55% / 87%). Deltas always have direction and color.
- **Theme accents carry warmth**: hero names, `guild.cy.ts`, `/new-hero/superpowers` — the cy.heroes universe threads through every surface so screens feel like one product in use, not lorem ipsum. Abstraction applies to prose, never to the theme.
- **Depth is restrained**: 1px `gray-100` borders, one soft shadow per floating card, flat fills everywhere else.

## Procedure

Each step names the section of ui-illustrations.md that holds its rules.

1. **Fetch the rules** — all of ui-illustrations.md.
2. **Find the source** in the tables above, and check for an authored version at your target size.
3. **Read the source before producing pixels** (§ Method, step 1; § Where assets come from). Geometry from `get_metadata` on the node, never from a screenshot; tokens and construction from `get_design_context`; portraits, logos, and baked art from `download_assets`.
4. **Plan the reframe and write the element budget down** before building (§ Method, steps 3–6).
5. **Build a standalone HTML file** at logical size in your scratchpad. Paste the `:root` block from `https://design.cypress.io/colors.css` into it and color with `var(--cy-*)` tokens rather than hex ([colors.md](https://design.cypress.io/agents/colors.md)). Inline every SVG (§ Method, step 8).
6. **Render at @2x and check the dimensions** (§ Deliver at @2x and verify). In this repo: `node scripts/render-illustration.mjs illustration.html out@2x.png 800 425`.
7. **Do the element inventory** against the source and re-render until it's clean (§ Deliver at @2x and verify), then run § Self-check before delivering.
8. **Deliver the PNG** with the inventory's intentional removals listed and any judgment calls flagged.

## The misses that cost the most review rounds

- **Measuring a screenshot instead of the Figma node.** Screenshot measurements inflate type, and the whole layout drifts from there.
- **Hand-drawing a substitute** (CSS avatars, generic icons, invented tooltips or highlights) when the real component or asset exists. Readers notice a pattern they don't recognize even when they can't say why.
- **Dropping structural elements that carry meaning**: the gray injected-app surround, avatar rings, tooltip icons. They're plainly visible in the source and easy to lose in an impression-based check — the inventory exists to catch them.
- **Fixed-width cards that leave remainder strips** instead of stretching on the grid.
