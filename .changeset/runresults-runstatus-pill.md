---
'@cypress-design/react-runresults': minor
'@cypress-design/vue-runresults': minor
---

`RunResults` now optionally renders a leading **run-status pill** alongside the existing test-counts pill, controlled by a new `runStatus` prop.

The run-status pill shows the run's build number and status icon (e.g. `#468` with a green check), with an optional branch segment (`develop`) following a vertical divider. Both variants (`base` and `link`) share a neutral 1px gray border at rest; `link` swaps to a status-colored border (jade / red / indigo / gray / orange) on hover. The `#N` segment can be a link via `runStatus.href`, using the existing `renderLink` callback shared with the test-counts pill; the branch segment is always plain text.

Backwards-compatible: existing consumers passing only test-count props see no change. Test-count props (`passed`, `failed`, `skipped`, `pending`) are relaxed from required to optional (default `0`) so callers can render only the run-status pill without passing four `null`s. If `runStatus.status` is set to a value outside `RunStatusKey`, the pill is skipped and a warning is logged in development — the surrounding `RunResults` still renders.

```tsx
<RunResults
  runStatus={{
    buildNumber: 468,
    status: 'passed',
    branch: 'develop',
    variant: 'link',
    href: '/runs/468',
  }}
  passed={22}
  failed={4}
  skipped={0}
  pending={1}
/>
```

Adds the following type exports: `RunStatusConfig`, `RunStatusKey` (the run-applicable subset of `StatusIcon`'s `statusTypes`).
