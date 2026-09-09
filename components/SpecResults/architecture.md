# SpecResults — Architecture

Why the component is built the way it is. The source is the reference for
_how_; `instructions.md` is the usage contract.

## Where the logic lives

`buildSpecResultsView()` in `constants/src/index.ts` derives everything the
render needs (pills, tick-bar groups, completeness flags). It is kept out of the
React file so it can be unit-tested on its own and reused unchanged by a Vue
implementation. `SpecResults.tsx` is a render layer over that result. The
constants package is private and bundled into the React dist (same packaging
as `RunResults`), so consumers install one package.

## Decisions

- **Takes plain per-status counts, not Cloud's GraphQL instance list.** Keeps
  the component itself free of any data-model dependency; the caller does the
  status mapping (see `instructions.md`, "Status mapping").
- **Two pills combine two real statuses** (`skipped` = `NOTESTS` + `CANCELLED`;
  the remaining pill = `RUNNING` + `UNCLAIMED`) and both always carry a
  breakdown tooltip, even for a single cause: "3 skipped specs" or "5 specs
  remaining" never says which real status a spec has, unlike "18 passed".
- **Auto Cancellation rows use the lightning bolt** (`IconShapeLightningBolt`),
  this system's existing "time saved" icon (see `Textbox`), because Smart
  Orchestration stopped the run early. Manual cancellation gets the plain
  skipped icon since nothing was saved by automation.
- **`cancelledReason` is a run-level flag**, not per-spec: every cancelled spec
  in one run shares the same cause, so it rides alongside the count.
- **The scheduled-to-complete tooltip copies the real setting's name and
  description** ("Run Completion Delay") nearly verbatim rather than
  paraphrasing, so the two can't drift, and the tooltip is `interactive` so the
  "Update setting" link inside it is actually clickable.
- **`description` is a bare `ReactNode` slot** because Cloud's
  `RunDetailsBanner` and this strip had become two stacked panels explaining the
  same run. The slot lets the caller put run-level context (crash output, who
  cancelled, "no tests") inside this card; the component has no opinion about
  its content. `onCancel` / `onArchive` follow the same pattern: bare callbacks,
  no knowledge of mutations or eligibility rules.
- **`isComplete` can be overridden by the caller.** A timed-out run still has
  specs the recorder never claimed, indistinguishable from a live queue by
  counts alone, so the caller passes what it knows from run status.
- **Pill links are `<a>` elements with hrefs relative to a run tab URL**
  (`specs?specStatus=…`, `../../settings/general`). Inside a react-router
  `Router` they navigate client-side (`useNavigate`); elsewhere they are plain
  anchors. Known limitation, under review: the relative form only resolves
  correctly from exactly `/runs/:id/<tab>`, and the `react-router-dom`
  dependency belongs with the consumer (the `renderLink` pattern `RunResults`
  uses).

## Gotchas

- **Status-icon colors in the dark tooltip rows are overridden per call site**
  (`!icon-light-*` / `!icon-dark-*`), not by changing the shared icon's default,
  which is tuned for a white background. `icon-light`/`icon-dark` name which of
  the icon's two colorable layers a shape belongs to, not a page theme. Editing
  the raw `stroke` attribute in the SVG does nothing: consumer class rules beat
  presentation attributes, so confirm color changes with `getComputedStyle`.
- **Running-tick shimmer is an injected `<style>`** (`ensureShimmerStyle`),
  because the `@keyframes` had no utility-class equivalent without a preset
  change. Known debt: the right home is a `shimmer` keyframe in
  `@cypress-design/css` (it already owns `cardHover`), which would also replace
  the raw hex with the indigo token.
- **Sizes are literal `[Npx]` values, not Tailwind's rem scale**, because
  `cypress-services` still ships `bootstrap-sass`'s `html { font-size: 10px }`
  and every rem utility renders there at 62.5% (tracked as PD-32 in that repo).
  Consumers with a 16px root render identically either way. Don't switch back
  to the named scale until that root-font-size bug is fixed at the source.
- **Dividers use `[border-top-style:solid]` / `[border-bottom-style:solid]`.**
  `cypress-services` sets `corePlugins.preflight: false` in its Tailwind
  config, so `border-t` alone (width only) renders no line there. The named
  `border-solid` utility was tried and reverted: that consumer already uses it,
  and regenerating it changed an unrelated `Button`'s border. Tracked as
  [PD-42](https://cypress-io.atlassian.net/browse/PD-42) to fix in the consumer;
  a consumer with normal preflight doesn't need this.

## Vue

Not implemented yet. `constants/` is framework-agnostic and reusable as-is; the
docs page already renders the React demo (`docs/src/demos/SpecResults.astro`),
so a Vue port only adds its own tab.
