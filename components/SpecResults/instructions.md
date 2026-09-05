# SpecResults — Props, Events & Slots

`SpecResults` renders a run's headline in one row: how many specs failed, errored, passed, skipped, and how many are still to come. Each pill is a link into the Specs tab filtered to that status, and a 4px bar along the bottom edge shows the same breakdown as proportion. While the run is live it optionally carries the Cancel run action.

Use it at the top of a run's detail tabs — it replaces the old `NoticeSpecsQueuedRunning` well pattern in Cypress Cloud.

## Install

```bash
yarn add @cypress-design/react-spec-results   # React only for now — Vue is a planned fast-follow
```

A single package to install — types and class constants are bundled in (there is no separate `constants-spec-results` package to install; it is a private, internal-only workspace).

## Props

| Prop                  | Type               | Default   | Description                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `results`             | `SpecResultCounts` | required  | `{ failed?, errored?, passed?, skipped?, cancelled?, running?, queued?, cancelledReason? }` — plain numbers, plus `cancelledReason?: 'auto' \| 'manual'` (default `'auto'`) for the `cancelled` count's tooltip row. Omitted keys are zero. `skipped` and `cancelled` are separate inputs that combine into one "skipped" pill (see "Status mapping"). |
| `onCancel`            | `() => void`       | —         | When present, renders the Cancel run button and fires on click. Omit once the run completes.                                                                                                                                                                                                                                                           |
| `onArchive`           | `() => void`       | —         | Renders the Archive run button once the run is complete, and fires on click.                                                                                                                                                                                                                                                                           |
| `scheduledToComplete` | `string`           | —         | Remaining delay, e.g. `"60s"`. When set and nothing is running or queued, the trailing pill shows this time instead of a spec count.                                                                                                                                                                                                                   |
| `label`               | `string`           | `"specs"` | Noun appended to each pill (`"28 passed specs"`). Singular is derived by dropping the trailing `"s"`. Pass `""` to drop it entirely.                                                                                                                                                                                                                   |
| `description`         | `ReactNode`        | —         | Extra context about the run's own outcome (timed out, errored, manually/auto cancelled, no tests at all) — the caller owns the content. Renders above the pills, inside this same card, separated by a thin divider rather than a second bordered panel.                                                                                               |
| `isComplete`          | `boolean`          | —         | Overrides the derived "is this run complete" state. A timed-out/abandoned run can still carry a nonzero `queued` count (specs the recorder never claimed), which reads as still running and hides Archive — pass `true` once the caller independently knows nothing is still executing (e.g. `run.status === 'TIMEDOUT'`).                             |

`SpecResultCounts` is exported from the package (bundled in, not a separate install).

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

- While `running` or `queued` is above zero, a trailing pill sums both as **"N specs remaining"** (singular "1 spec remaining"). Queued specs never get their own pill — only this combined count and the bar reflect them.
- **Just started:** only the remaining pill renders until the first spec finishes.
- **Indeterminate:** every count is zero (no spec isolation yet, or nothing claimed). Falls back to a single "Testing in progress" pill and a fully animated bar.
- **Scheduled to complete:** every group has finished but the run is held open by the project's completion delay (`runCompletionDelay`) in case more parallel groups arrive. The trailing pill switches from a spec count to a countdown — `"60s remaining"` — and links to the project's General settings (`../../settings/general`) instead of the Specs tab. The bar keeps a small running block at its end so the run still reads as live. Don't pass `onCancel` here — cancelling would stamp a finished run as cancelled.
- **Complete:** nothing running or queued and no `scheduledToComplete`. The remaining pill and Cancel button both disappear.

## Interaction

- Every pill (except the scheduled-to-complete pill) is a plain relative `<a href="specs?specStatus=[...]">` — no router dependency. It resolves correctly from any tab under `/projects/:id/runs/:id/*` (a leading `../` would drop the run id, since every tab is itself a path segment under `:id`).
- `errored` filters on `ERRORED` + `TIMEDOUT`; `skipped` filters on `NOTESTS` + `CANCELLED`; the remaining pill filters on `RUNNING` + `UNCLAIMED`.
- Hover: the pill's text and icon take on the status's own hue (label at `-500`, the bold count a shade darker at `-600`) rather than a generic link color, plus a `gray-50` background — reads as "go to this status," not a generic hover.
- Cancel run fires `onCancel`. The component does not confirm or disable itself; the caller owns that flow.
- The bar is not interactive — it's the same breakdown as the pills, drawn as proportion. The running segment animates (shimmer) while live; queued track is empty (gray-100 at 50% opacity) so progress reads without relying on color.
- Below 576px of the strip's own rendered width the pills and Cancel button stack vertically and left-align. This is a container query (`@container` on the strip itself), not a viewport media query, so it responds to the strip's actual available width even when that's narrower than the viewport (a sidebar, a split pane) — not just the browser window.
- Three pills carry an explanatory tooltip on hover/focus (`@cypress-design/react-tooltip`, dark). `skipped` _always_ breaks `skipped`/`cancelled` back into "N specs skipped with no tests" / "N specs skipped via Auto Cancellation" — "skipped" alone never says which real status a spec actually has, so the reason is named even when only one cause contributes. The remaining pill likewise always breaks `running`/`queued` into "N specs running" / "N specs queued" — even a single-cause "N specs remaining" doesn't say whether those specs are running or still queued, so the reason is named the same way `skipped` names its own. The scheduled-to-complete pill always gets a tooltip naming the real setting (title "Run Completion Delay", body copied close to that setting's own description on the General settings page) plus an "Update settings" link to `../../settings/general` — the same href as the pill itself, surfaced explicitly rather than relying on the reader already knowing the pill underneath is clickable.

## Accessibility

- Pills are native `<a>` elements — keyboard-focusable and activatable by default, with a visible `focus-visible` state via the DS Button/link conventions.
- Status meaning is conveyed by both the icon and the text label, not color alone.
- The Cancel and Archive buttons are both the DS `Button` component (`@cypress-design/react-button`, `variant="outline-red"` / `"outline-gray-light"` respectively), each carrying its own accessible name ("Cancel run" / "Archive run") and focus styling.

## Data-cy selectors (test contract)

| Selector                                         | Element                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `[data-cy="spec-results"]`                       | Outer strip container                                                                             |
| `[data-cy="spec-results-pill-{status}"]`         | Each pill `<a>`. `{status}` is lowercase (`failed`, `errored`, `passed`, `skipped`, `running`).   |
| `[data-cy="spec-results-cancel"]`                | The Cancel run button                                                                             |
| `[data-cy="spec-results-archive"]`               | The Archive run button                                                                            |
| `[data-cy="spec-results-bar"]`                   | The tick-bar container                                                                            |
| `[data-cy="spec-results-pill-{status}-tooltip"]` | A pill's tooltip content, when it has one. Only rendered while the tooltip is open (hover/focus). |

## Known limitations

- **Sizing is literal px, not Tailwind's rem-based scale.** This is a workaround for a Cypress Cloud dashboard bug (a legacy `bootstrap-sass` global sets the page's root font-size to 10px instead of 16px, so every rem-based utility renders at 62.5% of normal there) -- not a flaw in this component. See `architecture.md` for the full explanation before "fixing" it back to the named scale.
- **React only for now.** No Vue implementation yet — planned as a fast-follow; see `architecture.md`.
- **No i18n.** All copy ("specs", "remaining", "Testing in progress") is hardcoded English.
- **No custom link renderer.** Unlike `RunResults`, there is no `renderLink`/router-integration prop — pills are always plain `<a>` tags. This is intentional: the hrefs are always route-relative to a Cypress Cloud run page, so no router integration has been needed yet.
- **Order is fixed.** No prop to reorder or hide individual pills beyond what a zero count already hides.
