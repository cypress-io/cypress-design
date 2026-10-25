# @cypress-design/eslint-plugin

## 0.2.0

### Minor Changes

- [#757](https://github.com/cypress-io/cypress-design/pull/757) [`4c18023`](https://github.com/cypress-io/cypress-design/commit/4c1802349ab48526c7fbdbefe2416840f824c313) Thanks [@jennifer-shehane](https://github.com/jennifer-shehane)! - Deprecate the `deprecate-imports` and `deprecate-imports-again` rules. They still work, but ESLint now reports them as deprecated, and they will be removed in a future release. ESLint's built-in `no-restricted-imports` rule covers the same cases without an import resolver, including named imports through barrel files. The [`deprecate-imports` docs](https://github.com/cypress-io/cypress-design/blob/main/packages/eslint-plugin/docs/rules/deprecate-imports.md#migrating-to-no-restricted-imports) show how to move each entry over.

- [#751](https://github.com/cypress-io/cypress-design/pull/751) [`2432909`](https://github.com/cypress-io/cypress-design/commit/243290986f83a568caa1580d41e46398c7646da9) Thanks [@jennifer-shehane](https://github.com/jennifer-shehane)! - Add the `no-windicss` rule, which reports new WindiCSS imports (`windicss`, `@windicss/*`, `vite-plugin-windicss`, `virtual:windi.css` and similar) and references to the `WindiColor` type. The plugin now exports ESLint 9 flat-config metadata and a `configs.recommended` flat config that turns the rule on, and the README documents flat-config setup under the correct package name.

## 0.1.1

### Patch Changes

- [`3bbf95f`](https://github.com/cypress-io/cypress-design/commit/3bbf95fc1f4f07fd8726bffe0850b24a0969798f) Thanks [@elevatebart](https://github.com/elevatebart)! - allow multiple deprecated imports

## 0.1.0

### Minor Changes

- [`28c2ab2`](https://github.com/cypress-io/cypress-design/commit/28c2ab26b7583fcd18497645469be503cd065ab0) Thanks [@elevatebart](https://github.com/elevatebart)! - add url to rule docs

- [#239](https://github.com/cypress-io/cypress-design/pull/239) [`cf697ce`](https://github.com/cypress-io/cypress-design/commit/cf697ce2fceb5b380acd0f79f7b389773ffcef4a) Thanks [@elevatebart](https://github.com/elevatebart)! - add option to filter on named imports

## 0.0.1

### Patch Changes

- [#219](https://github.com/cypress-io/cypress-design/pull/219) [`0a4ce3b`](https://github.com/cypress-io/cypress-design/commit/0a4ce3bb55b9ab0510f7fb9ba207d5fdc3cb723f) Thanks [@elevatebart](https://github.com/elevatebart)! - create eslint plugin
