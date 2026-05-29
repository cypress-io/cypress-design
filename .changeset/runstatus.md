---
'@cypress-design/constants-runstatus': patch
'@cypress-design/react-runstatus': patch
'@cypress-design/vue-runstatus': patch
---

Add RunStatus component — a pill of test-result counts (passed / failed / skipped / pending) with optional `flaky` and `self-healed` leading stats separated by a vertical divider. Each stat is an icon + count, optionally wrapped in a link (`links` prop or a custom `renderLink` callback) and an optional tooltip. Supports `light` and `dark` themes, an `expanded` mode that shows zero-count regular stats, and a `fullWidth` mode that stretches the pill to its container. Available for React and Vue with shared constants. See `components/RunStatus/instructions.md` for the full props API.
