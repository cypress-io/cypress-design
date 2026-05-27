# RunStatus — implementation plan

Port of `RunStats` from `cypress-io/cypress-services` (path: `frontend/packages/design-system/src/components/RunStats.tsx`) into the cypress-design system, adapted to repo conventions.

## Source references

- `RunStats.tsx`: https://github.com/cypress-io/cypress-services/blob/develop/frontend/packages/design-system/src/components/RunStats.tsx
- `module.RunStats.scss`: https://github.com/cypress-io/cypress-services/blob/develop/frontend/packages/design-system/src/components/module.RunStats.scss

The Cursor plan provided as input was missing two things from the actual source:

- Real router is `react-router-dom`, not `@reach/router`
- A second independent "self-healed" leading stat (sparkle icon, rendered before the separator alongside flaky) exists in source

Both are accounted for below.

## Adaptation: Cursor plan → cypress-design repo

| Cursor plan assumption                       | This repo's reality                                                                                               | Adjustment                                                                                                                     |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Single React package, SCSS modules           | Tri-package: `constants/` + `react/` + `vue/`, Tailwind-only                                                      | Move all styles into `constants/src/index.ts` as Tailwind class strings; ship Vue at the same time                             |
| Copy `FlakyBadge.tsx` + SCSS                 | `IconStatusFlaky` already in `@cypress-design/react-icon` / `@cypress-design/vue-icon`; TestResult uses it inline | Don't port FlakyBadge; render `IconStatusFlaky` directly                                                                       |
| Tooltip might not exist → injectable prop    | `@cypress-design/react-tooltip` + `@cypress-design/vue-tooltip` exist                                             | Import directly. Keep `showTooltip` boolean, drop `renderTooltip`                                                              |
| `@reach/router` Link                         | No router in repo (actual source uses `react-router-dom`)                                                         | Per-stat `href` (via `links` prop) + optional `renderLink` function prop (unified across React and Vue, not a Vue scoped slot) |
| `pluralize` dependency for tooltip           | Used in exactly one place (flaky tooltip)                                                                         | Drop the dep; inline ternary                                                                                                   |
| SCSS variables → hex                         | Tailwind tokens via `@cypress-design/css`                                                                         | Use Tailwind color classes from constants. Never hex                                                                           |
| `projectsListV2` / `testsForReview` booleans | n/a — caller-internal                                                                                             | Drop entirely                                                                                                                  |
| `darkTheme` boolean                          | Repo convention is `theme: 'light' \| 'dark'`                                                                     | Use `theme` prop with full dark theme (source only darkens the separator)                                                      |
| Tooltip color matches surface                | Source doesn't theme the tooltip                                                                                  | Invert: `theme="light"` → dark tooltip, `theme="dark"` → light tooltip, for contrast                                           |

## Decisions

- **Name:** `RunStatus` (singular, matches `Button`, `Tag`, `TestResult`, `StatusIcon`)
- **Frameworks:** React + Vue from day one
- **Theme:** `theme: 'light' | 'dark'`, both implemented
- **Tooltip:** Internal Tooltip component, dynamic overlay for flaky
- **Self-healed:** Included in v1 behind `showSelfHealed` flag. Deviates from source: source hides the stat when count is `0`; we show it (with "0") whenever `showSelfHealed` is `true`, matching the current cypress.io UI. The consumer decides visibility entirely via the flag.
- **Ordering prop:** Dropped — single default order
- **Branch flow:** 4 stacked PRs. Each branch sits on top of the previous (`instructions` → `component` → `tests` → `accessibility`). All four merge together once ready — not sequentially.

## Component shape (from real source)

```
[ leading-stats | regular-stats ]
[ 🌀 3  ✨ 2 ] | [ ⊘ 0  ⊙ 1  ✓ 22  ✕ 4 ]
              ↑ separator (::after border-right on the last leading stat)
```

- Outer: `flex` pill with `border border-gray-100 rounded-[4px]`
- `<ul>` of `<li>` stats. Each `<li>` = icon + count, optionally wrapped in `<a>` (or `renderLink(href, ...)`)
- Flaky and self-healed are **two independent, optional leading stats** rendered before the regular stats. The vertical divider is drawn after the last leading stat that renders, but only when at least one regular stat will also render.
- Each stat wrapped in a Tooltip; flaky tooltip is **dynamic**: "N tests both passed and failed when retried within a run". Others: "View {status} tests" (when linked) or "{Status} tests" (when not)
- Icons render at fixed size `12` (no prop). Source supported `'10' | '12'` but `10` is unused.
- Source's `darkTheme` only adjusts separator color (`gray-100` → `gray-800`). Generalised here to full themed palette

## API

```ts
type StatKey =
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'pending'
  | 'flaky'
  | 'selfHealed'

interface RunStatusProps {
  passed: number | null
  failed: number | null
  skipped: number | null
  pending: number | null
  flaky?: number | null

  // Self-healed (independent of flaky)
  selfHealed?: number | null
  showSelfHealed?: boolean // gate behind flag, matching source

  // Visual
  theme?: 'light' | 'dark' // default 'light'
  expanded?: boolean // show zero counts (default false)
  fullWidth?: boolean

  // Navigation
  links?: Partial<Record<StatKey, string>>
  renderLink?: (href: string, children: ReactNode) => ReactNode

  // Tooltip
  showTooltip?: boolean // default true

  className?: string
}
```

**Dropped from source:** `projectId`, `buildNumber`, internal `testResultsUrl` builder, `darkTheme` boolean (replaced by `theme`), `data-pendo` attributes.

**Kept verbatim:** all `data-cy` selectors (`run-stats`, `total-{status}`, `link-{status}`, `status-icon-{status}`, `status-icon-flaky`, `status-icon-self-healed`) for parity with existing tests.

## File layout

```
components/RunStatus/
  constants/
    src/index.ts                # CssClasses, CssTheme, types, label/tooltip helpers
    package.json                # @cypress-design/constants-runstatus
    rollup.config.mjs           # copy from TestResult
    tsconfig.json
  react/
    RunStatus.tsx               # main + internal Stat
    index.ts
    RunStatusReact.cy.tsx
    package.json                # @cypress-design/react-runstatus
                                # deps: constants-runstatus, react-icon, react-statusicon, react-tooltip, clsx
    rollup.config.mjs
    tsconfig.build.json
  vue/
    RunStatus.vue
    index.ts
    RunStatusVue.cy.tsx
    package.json                # @cypress-design/vue-runstatus
    vite.config.ts
  assertions.ts                 # shared cy selectors / count helpers
  instructions.md
  architecture.md
  plan.md                       # this file

docs/src/demos/RunStatus.vue    # live demo
```

Plus index registrations:

- `/.agents/index.md` — add `RunStatus` to `## Components`
- `/AGENTS.md` — add to `## Components` list
- `/docs/src/pages/components/index.astro` — one-line description in `descriptions` map

## Color mapping (source SCSS → Tailwind)

**Light theme:**

| SCSS                                | Tailwind                   |
| ----------------------------------- | -------------------------- |
| `border: 1px solid $gray-100`       | `border border-gray-100`   |
| `color: $gray-600`                  | `text-gray-600`            |
| `a` color `$gray-700`               | `text-gray-700`            |
| `a:hover bg $indigo-100`            | `hover:bg-indigo-100`      |
| separator `border-right: $gray-100` | `border-r border-gray-100` |

**Dark theme** (source only darkens separator; extended for full theme support):

- `dark:border-gray-700`
- `dark:text-gray-400`
- `dark:hover:bg-gray-800`
- separator: `dark:border-gray-700`

Cross-check against `TestResult` dark variants before final values are committed.

## 4-PR execution

**Stacked PRs.** Each branch sits on top of the previous; PRs target their predecessor as base (not `main`, except Stage 1). All four merge together when ready, not sequentially. When Stage 1 merges to `main`, GitHub auto-rebases Stage 2's base to `main`, and so on.

| Stage | Branch                    | Base branch              |
| ----- | ------------------------- | ------------------------ |
| 1     | `runstatus-instructions`  | `main`                   |
| 2     | `runstatus-component`     | `runstatus-instructions` |
| 3     | `runstatus-tests`         | `runstatus-component`    |
| 4     | `runstatus-accessibility` | `runstatus-tests`        |

### Stage 1 — `runstatus-instructions`

- `components/RunStatus/instructions.md` (consumer API: props, variants, states, a11y)
- `components/RunStatus/architecture.md` (file layout, constants keying, why no FlakyBadge component, separator implementation, theme strategy, gotchas)
- Update `/.agents/index.md` and `/AGENTS.md` to list `RunStatus`
- No source code, no tests
- **Goal:** get API sign-off before any code

### Stage 2 — `runstatus-component`

- Create `constants/`, `react/`, `vue/` packages with `package.json`, build configs
- `constants/src/index.ts`: CssClasses, CssTheme, types, label/tooltip helpers
- `react/RunStatus.tsx` + `vue/RunStatus.vue`
- `docs/src/demos/RunStatus.vue` covering: default, expanded, with links, with flaky, with self-heal, light + dark, full-width
- Add description to `docs/src/pages/components/index.astro`
- Manual verification in dev server

### Stage 3 — `runstatus-tests`

- `react/RunStatusReact.cy.tsx` and `vue/RunStatusVue.cy.tsx`
- `assertions.ts` shared helpers
- Coverage: default vs expanded, link rendering, `renderLink` injection, light/dark theme, flaky tooltip text, leading-stats permutations (flaky only / self-healed only / both / neither) + separator presence and absence
- Percy snapshots for each state

### Stage 4 — `runstatus-accessibility`

- Cypress Accessibility pass
- ARIA labels on link stats
- Keyboard nav verified
- Focus-visible rings (via outline, per repo convention)
- Resolve any issues flagged

## Open items deferred

- `IconGeneralSparkleSingleSmall` for self-healed — verify it's exported from current `@cypress-design/react-icon` and `@cypress-design/vue-icon` packages. If not yet exported, raise separately before Stage 2.
- Final dark-theme palette values — confirm against `TestResult` or any other dark-themed reference component.
