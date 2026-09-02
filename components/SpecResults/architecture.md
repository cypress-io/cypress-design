# SpecResults — Architecture

## Origin

Ported from `frontend/packages/dashboard/src/specs/SpecsStatusStripPrototype.tsx` in `cypress-services` (PR #14230) — a live design-iteration prototype built directly against the Run Overview page. This component is that prototype's logic, generalized into a presentational, framework-published component: it takes plain per-status counts rather than Cloud's GraphQL instance list, so it has no data-model or routing dependency.

## File layout

- `constants/src/index.ts` — everything that isn't JSX: the `StripStatus` union and fixed `STATUS_ORDER`/`PILL_STATUS_ORDER`, the public `SpecResultCounts` prop type, per-status metadata (`STATUS_META`: icon name, label, hover color, tick class), the Specs-tab filter-value mapping (`STATUS_FILTER_VALUES`), all Tailwind class strings (`CssClasses`, `HOVER_TEXT_CLASS`, `HOVER_COUNT_CLASS`), and the one real algorithm, `buildSpecResultsView()`.
- `react/SpecResults.tsx` — a thin render layer over `buildSpecResultsView()`. It owns nothing but JSX, icon components (`@cypress-design/react-statusicon`), and the Cancel button (`@cypress-design/react-button`).
- `constants` is `"private": true` (see `package.json`) — its types are inlined into the react package's bundled `.d.ts` via `rollup.dts.config.mjs` (same pattern as `RunResults`). Consumers only ever install `@cypress-design/react-spec-results`.

## `buildSpecResultsView()`

This is where the actual logic lives, kept out of the component so it's independently testable and reusable if/when a Vue implementation ships. Given `results` + `{ label, scheduledToComplete }`, it derives:

- **`pills`** — pre-rendered pieces (`countText` + `rest`) in fixed order, with the indeterminate and scheduled-to-complete special cases already resolved. The component just interpolates `<b>{countText}</b> {rest}`.
- **`groups`** — the tick-bar segments: same per-status data, but resorted into `STATUS_ORDER` and run-length-encoded (contiguous same-status specs collapse into one flush block, so e.g. 18 passed specs render as one shape instead of 18 touching squares — gaps only appear at status boundaries).
- **`indeterminate`**, **`isComplete`**, **`remaining`**, **`total`** — the derived state flags the component (and the "scheduled" branch) key off of.

Singular/plural (`"1 failed spec"` vs `"18 passed specs"`) is handled once, in `withSuffix()`, by dropping the trailing `"s"` off whatever `label` was passed — not by a separate singular string table.

## Running-tick shimmer

The running tick's animated gradient (`SpecResults.tsx`, `ensureShimmerStyle()`) is a small `<style>` element injected into `document.head` once per page (module-level guard, not per-render), rather than a Tailwind utility class. Tailwind's JIT can synthesize the `background-image`/`background-size` utilities as arbitrary values, but the accompanying `@keyframes` block has no equivalent utility-class mechanism unless the keyframe is pre-registered in the _consuming_ app's Tailwind theme — which we can't assume across every consumer of a published component. This mirrors the reference web-component implementation this port was based on (which used the same `<style>`-in-shadow-root technique). **Known debt:** if component-level keyframes become a recurring need, the better long-term fix is registering shared keyframes once in `@cypress-design/css`'s core Tailwind plugin (it already does this for `cardHover`/`border`) so every consumer gets them via the shared preset instead of each component injecting its own `<style>` tag.

## Why plain `<a>`, not a router-aware link

Unlike `RunResults` (which exposes `renderLink` for router integration), every href here is always relative to a Cypress Cloud run page (`../specs?...`, `../../settings/general`) and the only known consumer (`cypress-services`) already uses plain anchors for this exact pattern (confirmed working with React Router's `<Link>`, which renders to an `<a>` under the hood — a bare `<a>` works identically for same-origin relative navigation). Add a `renderLink`-style prop if a second consumer needs SPA-internal navigation without a full page load.

## Vue

Not implemented yet (deferred scope decision, see PR description). When it ships: reuse `constants/src/index.ts` as-is (it's framework-agnostic already), and Vue's live demo (`docs/src/demos/SpecResults.vue`) unblocks the standard `docs/src/pages/components/[component].astro` auto-render, which currently has nothing to render for this component.
