# SpecResults — Architecture

## Origin

Ported from `frontend/packages/dashboard/src/specs/SpecsStatusStripPrototype.tsx` in `cypress-services` (PR #14230) — a live design-iteration prototype built directly against the Run Overview page. This component is that prototype's logic, generalized into a presentational, framework-published component: it takes plain per-status counts rather than Cloud's GraphQL instance list, so it has no data-model or routing dependency.

## File layout

- `constants/src/index.ts` — everything that isn't JSX: the `StripStatus` union and fixed `STATUS_ORDER`/`PILL_STATUS_ORDER`, the public `SpecResultCounts` prop type, per-status metadata (`STATUS_META`: icon name, label, hover color, tick class), the Specs-tab filter-value mapping (`STATUS_FILTER_VALUES`), all Tailwind class strings (`CssClasses`, `HOVER_TEXT_CLASS`, `HOVER_COUNT_CLASS`), and the one real algorithm, `buildSpecResultsView()`.
- `react/SpecResults.tsx` — a thin render layer over `buildSpecResultsView()`. It owns nothing but JSX, icon components (`@cypress-design/react-statusicon`), the Cancel button (`@cypress-design/react-button`), and tooltips (`@cypress-design/react-tooltip`, same pattern `RunResults` uses).
- `constants` is `"private": true` (see `package.json`) — its types are inlined into the react package's bundled `.d.ts` via `rollup.dts.config.mjs` (same pattern as `RunResults`). Consumers only ever install `@cypress-design/react-spec-results`.

## `buildSpecResultsView()`

This is where the actual logic lives, kept out of the component so it's independently testable and reusable if/when a Vue implementation ships. Given `results` + `{ label, scheduledToComplete }`, it derives:

- **`pills`** — pre-rendered pieces (`countText` + `rest`) in fixed order, with the indeterminate and scheduled-to-complete special cases already resolved. The component just interpolates `<b>{countText}</b> {rest}`.
- **`groups`** — the tick-bar segments: same per-status data, but resorted into `STATUS_ORDER` and run-length-encoded (contiguous same-status specs collapse into one flush block, so e.g. 18 passed specs render as one shape instead of 18 touching squares — gaps only appear at status boundaries).
- **`indeterminate`**, **`isComplete`**, **`remaining`**, **`total`** — the derived state flags the component (and the "scheduled" branch) key off of.

Singular/plural (`"1 failed spec"` vs `"18 passed specs"`) is handled once, in `withSuffix()`, by dropping the trailing `"s"` off whatever `label` was passed — not by a separate singular string table.

## Pill tooltips

`Pill.tooltip` is `{ kind: 'breakdown', rows: TooltipRow[] } | { kind: 'text', text: string } | undefined`, computed alongside the pill itself in `buildSpecResultsView()` rather than re-derived in the component. Two pills combine two real statuses into one number (`skipped` = `NOTESTS` + `CANCELLED`; the remaining pill = `RUNNING` + `UNCLAIMED`), but they gate their `breakdown` tooltip differently -- deliberately, not an oversight:

- **`skipped`** always attaches a tooltip, with one row per nonzero cause (so a single-cause total still gets one row, not two). "N specs skipped" never says _which_ real status a spec has -- unlike "N specs passed," it isn't self-explanatory on its own, so the reason is worth surfacing even when there's nothing to split.
- **The remaining pill** only attaches a tooltip when **both** `running` and `queued` are nonzero. "N specs remaining" already fully explains itself when every remaining spec is in the same state (all running, or all still queued) -- a tooltip there would just repeat the pill's own text.

The scheduled-to-complete pill always gets a `text` tooltip explaining the delay is a project setting, since that pill has no numeric split to break down at all.

`TooltipRow.icon` is `OutlineStatusIconName | 'lightning-bolt'` -- every row is a real status icon except Auto Cancellation, which uses `IconShapeLightningBolt` from `@cypress-design/react-icon` (not `@cypress-design/react-statusicon`) instead of reusing the plain skipped/ban icon a second time in the same tooltip. The lightning bolt is this design system's existing "time saved" icon (see `Textbox`'s own usage) -- Auto Cancellation stopped a run early, so it borrows that established meaning. `SpecResults.tsx` branches on `row.icon === 'lightning-bolt'` to pick which icon component to render, since the two live in different packages with different prop shapes (`OutlineStatusIcon` takes `status`; `IconShapeLightningBolt` takes `strokeColor`/`fillColor`).

`SpecResults.tsx` branches on `tooltip.kind` to decide which of two small layouts to render inside `Tooltip`'s `popper` -- a `flex-col` list of icon+count+label rows, or a plain sentence. Both reuse the same `popperClassName` override (`CssClasses.tooltipPopper`): `!min-w-0` so the tooltip auto-fits its content instead of the shared Tooltip's 160px default, `!text-left` since this content is never the shared Tooltip's usual single centered line, and `!text-gray-300` for body text on the dark tooltip (matching `RunResults`' own dark-tooltip color, since the shared Tooltip's own default is plain white).

## Running-tick shimmer

The running tick's animated gradient (`SpecResults.tsx`, `ensureShimmerStyle()`) is a small `<style>` element injected into `document.head` once per page (module-level guard, not per-render), rather than a Tailwind utility class. Tailwind's JIT can synthesize the `background-image`/`background-size` utilities as arbitrary values, but the accompanying `@keyframes` block has no equivalent utility-class mechanism unless the keyframe is pre-registered in the _consuming_ app's Tailwind theme — which we can't assume across every consumer of a published component. This mirrors the reference web-component implementation this port was based on (which used the same `<style>`-in-shadow-root technique). **Known debt:** if component-level keyframes become a recurring need, the better long-term fix is registering shared keyframes once in `@cypress-design/css`'s core Tailwind plugin (it already does this for `cardHover`/`border`) so every consumer gets them via the shared preset instead of each component injecting its own `<style>` tag.

## Why plain `<a>`, not a router-aware link

Unlike `RunResults` (which exposes `renderLink` for router integration), every href here is always relative to a Cypress Cloud run page (`specs?...`, `../../settings/general`) and the only known consumer (`cypress-services`) already uses plain anchors for this exact pattern (confirmed working with React Router's `<Link>`, which renders to an `<a>` under the hood — a bare `<a>` works identically for same-origin relative navigation). Add a `renderLink`-style prop if a second consumer needs SPA-internal navigation without a full page load.

Note the asymmetry: `specs` has no leading `../` (every tab, including Specs itself, is already a path segment directly under `:id` -- `../specs` resolves one level too far up and drops the run id), while the settings link genuinely needs `../../` to climb out of `runs/:id/` entirely and back to the project root.

## Known issue: literal px, not Tailwind's rem-based scale

`CssClasses` in `constants/src/index.ts` uses arbitrary `[Npx]` values everywhere
(`h-[24px]`, `gap-[8px]`, `text-[16px]`, ...) instead of Tailwind's named
spacing/sizing scale (`h-6`, `gap-2`, `text-base`), which is built on a 4px
base unit at a standard 16px root font-size (`0.25rem` = 4px). The one
exception is `rounded`/`rounded-b`/`rounded-tl-none`/`rounded-tr-none` --
this design system's own Tailwind theme hardcodes `borderRadius.DEFAULT`/
`.md` to a literal `4px` rather than a rem value, so those are already
immune and don't need converting.

**This is a workaround for a bug in Cypress Cloud (the dashboard app in
`cypress-services`), not a flaw in this component or in this design system.**
`cypress-services`'s dashboard still vendors `bootstrap-sass`, whose
`_scaffolding.scss` sets `html { font-size: 10px }` globally -- instead of
the standard 16px. Every rem-based Tailwind utility on that page therefore
renders at 62.5% of its documented value (`gap-2`, nominally 8px, measures
5px there), regardless of which package it comes from. This component is the
first `@cypress-design/*` package built with that specific consumer's bug in
mind, since it was ported directly out of a `cypress-services` prototype
(see "Origin" above) where the bug was already diagnosed and worked around
this same way (tracked as `PD-32` in that repo's own tracker). A consumer
with a normal 16px root is unaffected either way -- `[24px]` and `h-6` render
identically there; the arbitrary value only matters for the one buggy
consumer.

**Do not "fix" this by switching back to the named scale** without first
confirming the root font-size bug has been fixed at the source in whichever
app you're checking against -- that fix is a large, separate migration (a
full visual regression pass across that app), not something to do as a side
effect of touching this component.

## Vue

Not implemented yet (deferred scope decision, see PR description). When it ships: reuse `constants/src/index.ts` as-is (it's framework-agnostic already), and Vue's live demo (`docs/src/demos/SpecResults.vue`) unblocks the standard `docs/src/pages/components/[component].astro` auto-render, which currently has nothing to render for this component.
