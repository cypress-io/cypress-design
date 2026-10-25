# @cypress-design/vue-testresult

## 1.1.1

### Patch Changes

- [#735](https://github.com/cypress-io/cypress-design/pull/735) [`cf29612`](https://github.com/cypress-io/cypress-design/commit/cf296129df3dca8d73a8691e79ca6c25fa5aa05f) Thanks [@jennifer-shehane](https://github.com/jennifer-shehane)! - List `@cypress-design/icon-registry` in `dependencies`. The build keeps it external, so the published bundle imports it at runtime, and it previously resolved only because the icon packages install it too.

## 1.1.0

### Minor Changes

- [#733](https://github.com/cypress-io/cypress-design/pull/733) [`5e916fb`](https://github.com/cypress-io/cypress-design/commit/5e916fbe2b83d1503ed80820a85a8705bdcaeef1) Thanks [@jennifer-shehane](https://github.com/jennifer-shehane)! - Depend on `@cypress-design/vue-icon` and `@cypress-design/react-icon` 3.x. These packages were last published against icon 1.x, so installs stayed on 1.x and missed the 3.x fixes, including tree-shakable named icon imports. None of the icons these components use were renamed or removed in 2.0 or 3.0, so there are no API changes. `@cypress-design/vue-modal` now also lists `@cypress-design/vue-icon` as a dependency instead of a devDependency, since its build imports it at runtime.

## 1.0.0

### Major Changes

- [`63fb4d9`](https://github.com/cypress-io/cypress-design/commit/63fb4d9e60f6c56c563d17e3b983d0ebd25e0e87) Thanks [@elevatebart](https://github.com/elevatebart)! - Create 1.0

### Patch Changes

- Updated dependencies [[`63fb4d9`](https://github.com/cypress-io/cypress-design/commit/63fb4d9e60f6c56c563d17e3b983d0ebd25e0e87)]:
  - @cypress-design/vue-icon@1.0.0
  - @cypress-design/vue-statusicon@1.0.0
  - @cypress-design/constants-testresult@1.0.0

## 0.0.3

### Patch Changes

- [#396](https://github.com/cypress-io/cypress-design/pull/396) [`5a94f90`](https://github.com/cypress-io/cypress-design/commit/5a94f9082c6a37d9c0ceeaa8079c8ad61f26bd19) Thanks [@elevatebart](https://github.com/elevatebart)! - fix: publish constants package for testresults

- Updated dependencies [[`5a94f90`](https://github.com/cypress-io/cypress-design/commit/5a94f9082c6a37d9c0ceeaa8079c8ad61f26bd19)]:
  - @cypress-design/constants-testresult@0.0.3

## 0.0.2

### Patch Changes

- [#366](https://github.com/cypress-io/cypress-design/pull/366) [`3a48cc3`](https://github.com/cypress-io/cypress-design/commit/3a48cc327666f1a3b067263a24dd13a3ba1f3b1e) Thanks [@ryanjwilke](https://github.com/ryanjwilke)! - create the component

- Updated dependencies [[`3a48cc3`](https://github.com/cypress-io/cypress-design/commit/3a48cc327666f1a3b067263a24dd13a3ba1f3b1e)]:
  - @cypress-design/constants-testresult@0.0.2
