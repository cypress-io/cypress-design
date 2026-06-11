# @cypress-design/constants-runresults

## 1.0.0

### Major Changes

- [#676](https://github.com/cypress-io/cypress-design/pull/676) [`1531f94`](https://github.com/cypress-io/cypress-design/commit/1531f9439d73493e3eb08c72f41c0e7f0db958de) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Add RunResults component — a pill of test-result counts (passed / failed / skipped / pending) with optional `flaky` and `self-healed` leading stats separated by a vertical divider. Each stat is an icon + count, optionally wrapped in a link (`links` prop or a custom `renderLink` callback) and an optional tooltip. Supports `light` and `dark` themes and an `expanded` mode that shows zero-count regular stats. Available for React and Vue with shared constants. See `components/RunResults/instructions.md` for the full props API.
