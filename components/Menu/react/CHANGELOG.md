# @cypress-design/react-menu

## 1.3.1

### Patch Changes

- [#730](https://github.com/cypress-io/cypress-design/pull/730) [`218898a`](https://github.com/cypress-io/cypress-design/commit/218898a2137faf409b7bed8190ffae646264e26f) Thanks [@emilmilanov](https://github.com/emilmilanov)! - The React Menu `icon` type now accepts icon components that ship at more sizes than 24px (for example 16px and 24px), so they can be passed directly instead of being wrapped as `(props) => <Icon {...props} />`. Runtime behavior is unchanged.

- [#728](https://github.com/cypress-io/cypress-design/pull/728) [`7807cfd`](https://github.com/cypress-io/cypress-design/commit/7807cfdba9d330f24f3b4912a9ad41cedf2193cb) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Fix types for consumers using TypeScript's `bundler` module resolution (the default for Vite and most modern setups):

  - `react-logo`, `react-menu`, `react-modal`, `react-testresult`: add the `types` condition to `exports`, so TypeScript finds `dist/index.d.ts` instead of reporting the package as untyped.
  - `vue-spinner`: the `./sfc` subpath now points TypeScript at `dist/Spinner.vue.d.ts`.
  - `vue-docmenu`: `linkComponent` accepts any Vue component (`Component | 'a'`); the previous `DefineComponent | 'a'` type rejected real components.
  - `react-textbox`: `onChange` receives a `ChangeEvent`, so `event.target.value` type-checks.

## 1.3.0

### Minor Changes

- [#598](https://github.com/cypress-io/cypress-design/pull/598) [`d019c22`](https://github.com/cypress-io/cypress-design/commit/d019c222c8c2b6071bdf0c4ffcf682eb7262bd63) Thanks [@karlsnyder0](https://github.com/karlsnyder0)! - Prevent losing click event during icon replacement

## 1.2.0

### Minor Changes

- [#597](https://github.com/cypress-io/cypress-design/pull/597) [`851d5d0`](https://github.com/cypress-io/cypress-design/commit/851d5d003c1b68e8f6481576127d8ba7e52b812e) Thanks [@karlsnyder0](https://github.com/karlsnyder0)! - Add transient active to Menu

## 1.1.0

### Minor Changes

- [#542](https://github.com/cypress-io/cypress-design/pull/542) [`ea77366`](https://github.com/cypress-io/cypress-design/commit/ea77366c4dd2c5cd7876216461c3936043c09158) Thanks [@karlsnyder0](https://github.com/karlsnyder0)! - Add style props and active class to Menu and Icons

## 1.0.2

### Patch Changes

- [#454](https://github.com/cypress-io/cypress-design/pull/454) [`48a3f6c`](https://github.com/cypress-io/cypress-design/commit/48a3f6cc5957844de2a5164137a8cedc31abe673) Thanks [@elevatebart](https://github.com/elevatebart)! - make sure the constant packages roll up in the react components for tailwind class detection

## 1.0.1

### Patch Changes

- [#450](https://github.com/cypress-io/cypress-design/pull/450) [`927097f`](https://github.com/cypress-io/cypress-design/commit/927097f409235ac78c98b281c4d9b2ec70dfe01d) Thanks [@elevatebart](https://github.com/elevatebart)! - optim: do not package dependencies

## 1.0.0

### Major Changes

- [`63fb4d9`](https://github.com/cypress-io/cypress-design/commit/63fb4d9e60f6c56c563d17e3b983d0ebd25e0e87) Thanks [@elevatebart](https://github.com/elevatebart)! - Create 1.0

### Patch Changes

- Updated dependencies [[`63fb4d9`](https://github.com/cypress-io/cypress-design/commit/63fb4d9e60f6c56c563d17e3b983d0ebd25e0e87)]:
  - @cypress-design/constants-menu@1.0.0

## 0.0.2

### Patch Changes

- [#367](https://github.com/cypress-io/cypress-design/pull/367) [`2f984a0`](https://github.com/cypress-io/cypress-design/commit/2f984a02807f344a878ac65ac9fab62bc0c9442d) Thanks [@elevatebart](https://github.com/elevatebart)! - first creation of menu item
