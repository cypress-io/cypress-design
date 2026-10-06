# @cypress-design/vue-select

## 1.1.0

### Minor Changes

- [#733](https://github.com/cypress-io/cypress-design/pull/733) [`5e916fb`](https://github.com/cypress-io/cypress-design/commit/5e916fbe2b83d1503ed80820a85a8705bdcaeef1) Thanks [@jennifer-shehane](https://github.com/jennifer-shehane)! - Depend on `@cypress-design/vue-icon` and `@cypress-design/react-icon` 3.x. These packages were last published against icon 1.x, so installs stayed on 1.x and missed the 3.x fixes, including tree-shakable named icon imports. None of the icons these components use were renamed or removed in 2.0 or 3.0, so there are no API changes. `@cypress-design/vue-modal` now also lists `@cypress-design/vue-icon` as a dependency instead of a devDependency, since its build imports it at runtime.

### Patch Changes

- Updated dependencies [[`5e916fb`](https://github.com/cypress-io/cypress-design/commit/5e916fbe2b83d1503ed80820a85a8705bdcaeef1)]:
  - @cypress-design/vue-checkbox@1.1.0

## 1.0.0

### Major Changes

- [#697](https://github.com/cypress-io/cypress-design/pull/697) [`a67692f`](https://github.com/cypress-io/cypress-design/commit/a67692fff10236374e2e10ae68384abeb14048f1) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Add the Select component: a single-select dropdown with a Button trigger (swappable via the `#trigger` slot / render prop) and a popover panel that supports headline / divider / default / checkbox / user / button / custom rows, optional header (title, back button, iconLeft / tag / iconRight, tabs, search) and footer (label + action or arbitrary content), theme-aware light/dark styling, size `32` / `40`, configurable width / minWidth / maxWidth / height / maxHeight, and left/right alignment. Selection is controlled or uncontrolled; open state is controlled or uncontrolled. Keyboard navigation walks selectable rows and in-list `button` rows via `aria-activedescendant`, with Enter/Space to commit, Escape/Tab to dismiss. Case-insensitive search filters items by label and collapses orphaned headline groups. `type: 'button'` rows fire their own `onClick` without changing the value.

  The `constants-select` package is bundled into the React and Vue packages — consumers install a single package.
