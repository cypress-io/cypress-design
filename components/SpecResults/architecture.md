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
- **The remaining pill** always attaches a tooltip the same way, one row per nonzero cause between `running`/`queued`. "N specs remaining" doesn't say whether those specs are actually running or still waiting to be claimed, so -- like `skipped` -- the split is worth naming even when only one cause contributes.

The scheduled-to-complete pill always gets a `text` tooltip, since that pill has no numeric split to break down at all. Its `title`/`text` mirror the real "Run Completion Delay" setting's own name and description on the General settings page almost verbatim (rather than a paraphrase that could quietly drift from what the setting page itself says), and `linkLabel` renders as an explicit "Update setting" CTA inside the tooltip -- reusing the pill's own `href`, since the tooltip never needs a second URL. `Tooltip` is given `interactive` so a reader can move their pointer from the pill into the tooltip and actually click that link without the tooltip closing first (floating-ui's hover-close otherwise fires the moment the pointer leaves the reference element).

`TooltipRow.icon` is `OutlineStatusIconName | 'lightning-bolt'` -- every row is a real status icon except Auto Cancellation, which uses `IconShapeLightningBolt` from `@cypress-design/react-icon` (not `@cypress-design/react-statusicon`) instead of reusing the plain skipped/ban icon a second time in the same tooltip. The lightning bolt is this design system's existing "time saved" icon (see `Textbox`'s own usage) -- Auto Cancellation stopped a run early, so it borrows that established meaning. `SpecResults.tsx` branches on `row.icon === 'lightning-bolt'` to pick which icon component to render, since the two live in different packages with different prop shapes (`OutlineStatusIcon` takes `status`; `IconShapeLightningBolt` takes `strokeColor`/`fillColor`).

`results.cancelledReason` ('auto' | 'manual', default 'auto') picks which of those two the `cancelled` row actually is -- a run is cancelled by Smart Orchestration (Auto Cancellation, the lightning bolt) or by a person clicking Cancel Run (Manual Cancellation, the plain skipped/ban icon, since nothing was "saved" by automation there and the lightning bolt's meaning wouldn't apply). This is a run-level fact, not per-spec -- every `cancelled` spec in one result set shares one reason, so it's a single flag alongside the count rather than something tracked per instance.

`SpecResults.tsx` branches on `tooltip.kind` to decide which of two small layouts to render inside `Tooltip`'s `popper` -- a `flex-col` list of icon+count+label rows, or a plain sentence. Both reuse the same `popperClassName` override (`CssClasses.tooltipPopper`): `!min-w-0` so the tooltip auto-fits its content instead of the shared Tooltip's 160px default, `!text-left` since this content is never the shared Tooltip's usual single centered line, and `!text-gray-300` for body text on the dark tooltip (matching `RunResults`' own dark-tooltip color, since the shared Tooltip's own default is plain white).

## Per-surface icon colors in the tooltip rows

`OutlineStatusIcon`'s running/unclaimed icons each have exactly one hardcoded default color (`gray-100`, set in `@cypress-design/constants-statusicon`'s own per-status config, not this file), tuned for sitting on the strip's white background. Reused as-is inside this component's dark tooltip rows, that same `gray-100` is either too faint (running's track, meant to read as a subtle background behind the animated arc) or too bright (queued's single ring, gray-100 being near-white against a dark surface) — a shared icon can only ship one default, but "faint enough to read as a track, not a second stroke" is a property of what's _behind_ the icon, not the icon itself.

Fixed with an explicit `className` override at each call site rather than patching the shared icon's own default -- `!icon-light-gray-200` (running, on the strip itself) / `!icon-light-gray-700` (running, in a tooltip row) / `!icon-dark-gray-700` (queued, in a tooltip row; no light-mode override needed since queued's icon never appears outside a tooltip row -- it's folded into the running pill everywhere else). The `!icon-{light,dark}-{color}` naming isn't arbitrary: `icon-light`/`icon-dark` are which of an icon's two colorable layers a given `<circle>`/`<path>` belongs to (running has both; queued's single ring is `icon-dark` only), not a page dark-mode toggle -- get the wrong one and the override silently does nothing, since there's no element with that class present to match.

**A hardcoded raw SVG attribute does not do this — a real mistake made once already.** An earlier pass tried recoloring running's track by editing the literal `stroke="#..."` attribute in the source SVG (`icon-registry/icons-static/status-running-outline_x16.svg`) directly. SVG presentation attributes have the lowest possible CSS priority — any matching class rule beats them — so every consumer's own `icon-light-{color}` class (auto-generated per status by `compileProps` from `constants-statusicon`'s config) silently overrode the hand-edited attribute, and the on-page color never actually changed. Confirm a color fix landed with `getComputedStyle(circle).stroke`, not `circle.getAttribute('stroke')` — the attribute can say anything while a class rule quietly wins the cascade.

## The `description` slot

`RunDetailsBanner` (cypress-services, `frontend/packages/dashboard/src/run/RunDetailsBanner.tsx`) and this component used to render as two separate, stacked, independently-bordered panels covering overlapping ground -- both explaining what happened to the run. `description` replaces that duplication: it's a plain `ReactNode` slot, rendered inside this component's own card above the pills, separated from them by a thin divider rather than a second bordered/colored panel. This component has no opinion on what goes in it -- no icon, avatar, or archive-action layout is baked in here, only the slot and its divider. The caller (cypress-services) owns the actual content: run-level outcomes SpecResults' own per-instance counts can't express on their own (a Chrome-renderer crash's error text, who manually cancelled a run and when, Smart Orchestration's auto-cancel explanation, "this run has no tests at all"). See `docs/src/demos/SpecResultsDemo.tsx` in this repo for worked examples of each case.

`onArchive` follows the same non-opinionated pattern as `onCancel` -- a bare callback, not a component that knows about GraphQL mutations or archive-eligibility rules. It's gated on `isComplete` rather than on `description` being present, since Archive is useful on any finished run, not only the ones with something to explain.

A timed-out or otherwise abandoned run can still carry a nonzero `queued` count -- specs the recorder never claimed, indistinguishable from a genuinely live queue by totals alone -- so the derived `isComplete` reads it as still running and Archive never shows. The `isComplete` prop overrides the derived value for exactly this case: the caller passes `true` once it knows independently (e.g. `run.status === 'TIMEDOUT'`) that nothing is actually still executing.

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

## Known issue: cypress-services doesn't supply Tailwind's border-style preflight default

`SpecResults.tsx`'s three dividers (the `description` slot's bottom border, and
the two button rows' top borders) use `[border-bottom-style:solid]` /
`[border-top-style:solid]` -- an arbitrary-value selector -- instead of a plain
`border-b`/`border-t` alone or the named `border-solid` utility. Both of those
more obvious options render **no visible border at all** in `cypress-services`:
`border-b`/`border-t` only ever set `border-*-width`, and normally rely on
Tailwind's own preflight (`*, ::before, ::after { border-style: solid }`) to
supply the style half -- but that app's compiled CSS doesn't carry that
declaration (leading suspect: its legacy `bootstrap-sass` reset, already
tracked as migration debt in that repo's own `STYLE_GUIDE.md`, though not
confirmed further than that). Confirmed via `getComputedStyle`: width and
color compute correctly, `border-*-style` computes `none`.

**The named `border-solid` utility is not a safe fix either** -- it was tried
first and reverted. `cypress-services` already uses `border-solid` elsewhere in
its own source, so adding it here caused Tailwind's JIT to (re)generate that
utility's CSS rule, which then applied to _every_ element in that app already
carrying the class -- including an unrelated, already-correct `Button`
component's border, which went from a clean 1px on all sides to an uneven
1.5px on three of them. The arbitrary-value selector avoids this because it
compiles to a selector no other class name can coincide with.

This is a workaround for a gap in one consumer's build, not a flaw in this
component -- a consumer with a normal, complete Tailwind preflight doesn't need
it (a bare `border-b`/`border-t` already renders correctly there). Tracked as
[PD-42](https://cypress-io.atlassian.net/browse/PD-42) to fix at the actual
source (the `cypress-services` Tailwind/PostCSS pipeline) so future components
don't need this same per-component patch.

## Vue

Not implemented yet (deferred scope decision, see PR description). When it ships: reuse `constants/src/index.ts` as-is (it's framework-agnostic already) and add `vue/ReadMe.md`. The standard `docs/src/pages/components/[component].astro` page already renders this component -- it derives the framework list from `react/` existing, hides the framework tabs when there is only one, and renders `react/ReadMe.md`, `instructions.md`, and the live demo (`docs/src/demos/SpecResults.astro`, a single React island backed by `SpecResultsDemo.tsx`) -- so Vue only adds its own tab.
