---
name: components/SpecResults/instructions
description: "SpecResults API — a run's per-status spec breakdown (failed/errored/passed/skipped/remaining) as filterable pills plus a proportional progress bar: props, status mapping, pill order, interaction, accessibility, data-cy selectors, and FullStory tracking. React only. Fetch when using, reviewing, or referencing SpecResults."
---

# SpecResults — Props, Events & Slots

`SpecResults` renders a run's headline in one row: how many specs failed, errored, passed, skipped, and how many are still to come. Each count pill links to the Specs tab filtered to that status, and a 4px bar along the bottom edge shows the same breakdown as proportion. While the run is live it optionally carries the Cancel run action.

React only (`@cypress-design/react-spec-results`); there is no Vue implementation. Install and live examples: [react/ReadMe.md](https://design.cypress.io/agents/components/SpecResults/react/ReadMe.md). Use it at the top of a run's detail tabs.

## Props

| Prop                  | Type                    | Default  | Description                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `results`             | `SpecResultCounts`      | required | `{ failed?, errored?, passed?, skipped?, cancelled?, running?, queued?, cancelledReason? }` — plain numbers, plus `cancelledReason?: 'auto' \| 'manual'` (default `'auto'`) for the `cancelled` count's tooltip row. Omitted keys are zero. `skipped` and `cancelled` are separate inputs that combine into one "skipped" pill (see "Status mapping"). |
| `onCancel`            | `() => void`            | —        | When present, renders the Cancel run button and fires on click. Hidden automatically once the run is complete.                                                                                                                                                                                                                                         |
| `onArchive`           | `() => void`            | —        | Renders the Archive run button once the run is complete, and fires on click.                                                                                                                                                                                                                                                                           |
| `scheduledToComplete` | `string`                | —        | Remaining delay, e.g. `"60s"`, or `"soon"` when the delay is unknown or has elapsed. When set and nothing is running or queued, the trailing pill shows this time instead of a spec count (see "Running & remaining").                                                                                                                                 |
| `description`         | `ReactNode`             | —        | Extra context about the run's own outcome (timed out, errored, manually/auto cancelled, no tests at all) — the caller owns the content. Renders above the pills, inside this same card, separated by a thin divider rather than a second bordered panel.                                                                                               |
| `isComplete`          | `boolean`               | —        | Overrides the derived "is this run complete" state. A timed-out/abandoned run can still carry a nonzero `queued` count (specs the recorder never claimed), which reads as still running and hides Archive — pass `true` once the caller independently knows nothing is still executing (e.g. `run.status === 'TIMEDOUT'`).                             |
| `trackingContext`     | `string`                | —        | Your page/tab path, e.g. `"Run - Detail"`. Prefixes every `data-fs-element` label (see "FullStory tracking" below). **Pass this on every real integration** — without it, every place this component is used reports the identical label, so FullStory can't tell which page a click came from.                                                        |
| `renderLink`          | `SpecResultsRenderLink` | —        | `(href, children, props) => ReactNode`. Custom link renderer for framework routing — see "Custom link renderer" below. Falls back to a plain `<a href>` when omitted; SpecResults has no router dependency of its own.                                                                                                                                 |

The package exports the types `SpecResultsProps`, `SpecResultsRenderLink`, `SpecResultsRenderLinkProps`, and `SpecResultCounts` (re-exported from the bundled constants package, so there is nothing else to install).

## Status mapping

The caller folds Cloud's `RunInstanceStatusEnum` onto the `results` keys — this component knows nothing about that enum:

- `TIMEDOUT` → `errored`
- `NOTESTS` → `skipped`
- `CANCELLED` → `cancelled`
- `UNCLAIMED` → `queued`

`skipped` and `cancelled` stay separate inputs — the component sums them into one combined "skipped" pill (`skipped + cancelled`), and that pill's link filters the Specs tab on both `NOTESTS` and `CANCELLED`. Callers do not pre-sum these two counts themselves.

## Pill order

Always rendered in this fixed order, left-to-right (queued has no pill of its own — it only appears folded into the running/remaining pill and in the bar):

1. `failed`
2. `errored`
3. `passed`
4. `skipped`
5. running/remaining (see "Running & remaining" below)

A status with a count of zero is not rendered at all.

## Running & remaining

- While `running` or `queued` is above zero, a trailing pill sums both as **"N specs remaining"** (singular "1 spec remaining"). Queued specs never get their own pill — only this combined count and the bar reflect them. The pill shows the animated running icon only while `running` is nonzero and `isComplete` isn't set; otherwise it shows the static queued icon.
- **Just started:** only the remaining pill renders until the first spec finishes.
- **Indeterminate:** every count is zero _and_ `isComplete` isn't set. Renders a single "Testing in progress" pill and a fully animated bar.
- **Complete with zero counts:** every count is zero and the caller passes `isComplete` (e.g. a `NOTESTS` run where no specs were ever claimed). Renders a single non-interactive "0 specs found" `<span>` with the errored icon (not a link: there's nothing to filter), and the bar fills with the errored color. Put the explanation in `description` (e.g. "no spec files matched your `specPattern`").
- **Scheduled to complete:** nothing is running or queued, at least one count is nonzero, `scheduledToComplete` is set, and `isComplete` isn't. The trailing pill becomes a countdown (`"60s remaining"`, or **"Completing soon"** when `scheduledToComplete="soon"`) linking to the project's General settings (`../../settings/general`) instead of the Specs tab. The bar keeps a small running block at its end. Don't pass `onCancel` here: cancelling would stamp a finished run as cancelled. `isComplete` wins over `scheduledToComplete`: pass both and the countdown is suppressed.
- **Complete:** nothing running or queued and no `scheduledToComplete`, or `isComplete` passed. Cancel disappears and Archive (if `onArchive` is set) appears. With `isComplete` and a nonzero `running`/`queued`, the remaining pill still renders, with the static queued icon.

## Interaction

- Count pill `href`s are `specs?specStatus=[...]`, relative to the run tab's URL, so they resolve from any `.../runs/:id/<tab>` page. The scheduled-to-complete pill links to `../../settings/general` instead, which lands on the project's settings only when the page is `/projects/:id/runs/:id/<tab>`. By default links are a plain `<a href>` (full page load); pass `renderLink` to navigate client-side — see "Custom link renderer" below.
- `errored` filters on `ERRORED` + `TIMEDOUT`; `skipped` filters on `NOTESTS` + `CANCELLED`; the remaining pill filters on `RUNNING` + `UNCLAIMED` (`STATUS_FILTER_VALUES` in `components/SpecResults/constants/src/index.ts`).
- Hover: linked pills get a `gray-50` background and their text takes the status's hue (`HOVER_TEXT_CLASS` / `HOVER_COUNT_CLASS` in the same constants file; the skipped pill stays gray).
- Cancel run fires `onCancel`. The component does not confirm or disable itself; the caller owns that flow.
- The bar is not interactive. The running segment animates (shimmer) while live; queued track is empty.
- Below 576px of the strip's own rendered width the pills and Cancel button stack vertically and left-align. This is a container query (`@container` on the strip), not a viewport media query, so it responds to the strip's actual width inside a sidebar or split pane.
- Tooltips (`@cypress-design/react-tooltip`, dark) open on hover/focus. Rows for a zero cause are omitted.
  - `skipped` always lists its causes: "N specs skipped with no tests", and "N specs skipped via Auto Cancellation" (lightning-bolt icon) or "… via Manual Cancellation" (skipped icon) when `cancelledReason="manual"`.
  - The remaining pill always lists "N specs running" / "N specs queued".
  - The scheduled-to-complete pill shows the title "Run Completion Delay", a one-line description, and an "Update setting" link to the same href as the pill.

## Accessibility

- Linked pills are native `<a>` elements by default, keyboard-focusable with a `focus-visible` outline. A custom `renderLink` keeps this only if it spreads the given `className` onto a real link element (an `<a>`, or a router `Link` that renders one).
- The "0 specs found" pill is a plain `<span>`, out of the tab order.
- Status meaning is conveyed by both the icon and the text label, not color alone.
- The bar is plain `<div>`s with no ARIA; the pills carry the same counts as text. The tooltip's "Update setting" link duplicates the pill's own href, so keyboard users reach the same page from the pill.
- The Cancel and Archive buttons are the DS `Button` (`variant="outline-red"` / `"outline-gray-light"`) with visible text "Cancel run" / "Archive run".

## Data-cy selectors (test contract)

| Selector                                         | Element                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[data-cy="spec-results"]`                       | Outer strip container                                                                                                                                                                                                                                                                                               |
| `[data-cy="spec-results-description"]`           | The `description` block, when passed                                                                                                                                                                                                                                                                                |
| `[data-cy="spec-results-pill-{status}"]`         | Each pill. `{status}` is lowercase (`failed`, `errored`, `passed`, `skipped`, `running`); the remaining, "Testing in progress", and scheduled-to-complete pills all use `running`. An `<a>` by default; with `renderLink`, the element you spread `props` onto. The "0 specs found" pill (`errored`) is a `<span>`. |
| `[data-cy="spec-results-pill-{status}-tooltip"]` | A pill's tooltip content, when it has one. Only rendered while the tooltip is open (hover/focus).                                                                                                                                                                                                                   |
| `[data-cy="spec-results-cancel"]`                | The Cancel run button                                                                                                                                                                                                                                                                                               |
| `[data-cy="spec-results-archive"]`               | The Archive run button                                                                                                                                                                                                                                                                                              |
| `[data-cy="spec-results-bar"]`                   | The tick-bar container                                                                                                                                                                                                                                                                                              |

## FullStory tracking (`data-fs-element`)

Every clickable element in this component carries a `data-fs-element` attribute — a human-readable label FullStory uses in session replay and funnels. Without any setup, each label names the specific pill or button:

| Element               | Default `data-fs-element`                                               |
| --------------------- | ----------------------------------------------------------------------- |
| Each linked pill      | `"Spec Results - {Status} Specs"`, e.g. `"Spec Results - Failed Specs"` |
| A pill's tooltip link | `"Spec Results - {Status} Specs Tooltip Link"`                          |
| Cancel run button     | `"Spec Results - Cancel Run"`                                           |
| Archive run button    | `"Spec Results - Archive Run"`                                          |

**Always pass `trackingContext` when you wire this component into a real page.** Without it, every place `SpecResults` is used reports the same labels and FullStory can't tell one integration from another:

```tsx
<SpecResults
  results={results}
  onArchive={handleArchive}
  trackingContext="Run - Detail"
/>
```

That renders `data-fs-element="Run - Detail - Spec Results - Archive Run"`. One prop, set once per integration, covers every interactive element inside the component.

## Custom link renderer

Every link is a plain `<a href>` by default (a full page load). Use `renderLink` (type `SpecResultsRenderLink`) to integrate a framework router so clicks navigate client-side. It receives the relative `href` (unresolved), the link's rendered content, and `props: SpecResultsRenderLinkProps` (`className`, `data-cy`, `data-fs-element`) to spread onto your link element so it keeps this component's styling, test selectors, and FullStory tracking. It's called for every linked pill and for the scheduled-to-complete tooltip's "Update setting" link (whose `data-cy` is `''`). Return a single element.

`renderLink` is a plain callback, not a component: don't call hooks (`useNavigate`, …) inside it. Return an element of your own component that calls them, as below.

**react-router-dom v6 gotcha:** don't pass `href` straight to `<Link to={href}>` from a wildcard-routed tab. v6 resolves a relative `to` against the full matched route, so from `/runs/6/specs`, `to="specs?..."` can resolve to `/runs/6/specs/specs?...`. Resolve the href against `window.location.href` yourself and hand the router a real path:

```tsx
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  SpecResultsRenderLink,
  SpecResultsRenderLinkProps,
} from '@cypress-design/react-spec-results'

const RouterLink = ({
  href,
  children,
  ...props
}: SpecResultsRenderLinkProps & { href: string; children: ReactNode }) => {
  const navigate = useNavigate()
  return (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return
        e.preventDefault()
        const resolved = new URL(href, window.location.href)
        navigate(resolved.pathname + resolved.search + resolved.hash)
      }}
    >
      {children}
    </a>
  )
}

const renderLink: SpecResultsRenderLink = (href, children, props) => (
  <RouterLink href={href} {...props}>
    {children}
  </RouterLink>
)

// <SpecResults results={results} renderLink={renderLink} />
```

## Rules

- Sizes are px-based, so the component renders the same under a root font size other than 16px.
- Copy ("specs", "remaining", "Testing in progress", …) is hardcoded English; there is no prop to localize it.
- Pill order is fixed. There is no prop to reorder or hide pills; only a zero count hides one.
