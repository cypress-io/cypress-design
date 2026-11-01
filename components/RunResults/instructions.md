---
name: components/RunResults/instructions
description: 'RunResults API — pill of test result counts (passed/failed/skipped/pending) with optional flaky and self-healed leading stats: props, stat order, themes, linking, tooltips, accessibility, and data-cy selectors. Fetch when using, reviewing, or referencing RunResults in a Vue or React project.'
---

# RunResults — Props, Events & Slots

`RunResults` renders a pill of test-result counts (passed / failed / skipped / pending) with two independent optional leading stats — flaky and self-healed — separated from the regular stats by a vertical divider. Each stat is an icon + count, optionally linked, optionally wrapped in a Tooltip. Only these six stats exist; other statuses (running, errored, timed out, …) have no stat.

Use it in run summary cards, dashboard rows, and any list/grid view that needs compact, scannable counts of test outcomes.

Install and import: [React ReadMe](https://design.cypress.io/agents/components/RunResults/react/ReadMe.md) and [Vue ReadMe](https://design.cypress.io/agents/components/RunResults/vue/ReadMe.md).

## Props

| Prop             | Type                                                               | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `passed`         | `number \| null`                                                   | required  | Passed test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                         |
| `failed`         | `number \| null`                                                   | required  | Failed test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                         |
| `skipped`        | `number \| null`                                                   | required  | Skipped test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                        |
| `pending`        | `number \| null`                                                   | required  | Pending test count. `null` is treated as `0`.                                                                                                                                                                                                                                                                                                                                                        |
| `flaky`          | `number \| null`                                                   | —         | Flaky test count. Rendered only when > 0.                                                                                                                                                                                                                                                                                                                                                            |
| `selfHealed`     | `number \| null`                                                   | —         | Self-healed test count, shown verbatim (`null` as `0`). Visibility is controlled by `showSelfHealed`, not by this count.                                                                                                                                                                                                                                                                             |
| `showSelfHealed` | `boolean`                                                          | `false`   | Renders the self-healed stat, including a count of `0`. Set it `true` when the run could have self-healed tests (e.g. `cy.prompt` was available), `false` otherwise.                                                                                                                                                                                                                                 |
| `theme`          | `"light" \| "dark"`                                                | `"light"` | Color scheme. The component does not read a parent `dark` class — pass `theme="dark"` on dark surfaces.                                                                                                                                                                                                                                                                                              |
| `expanded`       | `boolean`                                                          | `false`   | When `true`, renders all four regular stats even if their count is `0`. Does not affect flaky or self-healed.                                                                                                                                                                                                                                                                                        |
| `links`          | `Partial<Record<StatKey, string>>`                                 | —         | Per-stat pre-built URLs. Caller builds the URLs (no router in the DS).                                                                                                                                                                                                                                                                                                                               |
| `renderLink`     | `(href: string, children: unknown, className?: string) => unknown` | —         | Custom link renderer, same signature in both frameworks. `children` is typed `unknown` — cast or narrow it before rendering (`children as React.ReactNode` in React; in Vue it is an **array** of `VNode`s). It holds the rendered icon + count. `className` is the computed link styling — apply it to your link. See [Custom link renderer](#custom-link-renderer) for what you must add yourself. |
| `showTooltip`    | `boolean`                                                          | `true`    | When `true`, wraps each stat in a Tooltip describing the stat.                                                                                                                                                                                                                                                                                                                                       |
| `className`      | `string`                                                           | —         | Classes for the **root wrapper** `<div>`, appended via `clsx`. Does not override DS classes.                                                                                                                                                                                                                                                                                                         |
| `pillClassName`  | `string`                                                           | —         | Classes for the **pill `<ul>`**, merged via `tailwind-merge`. A conflicting utility **overrides** the DS default — e.g. `"bg-gray-900"` / `"bg-transparent"` wins over the theme background — while non-conflicting classes are added.                                                                                                                                                               |

Other attributes land on the root wrapper `<div>`: React spreads extra HTML attributes and forwards `ref` to it; Vue applies fallthrough attributes and `class` to it. `data-cy` on the root is always `run-results` and can't be overridden.

Counts render as plain numbers, unformatted (no thousands separators).

## Type exports

Both packages export these types:

| Type              | Description                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `RunResultsProps` | Full prop interface for the component.                                                                                        |
| `RunResultsTheme` | `"light" \| "dark"`                                                                                                           |
| `StatKey`         | `"passed" \| "failed" \| "skipped" \| "pending" \| "flaky" \| "selfHealed"` — the keys of `links`. `data-cy` uses kebab-case. |

## Stat order

Fixed, left to right:

1. `flaky` (when `flaky > 0`), then `selfHealed` (when `showSelfHealed`)
2. Divider — only when at least one of those **and** at least one regular stat render
3. `skipped`, `pending`, `passed`, `failed` — each hidden at `0` unless `expanded`

### Empty state

When no stat would render — every regular count is `0`/`null`, `expanded` is `false`, `flaky` is not > 0, and `showSelfHealed` is `false` — `RunResults` renders **nothing** (returns `null`), not an empty pill. `null` and `0` render identically, so there is no loading state: render a skeleton externally and mount `RunResults` when data lands.

## Themes

- `light` — gray-bordered white pill, gray text, subtle gray hover background for linked stats.
- `dark` — darker border, lighter text, dark hover background, darker separator. Override the pill background with `pillClassName` (e.g. `"bg-gray-900"`) to blend into a colored surface.

## Linked vs unlinked stats

- If `links?.[statKey]` is a **truthy string**, the stat renders inside an `<a href>` (or your `renderLink` element). The whole stat is clickable, with hover and focus styling.
- If `links` is omitted, or `links[statKey]` is `undefined`, `null`, or `""`, the stat renders as plain text. To make a stat clickable, pass a non-empty href.
- Linked and unlinked stats can be mixed in one render. `links.selfHealed` links the self-healed stat.
- The same truthiness check picks the tooltip wording (see [Tooltip behavior](#tooltip-behavior)), even when `renderLink` is used.

### Custom link renderer

Use `renderLink` to integrate a router link (React Router, Vue Router, Next.js `Link`). It receives only `href`, `children`, and `className` — not which stat it renders. The native `<a>` path adds `aria-label="View {status} tests"` and `data-cy="link-{status}"`; the `renderLink` path adds neither.

- You must set `aria-label` on your element. Without it the link's accessible name is only the count, because the icons have no accessible name.
- Set `data-cy="link-{status}"` only if your tests rely on that selector.

To get the status, look `href` up in your own `links` object. Give each stat a distinct href: if two stats share one, the lookup can't tell them apart.

```tsx
import { RunResults, type StatKey } from '@cypress-design/react-runresults'
import NextLink from 'next/link'

const links: Partial<Record<StatKey, string>> = {
  passed: '/runs/42/test-results?status=passed',
  failed: '/runs/42/test-results?status=failed',
}

export function RunSummary() {
  return (
    <RunResults
      passed={22}
      failed={4}
      skipped={0}
      pending={1}
      links={links}
      renderLink={(href, children, className) => {
        const statKey = (Object.keys(links) as StatKey[]).find(
          (key) => links[key] === href,
        )
        // Matches the native path: `selfHealed` → `self-healed`
        const status = statKey?.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
        return (
          <NextLink
            href={href}
            className={className}
            aria-label={`View ${status} tests`}
            data-cy={`link-${status}`}
          >
            {children as React.ReactNode}
          </NextLink>
        )
      }}
    />
  )
}
```

## Tooltip behavior

When `showTooltip` is `true` (default), each stat is wrapped in a Tooltip. Labels are fixed English strings:

- Regular and self-healed stats: linked `"View {status} tests"` (e.g. `"View self-healed tests"`), unlinked `"{Status} tests"` (e.g. `"Passed tests"`).
- Flaky (linked or not): `"N tests both passed and failed when retried within a run"`, or `"This test both passed and failed when retried within a run"` when the count is `1`.

Placement is `top-start` for flaky and `top-end` for every other stat. Tooltip color is the inverse of `theme` (`light` → dark tooltip, `dark` → light tooltip).

## Events

None. Use `links` / `renderLink` for navigation.

## Slots

None. Rendering is driven entirely by props.

## Accessibility

- Structure is a root `<div>` containing a `<ul>` of `<li>` stats. Only linked stats are focusable; focus shows an `outline` (no layout shift).
- On the native `<a>` path, `aria-label` (`"View {status} tests"`, `"View flaky tests"` for flaky) replaces the link content as its accessible name, so the count is not announced. With `renderLink`, you must set `aria-label` on your element (see [Custom link renderer](#custom-link-renderer)); otherwise the link's name is only the count.
- Icons have no accessible name and no `aria-hidden`; status meaning comes from the link's `aria-label` or the tooltip. An unlinked stat exposes only its count as text.
- React: keyboard focus on a linked stat opens its tooltip. Vue's Tooltip listens for `focus` on its own wrapper `<div>`, not on the link inside it, so don't rely on focus opening the tooltip in Vue.

## Data-cy selectors (test contract)

Consumer tests depend on these selectors:

| Selector                           | Element                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `[data-cy="run-results"]`          | Root wrapper `<div>` (the pill itself is the `<ul>` inside it)                                       |
| `[data-cy="total-{status}"]`       | Each `<li>` wrapping a stat. `{status}` is kebab-case (e.g. `total-self-healed`).                    |
| `[data-cy="link-{status}"]`        | The native `<a>` of a linked stat. Kebab-case. Absent with `renderLink` unless your element sets it. |
| `[data-cy="status-icon-{status}"]` | The stat's icon. Kebab-case (e.g. `status-icon-self-healed`, `status-icon-flaky`).                   |
