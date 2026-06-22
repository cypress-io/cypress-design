# @cypress-design/react-runresults

## 1.1.0

### Minor Changes

- [#689](https://github.com/cypress-io/cypress-design/pull/689) [`f8d476a`](https://github.com/cypress-io/cypress-design/commit/f8d476a089f9e9527fb4eb7a0476111815fc915a) Thanks [@emilmilanov](https://github.com/emilmilanov)! - RunResults: draw the border as an inset `::after` overlay (fixes the 26px height back to 24px, keeps the border visible on stat hover, and renders without Tailwind preflight), keep link text gray with no underline on hover, and expose the link `className` to `renderLink` so router links match the default anchor. `className` applies to the root wrapper (DS convention); a new `pillClassName` applies to the `<ul>` and is merged via `tailwind-merge`, so a consumer can override the pill background (e.g. `bg-gray-900` / `bg-transparent`) and win the Tailwind source-order conflict. The self-healed stat now uses the native 12px `general-sparkle-single` icon. The `constants-runresults` package is bundled into the React and Vue packages — consumers install a single package.

### Patch Changes

- Updated dependencies [[`f8d476a`](https://github.com/cypress-io/cypress-design/commit/f8d476a089f9e9527fb4eb7a0476111815fc915a)]:
  - @cypress-design/react-icon@1.42.0

## 1.0.0

### Major Changes

- [#676](https://github.com/cypress-io/cypress-design/pull/676) [`1531f94`](https://github.com/cypress-io/cypress-design/commit/1531f9439d73493e3eb08c72f41c0e7f0db958de) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Add RunResults component — a pill of test-result counts (passed / failed / skipped / pending) with optional `flaky` and `self-healed` leading stats separated by a vertical divider. Each stat is an icon + count, optionally wrapped in a link (`links` prop or a custom `renderLink` callback) and an optional tooltip. Supports `light` and `dark` themes and an `expanded` mode that shows zero-count regular stats. Available for React and Vue with shared constants. See `components/RunResults/instructions.md` for the full props API.

### Patch Changes

- Updated dependencies [[`1531f94`](https://github.com/cypress-io/cypress-design/commit/1531f9439d73493e3eb08c72f41c0e7f0db958de)]:
  - @cypress-design/constants-runresults@1.0.0
