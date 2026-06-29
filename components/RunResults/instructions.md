# RunResults — Props, Events & Slots

`RunResults` summarizes a Cypress run as up to two pills inside one wrapper:

1. **Run-status pill** (optional, leading) — `#N` + status icon, with an optional branch segment. Drop in by passing the `runStatus` prop.
2. **Test-counts pill** (optional, trailing) — passed / failed / skipped / pending counts, with two independent optional leading stats (flaky and self-healed) rendered before the regulars and separated by a vertical divider. Drop in by passing the relevant count props.

Either pill is independently optional. Each stat or segment is an icon + label, optionally wrapped in a link, optionally wrapped in a Tooltip. Supports `light` and `dark` themes.

Use it in run summary cards, dashboard rows, and any list/grid view where you want a compact, scannable summary of a run.

## Install

```bash
yarn add @cypress-design/vue-runresults          # Vue
yarn add @cypress-design/react-runresults        # React
```

A single package per framework — types and class constants are bundled in (there is no separate `constants-runresults` package to install).

## Props

### Run-status pill

| Prop        | Type              | Default | Description                                                                                                                                                                      |
| ----------- | ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runStatus` | `RunStatusConfig` | —       | When provided, renders the run-status pill **before** the test-counts pill. When omitted, no run-status pill is rendered. See [Run-status pill](#run-status-pill) for the shape. |

### Test-counts pill

| Prop             | Type                               | Default | Description                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `passed`         | `number \| null`                   | `0`     | Passed test count. `null` and `undefined` are treated as `0`. (Was previously required — relaxed so callers can render only the run-status pill.)                                                                                                                            |
| `failed`         | `number \| null`                   | `0`     | Failed test count. `null` and `undefined` are treated as `0`.                                                                                                                                                                                                                |
| `skipped`        | `number \| null`                   | `0`     | Skipped test count. `null` and `undefined` are treated as `0`.                                                                                                                                                                                                               |
| `pending`        | `number \| null`                   | `0`     | Pending test count. `null` and `undefined` are treated as `0`.                                                                                                                                                                                                               |
| `flaky`          | `number \| null`                   | —       | Flaky test count. When > 0, renders the flaky stat as a leading stat.                                                                                                                                                                                                        |
| `selfHealed`     | `number \| null`                   | —       | Self-healed test count. Rendered whenever `showSelfHealed` is `true` — the count is shown verbatim, including `0`. `null` is coerced to `0`.                                                                                                                                 |
| `showSelfHealed` | `boolean`                          | `false` | Master gate for the self-healed stat. Consumers set this `true` when the run could have self-healed tests (e.g. `cy.prompt` was available), `false` otherwise.                                                                                                               |
| `expanded`       | `boolean`                          | `false` | When `true`, renders all four regular stats even if their count is `0`. Does **not** affect leading stats (flaky is rendered only when count > 0; self-healed renders whenever `showSelfHealed` is `true`).                                                                  |
| `links`          | `Partial<Record<StatKey, string>>` | —       | Per-stat pre-built URLs for the test-counts pill. Caller is responsible for URL construction (no router in the DS). The run-status pill has its own `href` / `branchHref` inside `runStatus`.                                                                                |
| `pillClassName`  | `string`                           | —       | Classes for the **test-counts pill `<ul>`**, merged via `tailwind-merge`. A conflicting utility **overrides** the DS default — e.g. `"bg-gray-900"` / `"bg-transparent"` wins over the theme background. The run-status pill has its own `pillClassName` inside `runStatus`. |

### Shared

| Prop          | Type                                                               | Default   | Description                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme`       | `"light" \| "dark"`                                                | `"light"` | Color scheme for **both** pills. Must be set explicitly — no auto theme detection.                                                                                                                                                                                                                                                                                                  |
| `renderLink`  | `(href: string, children: unknown, className?: string) => unknown` | —         | Custom link renderer used by **both** pills. Same signature in both frameworks; `children` is the framework's native rendered content (a JSX element in React, an array of `VNode`s in Vue), typed as `unknown`. `className` is the component's computed link styling — apply it to your link so it matches the default `<a>`. Falls back to a native `<a href>` when not provided. |
| `showTooltip` | `boolean`                                                          | `true`    | When `true`, wraps each test-counts stat in a Tooltip describing the stat. (The run-status pill is not wrapped in a Tooltip — its `aria-label` and `title` carry status information; if you need a tooltip, wrap the rendered component externally.)                                                                                                                                |
| `className`   | `string`                                                           | —         | Classes for the **root wrapper** element, appended via `clsx` (DS convention). Does not override DS classes.                                                                                                                                                                                                                                                                        |

`StatKey` is `"passed" | "failed" | "skipped" | "pending" | "flaky" | "selfHealed"` (camelCase, matching `StatusIcon`'s multi-word keys like `noTests`, `timedOut`). `data-cy` attributes use the kebab-case form (`total-self-healed`, `status-icon-self-healed`) — that's a DOM-attribute convention, not the API.

### `RunStatusConfig` shape

| Field           | Type               | Default  | Description                                                                                                                                                                                       |
| --------------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buildNumber`   | `number`           | required | Build number to display. Rendered as `#${buildNumber}`. Not formatted — pass a small integer.                                                                                                     |
| `status`        | `RunStatusKey`     | required | Run status. One of `"passed"`, `"failed"`, `"running"`, `"cancelled"`, `"errored"`, `"timedOut"`, `"noTests"`, `"overLimit"`. Drives the status icon and (for `variant="link"`) the border color. |
| `branch`        | `string`           | —        | Branch name. When set, a vertical divider and a branch segment (`technology-branch-h_x16` + branch text) are rendered after `#N`.                                                                 |
| `variant`       | `"base" \| "link"` | `"base"` | `"base"` — no outer border (in-progress / "this run" treatment). `"link"` — 1px status-colored border (jade / red / indigo / gray / orange) plus hover styling.                                   |
| `href`          | `string`           | —        | URL for the `#N` segment. When set, that segment is wrapped in `<a href>` (or `renderLink(href, ...)`). Independent of `variant`.                                                                 |
| `branchHref`    | `string`           | —        | URL for the branch segment, independent of `href`. Only meaningful when `branch` is set.                                                                                                          |
| `pillClassName` | `string`           | —        | Classes for the **run-status pill**, merged via `tailwind-merge`. Conflicting utilities override the DS default.                                                                                  |

## Type exports

Import these directly from the framework package (`@cypress-design/react-runresults` or `@cypress-design/vue-runresults`) — they are bundled in:

| Type              | Description                                                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RunResultsProps` | Full prop interface for the component.                                                                                                                                                        |
| `RunResultsTheme` | `"light" \| "dark"` — derived from `keyof typeof CssTheme`.                                                                                                                                   |
| `StatKey`         | `"passed" \| "failed" \| "skipped" \| "pending" \| "flaky" \| "selfHealed"`. Used as keys in the `links` prop. `data-cy` selectors use the kebab-case form (`self-healed`).                   |
| `RunStatusKey`    | `"passed" \| "failed" \| "running" \| "cancelled" \| "errored" \| "timedOut" \| "noTests" \| "overLimit"`. Run-applicable subset of `StatusIcon`'s `statusTypes`. Used as `runStatus.status`. |
| `RunStatusConfig` | The shape of the `runStatus` prop (see table above).                                                                                                                                          |

`RunStatusKey` deliberately excludes per-test statuses (`skipped`, `pending`, `flaky`, `placeholder`, `unclaimed`, `failing`) — those don't apply at the run level. Translate from your domain enum at the integration boundary (e.g. cypress-services keeps a `runStatusEnumToStatusDesignSystem` helper in its dashboard layer).

## Pill order

The two pills are rendered left-to-right inside the root wrapper:

1. **Run-status pill** — rendered first, only when `runStatus` is provided.
2. **Test-counts pill** — rendered after the run-status pill, only when at least one stat is visible (see "Stat order" below).

Both pills are independently optional. Common configurations:

- Run-status only — pass `runStatus`, omit / null all test counts → only the leading pill renders.
- Test-counts only — omit `runStatus`, pass counts → only the trailing pill renders (today's behavior).
- Both — pass both → both pills render side-by-side with a small gap.
- Neither → component returns `null` (renders nothing).

## Run-status pill

A pill rendered to the left of the test-counts pill, containing the run identifier:

```
[ <status icon>  #468 ┃ <branch icon>  develop ]
```

- The `#N` segment is always rendered when `runStatus` is set.
- The branch segment (`branch icon` + branch text) is rendered only when `runStatus.branch` is set.
- A 1px vertical divider separates the two segments (rendered only when both are present).
- `runStatus.variant` controls the **visual treatment** (border or not); `runStatus.href` / `runStatus.branchHref` control **clickability**. The two are orthogonal — see [Variant + linkability](#variant--linkability).
- `runStatus.status` drives both the inner status icon (`StatusIcon`) and, when `variant="link"`, the outer border color.

The status icon is chosen internally — no consumer knob for variant / size. Variant matches `StatusIcon`'s declared variants for each status (`running` is `outline`-only; terminal statuses use `solid`). Size is fixed at `16` to match the pill height.

### Branch segment

- Icon: `technology-branch-h_x16` (via `@cypress-design/react-icon` / `vue-icon`).
- Text: branch name verbatim, truncated with `max-w-[260px]` to keep long branches from breaking layout.
- Pass `runStatus.branchHref` to make only the branch segment clickable; pass both `runStatus.href` and `runStatus.branchHref` to make both clickable to different URLs.

If you need a standalone branch chip (without a build number), use a `Tag` with a leading icon — `RunResults`'s run-status pill always renders `#N` as the primary segment.

### Variant + linkability

`variant` and `href` / `branchHref` are independent:

| `variant` | `href`/`branchHref` set | Result                                                               |
| --------- | ----------------------- | -------------------------------------------------------------------- |
| `base`    | no                      | Plain pill, no border. Pure presentational.                          |
| `base`    | yes                     | Plain pill, segment is clickable. No status-colored border.          |
| `link`    | no                      | Status-colored border, segment is plain text. Rare but supported.    |
| `link`    | yes                     | Status-colored border + clickable segment. The "past run" treatment. |

### Status → border color

The status-colored border only renders when `variant="link"`. Colors are reused tokens (no new tokens):

| `runStatus.status`                               | Border       |
| ------------------------------------------------ | ------------ |
| `passed`                                         | `jade-400`   |
| `failed`                                         | `red-400`    |
| `running`                                        | `indigo-400` |
| `cancelled`                                      | `gray-400`   |
| `errored` / `timedOut` / `noTests` / `overLimit` | `orange-400` |

## Stat order

Inside the test-counts pill, stats render left-to-right in this order:

1. **Leading stats** (each independent, each optional)
   1. `flaky` — rendered when `flaky > 0`
   2. `selfHealed` — rendered whenever `showSelfHealed === true` (count `0` is still shown)
2. **Separator** — vertical divider, rendered only when at least one leading stat **and** at least one regular stat are both present
3. **Regular stats**
   1. `skipped`
   2. `pending`
   3. `passed`
   4. `failed`

Regular stats with count `0` are hidden unless `expanded` is `true`. Examples:

- No leading stats, all regular stats present → no divider.
- Only `flaky` → flaky, then divider, then regulars.
- Only `self-healed` → self-healed, then divider, then regulars.
- Both `flaky` and `self-healed` → flaky, self-healed, then divider, then regulars.
- Leading stat(s) present, all regular counts zero, `expanded=false` → leading stat(s) only, no divider.

`expanded` only affects regular stats. Flaky is never rendered with a zero count regardless of `expanded`. Self-healed visibility is controlled by `showSelfHealed`, not by `expanded` or by its count.

### Empty state

When **neither pill would render** — no `runStatus`, no visible test-counts stats (all four regulars are zero/null with `expanded=false`, and neither `flaky` nor `selfHealed` is set) — `RunResults` returns `null`. It does not render an empty bordered wrapper. The parent layout should be prepared for the component to disappear; render a skeleton or placeholder externally if you need stable layout during loading.

If only one pill would render, the other is skipped and the wrapper holds just the visible pill.

## Themes

`theme` applies to **both** pills. Per-pill overrides use the relevant `pillClassName` (top-level for test-counts, `runStatus.pillClassName` for run-status) merged via `tailwind-merge`.

- `light` — gray-bordered pill, gray text, subtle gray hover background for linked stats / segments.
- `dark` — darker border, lighter text, dark hover background, darker separator. Override either pill's background with the relevant `pillClassName` (e.g. `"bg-gray-900"`) to blend into a colored surface.

Both themes use explicit Tailwind colors mapped from the design tokens. The component does **not** read the parent `dark` class — set `theme` explicitly.

## Linked vs unlinked segments and stats

The same truthiness rule applies to all linkable elements — segments in the run-status pill and stats in the test-counts pill:

- **Test-counts stats:** If `links?.[statKey]` is a **truthy string**, the stat renders inside an `<a href={links[statKey]}>` (or `renderLink(href, ...)` if provided). The whole `<li>` is clickable, with hover and focus styling.
- **Run-status segments:** If `runStatus.href` is truthy, the `#N` segment renders as `<a>`. If `runStatus.branchHref` is truthy, the branch segment renders as `<a>`. The two are independent.
- Empty strings, `null`, `undefined`, and omitted keys all count as unlinked. To make any segment / stat clickable, pass a non-empty href.
- You can mix linked and unlinked in one render (e.g. clickable `runStatus.href`, plain branch; or linked `flaky` stat with everything else plain).
- The truthiness check also drives the tooltip wording for stats: linked stats get `"View {status} tests"`, unlinked stats get `"{Capitalized status} tests"`. The run-status pill is not tooltip-wrapped — its `aria-label` and `title` carry status information.

### Custom link renderer

Use `renderLink` to integrate with a framework router (e.g. React Router, Vue Router, Next.js `Link`). It's shared by **both** pills — same callback receives `runStatus.href` / `runStatus.branchHref` (run-status pill) and `links[statKey]` (test-counts pill). Signature: `(href, children, className?) => element`. Apply the provided `className` to your link so it matches the default `<a>` styling.

```tsx
<RunResults
  runStatus={{
    buildNumber: 468,
    status: 'passed',
    branch: 'develop',
    variant: 'link',
    href: '/projects/abc/runs/468/overview',
    branchHref: '/projects/abc/branches/develop',
  }}
  passed={22}
  failed={4}
  skipped={0}
  pending={1}
  links={{ passed: '/runs/468/test-results?status=passed' }}
  renderLink={(href, children, className) => (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  )}
/>
```

## Tooltip behavior

When `showTooltip` is `true` (default), each stat is wrapped in a Tooltip.

- Regular stats:
  - Linked: `"View {status} tests"` (e.g. `"View passed tests"`)
  - Unlinked: `"{Status} tests"` (e.g. `"Passed tests"`)
- Flaky stat (dynamic): `"N tests both passed and failed when retried within a run"`, or `"This test both passed and failed when retried within a run"` when the count is `1`.
- Self-healed: `"View self-healed tests"` / `"Self-healed tests"`.

**Placement:**

- Flaky stat: `top-start` (left-aligns the popper with the stat so the arrow points at the stat itself, not the center of a wider popper)
- All other stats: `top-end`

**Color** is the inverse of the component theme for contrast against the surface the pill sits on:

- `theme="light"` → tooltip renders with `color="dark"`
- `theme="dark"` → tooltip renders with `color="light"`

## Events

| Event | Payload | Description                                                                                 |
| ----- | ------- | ------------------------------------------------------------------------------------------- |
| —     | —       | None. Use `links` / `renderLink` for navigation. The component is otherwise presentational. |

## Slots

| Slot | Description                                                                       |
| ---- | --------------------------------------------------------------------------------- |
| —    | None. The component does not expose slots; rendering is driven entirely by props. |

## Accessibility

- The root is `<div data-cy="run-results">` (the wrapper). Inside it is, in order: the optional run-status pill (a `<span>` with its segments) and the optional test-counts pill (a semantic `<ul>` of `<li>` stats).
- **Test-counts pill:** linked stats render an `<a>` with `aria-label="View {status} tests"`. Unlinked stats use plain text with no extraneous role. Tooltips are wired through the internal Tooltip component, which uses Floating UI's focus/pointer detection — keyboard focus on a linked stat reveals the tooltip.
- **Run-status pill:** linked segments render an `<a>` with `aria-label="View run #{buildNumber}"` (or `aria-label="View branch {branchName}"` for the branch segment). Unlinked segments are plain text. The pill carries a `title` attribute with a readable status string (`"Passed"`, `"Running"`, etc.) so screen readers and hover-tooltips both announce it. The divider between segments is decorative (`role="presentation"`).
- Focus styling on **all** linked elements uses `outline` (not `border`) to avoid layout shift between focus states.
- Icons inside stats / segments are decorative; status meaning is conveyed by the tooltip / `aria-label` / `title`.

## Data-cy selectors (test contract)

These selectors are part of the public contract — existing tests in consumer apps depend on them:

| Selector                              | Element                                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------------------- |
| `[data-cy="run-results"]`             | Outer wrapper (holds both pills).                                                             |
| `[data-cy="run-status"]`              | Run-status pill `<span>`. Present only when `runStatus` is set.                               |
| `[data-cy="run-status-build-number"]` | The `#N` segment (`<a>` or `<span>`).                                                         |
| `[data-cy="run-status-icon"]`         | The status icon inside the `#N` segment.                                                      |
| `[data-cy="run-status-branch"]`       | The branch segment (`<a>` or `<span>`). Present only when `runStatus.branch` is set.          |
| `[data-cy="run-status-branch-icon"]`  | The branch icon inside the branch segment.                                                    |
| `[data-cy="total-{status}"]`          | Each `<li>` wrapping a test-counts stat. `{status}` is kebab-case (e.g. `total-self-healed`). |
| `[data-cy="link-{status}"]`           | The `<a>` of a linked test-counts stat. Kebab-case.                                           |
| `[data-cy="status-icon-{status}"]`    | The status icon for a test-counts stat. Kebab-case (e.g. `status-icon-self-healed`).          |
| `[data-cy="status-icon-flaky"]`       | The flaky icon.                                                                               |

## Known limitations

- No `auto` theme — `theme` must be set explicitly. (Repo-wide limitation, not specific to this component.)
- No `ordering` prop. Pill order is fixed (run-status before test-counts); stat order inside the test-counts pill is fixed too. Application-specific orderings are not supported.
- Test-counts regular stats are limited to `passed`, `failed`, `skipped`, `pending` plus the optional `flaky` / `self-healed` leading stats. Run-level statuses (`running`, `errored`, `timedOut`, `noTests`, `overLimit`, `cancelled`) live on `runStatus.status` and don't appear as regular stats in the test-counts pill.
- Test-counts icons are fixed at size `12`; run-status icon is fixed at size `16`. No size prop.
- Run-status pill is fixed at 24px tall. No size variant.
- Counts and build numbers are display-only; the component does not format large numbers (e.g. `1,234`) — pass small integers, or wait for a follow-up.
- Run-status pill is **not** Tooltip-wrapped — `showTooltip` only affects the test-counts pill. Wrap `<RunResults>` externally if you need a tooltip on the run-status pill.
- Self-healed renders whenever `showSelfHealed` is `true`, regardless of the `selfHealed` count (a `0` count renders as "0"). When `showSelfHealed` is `false`, the stat is hidden entirely — the consumer is expected to set the flag based on whether the run could have self-healed tests at all (e.g. `cy.prompt` was available).
- **No loading state.** `null` and `0` counts render identically. If you need to distinguish "loading" from "zero", render a skeleton/spinner externally and conditionally mount `<RunResults>` when data lands. With both pills omitted, the component returns `null`.
- **No re-run badge.** The "Re-run" pill that cypress-services attaches to `RunsListItem`'s build number is a separate concern — render it as a sibling outside `<RunResults>`.
- **No i18n.** Tooltip / aria-label / title strings are hardcoded English ("View passed tests", "View run #N", "Passed", "N tests both passed and failed when retried within a run", etc.). A `labels` override prop can be added when a real consumer needs translations.
