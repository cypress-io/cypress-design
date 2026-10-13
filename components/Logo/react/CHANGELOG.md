# @cypress-design/react-logo

## 1.1.0

### Minor Changes

- [#730](https://github.com/cypress-io/cypress-design/pull/730) [`218898a`](https://github.com/cypress-io/cypress-design/commit/218898a2137faf409b7bed8190ffae646264e26f) Thanks [@emilmilanov](https://github.com/emilmilanov)! - `CypressWatermark`'s `dark` prop is now optional in React and defaults to `false`, matching Vue.

### Patch Changes

- [#728](https://github.com/cypress-io/cypress-design/pull/728) [`7807cfd`](https://github.com/cypress-io/cypress-design/commit/7807cfdba9d330f24f3b4912a9ad41cedf2193cb) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Fix types for consumers using TypeScript's `bundler` module resolution (the default for Vite and most modern setups):

  - `react-logo`, `react-menu`, `react-modal`, `react-testresult`: add the `types` condition to `exports`, so TypeScript finds `dist/index.d.ts` instead of reporting the package as untyped.
  - `vue-spinner`: the `./sfc` subpath now points TypeScript at `dist/Spinner.vue.d.ts`.
  - `vue-docmenu`: `linkComponent` accepts any Vue component (`Component | 'a'`); the previous `DefineComponent | 'a'` type rejected real components.
  - `react-textbox`: `onChange` receives a `ChangeEvent`, so `event.target.value` type-checks.

## 1.0.1

### Patch Changes

- [#450](https://github.com/cypress-io/cypress-design/pull/450) [`927097f`](https://github.com/cypress-io/cypress-design/commit/927097f409235ac78c98b281c4d9b2ec70dfe01d) Thanks [@elevatebart](https://github.com/elevatebart)! - optim: do not package dependencies

- Updated dependencies [[`927097f`](https://github.com/cypress-io/cypress-design/commit/927097f409235ac78c98b281c4d9b2ec70dfe01d)]:
  - @cypress-design/icon-registry@1.1.0

## 1.0.0

### Major Changes

- [`63fb4d9`](https://github.com/cypress-io/cypress-design/commit/63fb4d9e60f6c56c563d17e3b983d0ebd25e0e87) Thanks [@elevatebart](https://github.com/elevatebart)! - Create 1.0

### Patch Changes

- Updated dependencies [[`63fb4d9`](https://github.com/cypress-io/cypress-design/commit/63fb4d9e60f6c56c563d17e3b983d0ebd25e0e87)]:
  - @cypress-design/icon-registry@1.0.0

## 0.2.0

### Minor Changes

- [#405](https://github.com/cypress-io/cypress-design/pull/405) [`6215f29`](https://github.com/cypress-io/cypress-design/commit/6215f29c5ec2ad7f46472ce6630c066cb2ab5488) Thanks [@elevatebart](https://github.com/elevatebart)! - add CypressWatermark to Logo

### Patch Changes

- Updated dependencies [[`6215f29`](https://github.com/cypress-io/cypress-design/commit/6215f29c5ec2ad7f46472ce6630c066cb2ab5488)]:
  - @cypress-design/icon-registry@0.39.0

## 0.1.0

### Minor Changes

- [#402](https://github.com/cypress-io/cypress-design/pull/402) [`6f2ae04`](https://github.com/cypress-io/cypress-design/commit/6f2ae04a7202e13deabf0bf981f035ed03f3616e) Thanks [@elevatebart](https://github.com/elevatebart)! - refactor and add the logo component

### Patch Changes

- Updated dependencies [[`6f2ae04`](https://github.com/cypress-io/cypress-design/commit/6f2ae04a7202e13deabf0bf981f035ed03f3616e)]:
  - @cypress-design/icon-registry@0.38.0
