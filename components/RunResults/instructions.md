# RunResults — Props, Events & Slots

`RunResults` renders a pill of test-result counts (passed / failed / skipped / pending) with two independent optional leading stats — flaky and self-healed — rendered before the regular stats and separated from them by a vertical divider. Each stat is an icon + count, optionally wrapped in a link, optionally wrapped in a Tooltip. Supports `light` and `dark` themes.

Use it in run summary cards, dashboard rows, and any list/grid view where you want compact, scannable counts of test outcomes.

## Install

```bash
yarn add @cypress-design/vue-runresults          # Vue
yarn add @cypress-design/react-runresults        # React
```

A single package per framework — types and class constants are bundled in (there is no separate `constants-runresults` package to install).

## Props

| Prop             | Type                                                               | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `passed`         | `number \| null`                                                   | required  | Passed test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `failed`         | `number \| null`                                                   | required  | Failed test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `skipped`        | `number \| null`                                                   | required  | Skipped test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `pending`        | `number \| null`                                                   | required  | Pending test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `flaky`          | `number \| null`                                                   | —         | Flaky test count. When > 0, renders the flaky stat as a leading stat.                                                                                                                                                                                                                                                                                                                                                                                         |
| `selfHealed`     | `number \| null`                                                   | —         | Self-healed test count. Rendered whenever `showSelfHealed` is `true` — the count is shown verbatim, including `0`. `null` is coerced to `0`.                                                                                                                                                                                                                                                                                                                  |
| `showSelfHealed` | `boolean`                                                          | `false`   | Master gate for the self-healed stat. Consumers set this `true` when the run could have self-healed tests (e.g. `cy.prompt` was available), `false` otherwise.                                                                                                                                                                                                                                                                                                |
| `theme`          | `"light" \| "dark"`                                                | `"light"` | Color scheme. Must be set explicitly — no auto theme detection.                                                                                                                                                                                                                                                                                                                                                                                               |
| `expanded`       | `boolean`                                                          | `false`   | When `true`, renders all four regular stats even if their count is `0`. Does **not** affect leading stats (flaky is rendered only when count > 0; self-healed renders whenever `showSelfHealed` is `true`).                                                                                                                                                                                                                                                   |
| `links`          | `Partial<Record<StatKey, string>>`                                 | —         | Per-stat pre-built URLs. Caller is responsible for URL construction (no router in the DS).                                                                                                                                                                                                                                                                                                                                                                    |
| `renderLink`     | `(href: string, children: unknown, className?: string) => unknown` | —         | Custom link renderer. Same signature in both frameworks; `children` is the framework's native rendered icon + count (a JSX element in React, an **array** of `VNode`s in Vue), typed as `unknown` because the two shapes differ — narrow it inside your callback if you need typed access. `className` is the component's computed link styling — apply it to your link so it matches the default `<a>`. Falls back to a native `<a href>` when not provided. |
| `showTooltip`    | `boolean`                                                          | `true`    | When `true`, wraps each stat in a Tooltip describing the stat.                                                                                                                                                                                                                                                                                                                                                                                                |
| `className`      | `string`                                                           | —         | Classes for the **root wrapper** element, appended via `clsx` (DS convention). Does not override DS classes.                                                                                                                                                                                                                                                                                                                                                  |
| `pillClassName`  | `string`                                                           | —         | Classes for the **pill `<ul>`**, merged via `tailwind-merge`. A conflicting utility **overrides** the DS default — e.g. `"bg-gray-900"` / `"bg-transparent"` wins over the theme background — while non-conflicting classes are added.                                                                                                                                                                                                                        |

`StatKey` is `"passed" | "failed" | "skipped" | "pending" | "flaky" | "selfHealed"` (camelCase, matching `StatusIcon`'s multi-word keys like `noTests`, `timedOut`). `data-cy` attributes use the kebab-case form (`total-self-healed`, `status-icon-self-healed`) — that's a DOM-attribute convention, not the API.

## Type exports

Import these directly from the framework package (`@cypress-design/react-runresults` or `@cypress-design/vue-runresults`) — they are bundled in:

| Type              | Description                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RunResultsProps` | Full prop interface for the component.                                                                                                                                      |
| `RunResultsTheme` | `"light" \| "dark"` — derived from `keyof typeof CssTheme`.                                                                                                                 |
| `StatKey`         | `"passed" \| "failed" \| "skipped" \| "pending" \| "flaky" \| "selfHealed"`. Used as keys in the `links` prop. `data-cy` selectors use the kebab-case form (`self-healed`). |

## Stat order

Always rendered in this order, left-to-right:

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

When no stats render — all four regular counts are zero/null, `expanded=false`, and neither `flaky` nor `selfHealed` is set — `RunResults` renders **nothing** (returns `null`). It does not render an empty bordered pill. The parent layout should be prepared for the component to disappear; render a skeleton or placeholder externally if you need stable layout during loading.

## Themes

- `light` — gray-bordered pill, gray text, subtle gray hover background for linked stats.
- `dark` — darker border, lighter text, dark hover background, darker separator. Override the pill background with `pillClassName` (e.g. `"bg-gray-900"`) to blend into a colored surface — `tailwind-merge` makes it win over the theme default.

Both themes use explicit Tailwind colors mapped from the design tokens. The component does **not** read the parent `dark` class — set `theme` explicitly.

## Linked vs unlinked stats

- If `links?.[statKey]` is a **truthy string**, the stat renders inside an `<a href={links[statKey]}>` (or `renderLink(href, ...)` if provided). The whole `<li>` is clickable, with hover and focus styling.
- If the `links` prop is omitted entirely, or `links[statKey]` is `undefined`, `null`, or an empty string `""`, the stat renders as plain text inside the `<li>`. Empty strings count as unlinked — to make a stat clickable, pass a non-empty href.
- You can mix linked and unlinked stats in one render (e.g. provide `links.flaky` but not `links.passed`).
- The `links` object accepts a `selfHealed` key for the self-healed stat.
- The same truthiness check drives the tooltip wording: linked stats get `"View {status} tests"`, unlinked stats get `"{Capitalized status} tests"`.

### Custom link renderer

Use `renderLink` to integrate with a framework router (e.g. React Router, Vue Router, Next.js `Link`). It receives the resolved `href`, the inner children (icon + count), and the component's computed link `className` — pass that `className` to your link so it matches the styling (gray text, padding, no-underline, hover/focus) of the default `<a>`. It must return a single element.

```tsx
<RunResults
  passed={22}
  failed={4}
  skipped={0}
  pending={1}
  links={{ passed: '/runs/42/test-results?status=passed' }}
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

- The root is `<div data-cy="run-results">` (the wrapper); inside it is a semantic `<ul>` of `<li>` stats.
- Linked stats render an `<a>` with `aria-label="View {status} tests"`. Unlinked stats use plain text with no extraneous role.
- Focus styling uses `outline` (not `border`) on the `<a>` to avoid layout shift between focus states.
- Tooltips are wired through the internal Tooltip component, which uses Floating UI's focus/pointer detection — keyboard focus on a linked stat reveals the tooltip.
- Icons inside stats are decorative; status meaning is conveyed by the tooltip and (for linked stats) the `aria-label`.

## Data-cy selectors (test contract)

These selectors are part of the public contract — existing tests in consumer apps depend on them:

| Selector                           | Element                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| `[data-cy="run-results"]`          | Outer pill container                                                              |
| `[data-cy="total-{status}"]`       | Each `<li>` wrapping a stat. `{status}` is kebab-case (e.g. `total-self-healed`). |
| `[data-cy="link-{status}"]`        | The `<a>` of a linked stat. Kebab-case.                                           |
| `[data-cy="status-icon-{status}"]` | The status icon for the stat. Kebab-case (e.g. `status-icon-self-healed`).        |
| `[data-cy="status-icon-flaky"]`    | The flaky icon                                                                    |

## Known limitations

- No `auto` theme — `theme` must be set explicitly. (Repo-wide limitation, not specific to this component.)
- No `ordering` prop — stats always render in the order listed under "Stat order". Application-specific orderings are not supported.
- No `running`, `unclaimed`, `errored`, `timedOut`, `noTests`, `overLimit`, `cancelled` regular stats in the pill — only the four primary outcomes plus the optional `flaky` and `self-healed` leading stats.
- Icons are fixed at size `12`. No size prop.
- Counts are display-only; the component does not format large numbers (e.g. `1,234`) — pass pre-formatted strings if needed via a future prop, or wait for a follow-up.
- Self-healed renders whenever `showSelfHealed` is `true`, regardless of the `selfHealed` count (a `0` count renders as "0"). When `showSelfHealed` is `false`, the stat is hidden entirely — the consumer is expected to set the flag based on whether the run could have self-healed tests at all (e.g. `cy.prompt` was available).
- **No loading state.** `null` and `0` counts render identically. If you need to distinguish "loading" from "zero", render a skeleton/spinner externally and conditionally mount `<RunResults>` when data lands. Combined with the empty-state behavior above, the component returns `null` while counts are still all-null.
- **No i18n.** Tooltip labels are hardcoded English strings ("View passed tests", "N tests both passed and failed when retried within a run", etc.). A `labels` override prop can be added when a real consumer needs translations.
