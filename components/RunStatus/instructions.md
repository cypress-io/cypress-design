# RunStatus — Props, Events & Slots

`RunStatus` renders a Cypress run's identifier as a pill: a status icon followed by the build number (e.g. `#468`), with an optional second segment for the run's branch (e.g. `develop`). The whole pill — or each segment individually — can be linked. Supports `light` and `dark` themes.

Use it anywhere you need a compact, scannable representation of a single run: list rows, tooltips, summary cards, comparison views.

> The "test counts" pill (passed / failed / skipped / pending) is a separate component, [`RunResults`](../RunResults/instructions.md). `RunStatus` is just the **run identifier** — number, status, and branch.

## Install

```bash
yarn add @cypress-design/vue-runstatus          # Vue
yarn add @cypress-design/react-runstatus        # React
```

A single package per framework — types and class constants are bundled in (there is no separate `constants-runstatus` package to install).

## Props

| Prop            | Type                                                               | Default        | Description                                                                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buildNumber`   | `number`                                                           | required       | Build number to display. Rendered as `#${buildNumber}`. Not formatted (no thousand-separators) — pass a pre-formatted string-like number if you need that, or wait for a follow-up.                                                                               |
| `status`        | `RunStatusKey`                                                     | required       | Run status. One of `"passed"`, `"failed"`, `"running"`, `"cancelled"`, `"errored"`, `"timedOut"`, `"noTests"`, `"overLimit"`. Drives the status icon and (for `variant="link"`) the border color.                                                                 |
| `branch`        | `string`                                                           | —              | Branch name. When omitted, the pill is single-segment. When provided, a vertical divider and a second segment (`technology-branch-h_x16` icon + branch text) are rendered after `#N`.                                                                             |
| `variant`       | `"base" \| "link"`                                                 | `"base"`       | `"base"` renders without an outer border (matches an in-progress / "this run" treatment in the dashboard). `"link"` adds a 1px border whose color matches the status (jade / red / indigo / gray / orange) and adds hover styling.                                |
| `href`          | `string`                                                           | —              | URL for the `#N` segment. When set, that segment renders inside an `<a href>` (or `renderLink(href, ...)` if provided). Independent of `variant` — you can have a clickable base pill or a styled link pill with no actual link.                                  |
| `branchHref`    | `string`                                                           | —              | URL for the branch segment, independent of `href`. Only meaningful when `branch` is set.                                                                                                                                                                          |
| `renderLink`    | `(href: string, children: unknown, className?: string) => unknown` | —              | Custom link renderer, used for both `href` and `branchHref` when supplied. Same signature in React and Vue; `children` is the framework's native rendered content (a JSX element in React, an array of `VNode`s in Vue). Falls back to a native `<a>` if omitted. |
| `theme`         | `"light" \| "dark"`                                                | `"light"`      | Color scheme. Must be set explicitly — no auto theme detection.                                                                                                                                                                                                   |
| `className`     | `string`                                                           | —              | Classes for the root wrapper, appended via `clsx` (DS convention).                                                                                                                                                                                                |
| `pillClassName` | `string`                                                           | —              | Classes for the pill itself, merged via `tailwind-merge` so conflicting utilities (`bg-*`, `border-*`) override the DS default. Use to override the background or border when dropping the pill onto a colored surface.                                           |
| `data-cy`       | `string`                                                           | `"run-status"` | Test selector on the root wrapper.                                                                                                                                                                                                                                |

## Type exports

Import these directly from the framework package (`@cypress-design/react-runstatus` or `@cypress-design/vue-runstatus`):

| Type             | Description                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RunStatusProps` | Full prop interface.                                                                                                                                                  |
| `RunStatusKey`   | `"passed" \| "failed" \| "running" \| "cancelled" \| "errored" \| "timedOut" \| "noTests" \| "overLimit"`. The run-applicable subset of `StatusIcon`'s `statusTypes`. |
| `RunStatusTheme` | `"light" \| "dark"` — derived from `keyof typeof CssTheme`.                                                                                                           |

`RunStatusKey` deliberately excludes per-test statuses (`skipped`, `pending`, `flaky`, `placeholder`, `unclaimed`, `failing`) — those don't apply at the run level. Translate from your domain enum at the integration boundary (e.g. cypress-services keeps a `runStatusEnumToStatusDesignSystem` helper in its dashboard layer).

## Variants

`variant` controls the **visual treatment** of the pill, not whether it's clickable. Clickability is orthogonal — set `href` (and/or `branchHref`).

| `variant` | Border                                                            | Background               | Typical use                                                                                                                                  |
| --------- | ----------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `"base"`  | No outer border                                                   | Subtle (theme-dependent) | The run that the surrounding surface already represents (e.g. the run a page is about) — visual weight stays with the surface, not the chip. |
| `"link"`  | 1px, color matches `status` (jade / red / indigo / gray / orange) | Same subtle background   | Links to other runs (past runs, base run, related runs). Hover lifts the background; focus shows the standard outline ring.                  |

Both variants render the same icon + `#N` + optional branch internally. Branch segment colors do **not** vary with status — only the outer border (link variant) carries the status color.

## Themes

- `light` — gray-bordered pill (link variant), gray text, subtle gray hover background.
- `dark` — darker border, lighter text, dark hover background. Override the pill background with `pillClassName` (e.g. `"bg-gray-900"`) to blend into a colored surface — `tailwind-merge` makes it win over the theme default.

Both themes use explicit Tailwind colors mapped from the design tokens. The component does **not** read the parent `dark` class — set `theme` explicitly.

## Branch segment

`branch` is **optional**. When set, a 1px vertical divider follows the `#N` segment, and the branch segment renders inside the same pill:

- Branch icon: `technology-branch-h_x16` (via `@cypress-design/react-icon` / `vue-icon`).
- Branch text: branch name verbatim, truncated with `max-w-[260px]` to keep long branches (`release/2026.07.01-emergency-hotfix-mobile-only`) from breaking layout.
- Independent linkability: pass `branchHref` to make only the branch segment clickable; pass `href` and `branchHref` to make both clickable to different URLs.

If you need the branch chip in isolation (without a build number), use a `Tag` with a leading icon instead — `RunStatus` always renders `#N` as the primary segment.

## Linked vs unlinked segments

- If `href` is a truthy string, the `#N` segment renders inside `<a href={href}>` (or `renderLink(href, ...)` if provided). The whole segment is clickable; hover and focus styling apply.
- If `href` is omitted, `undefined`, `null`, or `""`, the `#N` segment renders as plain text.
- Same logic for `branchHref` and the branch segment.
- You can mix linked and unlinked segments — e.g. clickable branch with a static `#N`.

### Custom link renderer

Use `renderLink` to integrate with a framework router (React Router, Vue Router, Next.js `Link`, `@reach/router`). It receives the resolved `href`, the inner children, and the component's computed link `className` — pass that `className` to your link so it matches the default `<a>` styling (no underline, hover/focus behavior).

```tsx
<RunStatus
  buildNumber={468}
  status="passed"
  branch="develop"
  variant="link"
  href={`/projects/${projectId}/runs/468/overview`}
  branchHref={`/projects/${projectId}/branches/develop`}
  renderLink={(href, children, className) => (
    <Link to={href} className={className}>
      {children}
    </Link>
  )}
/>
```

`renderLink` is shared between both segments when both are linked.

## Status icon

The status icon is chosen internally — there is no consumer knob for variant / size. The chosen variant matches `StatusIcon`'s declared variants for each status (e.g. `running` is `outline`-only, terminal statuses use `solid`). Size is fixed at `16` to match the pill height (24px) with comfortable inner padding.

See [`architecture.md`](./architecture.md) for the exact status → variant mapping.

## Accessibility

- The root is `<div data-cy="run-status">`.
- Linked segments render an `<a>` with `aria-label="View run #{buildNumber}"` (or `aria-label="View branch {branchName}"` for the branch segment).
- Unlinked segments are plain text with no extraneous role.
- Focus styling uses `outline` (not `border`) on the `<a>` to avoid layout shift between focus states.
- The status icon is decorative. Status meaning is conveyed by:
  - The visible `#N` text (the icon is paired with it inline)
  - The `aria-label` of linked segments
  - The `title` attribute on the root pill, set to a readable status string (`"Passed"`, `"Failed"`, `"Running"`, etc.) so screen readers and hover-tooltips both announce it
- The vertical divider between segments is decorative — implemented as a `::after` pseudo-element with `role="presentation"` semantics (not a sibling element).

## Data-cy selectors (test contract)

These selectors are part of the public contract — consumer tests in cypress-services depend on them:

| Selector                              | Element                                                                 |
| ------------------------------------- | ----------------------------------------------------------------------- |
| `[data-cy="run-status"]`              | Outer pill container (override via `data-cy` prop).                     |
| `[data-cy="run-status-build-number"]` | The `#N` segment (`<a>` or `<span>`).                                   |
| `[data-cy="run-status-icon"]`         | The status icon inside the `#N` segment.                                |
| `[data-cy="run-status-branch"]`       | The branch segment (`<a>` or `<span>`). Present only when `branch` set. |
| `[data-cy="run-status-branch-icon"]`  | The branch icon inside the branch segment.                              |

## Known limitations

- No `auto` theme — `theme` must be set explicitly. (Repo-wide limitation.)
- No size variants — the pill is fixed at 24px tall. If a smaller / larger size is needed, raise it as a follow-up; today's design only uses one size.
- No avatar / commit-author segment. `RunStatus` is run identity only; commit metadata stays in the parent layout.
- No re-run badge ("Re-run" pill attached to the build number). Cypress-services handles re-runs as a separate sibling badge in `RunsListItem`; we keep that boundary so consumers compose freely.
- No CI build number alongside `#N`. The CI provider's own build number is a sibling component (`SpecCi` in cypress-services), not part of `RunStatus`.
- Branch text is truncated at 260px. Tooltips on the branch segment are the consumer's responsibility (wrap the rendered `RunStatus` in a `Tooltip`, or pass a `renderLink` that wraps its content).
- `buildNumber` is a `number`. Localized formatting (e.g. `#1,234`) is not supported — pass a small integer.
- No loading state — `RunStatus` always renders its segments. If the run hasn't loaded, conditionally mount it externally.
- No i18n. The `aria-label` strings (`"View run #N"`, `"View branch ..."`) and the status `title` text (`"Passed"`, `"Running"`, etc.) are hardcoded English. A `labels` override prop can be added when a real consumer needs translations.
