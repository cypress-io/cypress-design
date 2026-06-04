---
'@cypress-design/constants-runresults': major
'@cypress-design/react-runresults': major
'@cypress-design/vue-runresults': major
---

Add RunResults component — a pill of test-result counts (passed / failed / skipped / pending) with optional `flaky` and `self-healed` leading stats separated by a vertical divider. Each stat is an icon + count, optionally wrapped in a link (`links` prop or a custom `renderLink` callback) and an optional tooltip. Supports `light` and `dark` themes and an `expanded` mode that shows zero-count regular stats. Available for React and Vue with shared constants. See `components/RunResults/instructions.md` for the full props API.
