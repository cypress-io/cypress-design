---
'@cypress-design/react-runresults': minor
'@cypress-design/vue-runresults': minor
---

`RunResults` now optionally renders a leading **run-status pill** alongside the existing test-counts pill, controlled by a new `runStatus` prop.

The run-status pill shows the run's build number and status icon (e.g. `#468` with a green check), with an optional branch segment (`develop`) following a vertical divider. Two visual variants: `base` (no border, default) and `link` (1px status-colored border). Each segment can be independently linked via `runStatus.href` (build number) and `runStatus.branchHref` (branch); the existing `renderLink` callback handles both pills.

Backwards-compatible: existing consumers passing only test-count props see no change. Test-count props (`passed`, `failed`, `skipped`, `pending`) are relaxed from required to optional (default `0`) so callers can render only the run-status pill without passing four `null`s.

```tsx
<RunResults
  runStatus={{
    buildNumber: 468,
    status: 'passed',
    branch: 'develop',
    variant: 'link',
    href: '/runs/468',
    branchHref: '/branches/develop',
  }}
  passed={22}
  failed={4}
  skipped={0}
  pending={1}
/>
```

Adds the following type exports: `RunStatusConfig`, `RunStatusKey` (the run-applicable subset of `StatusIcon`'s `statusTypes`).
