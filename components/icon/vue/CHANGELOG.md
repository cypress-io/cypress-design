# @cypress-design/vue-icon

## 0.5.2

### Patch Changes

- [#68](https://github.com/cypress-io/cypress-design/pull/68) [`8c577fb`](https://github.com/cypress-io/cypress-design/commit/8c577fb0c6a0411cf8218dfe78281834df3d6f13) Thanks [@elevatebart](https://github.com/elevatebart)! - feat: publish `.mjs` files for esm intead of `.js`

- Updated dependencies [[`8c577fb`](https://github.com/cypress-io/cypress-design/commit/8c577fb0c6a0411cf8218dfe78281834df3d6f13)]:
  - @cypress-design/icon-registry@0.6.1

## 0.5.1

### Patch Changes

- Updated dependencies [[`25c6260`](https://github.com/cypress-io/cypress-design/commit/25c62605be573dafafff090b47fb80091b35aea4)]:
  - @cypress-design/icon-registry@0.6.0

## 0.5.0

### Minor Changes

- [#51](https://github.com/cypress-io/cypress-design/pull/51) [`ccd8f9a`](https://github.com/cypress-io/cypress-design/commit/ccd8f9a8feb624c0a52deaa9754c76969f43fc1e) Thanks [@elevatebart](https://github.com/elevatebart)! - in the build asset, add a comment containing all used windicss classes in the component

### Patch Changes

- [#56](https://github.com/cypress-io/cypress-design/pull/56) [`0866c65`](https://github.com/cypress-io/cypress-design/commit/0866c654f24c36951c98468d789462748606b428) Thanks [@elevatebart](https://github.com/elevatebart)! - fix: avoid using `delete` to avoid memory leaks

* [#52](https://github.com/cypress-io/cypress-design/pull/52) [`43b53eb`](https://github.com/cypress-io/cypress-design/commit/43b53eb6bd10111629239a87374cfcc894eda0e3) Thanks [@mapsandapps](https://github.com/mapsandapps)! - New icons for statuses

* Updated dependencies [[`31aaa18`](https://github.com/cypress-io/cypress-design/commit/31aaa182c8cd415f2884289144f504183e5ab418), [`0866c65`](https://github.com/cypress-io/cypress-design/commit/0866c654f24c36951c98468d789462748606b428), [`43b53eb`](https://github.com/cypress-io/cypress-design/commit/43b53eb6bd10111629239a87374cfcc894eda0e3)]:
  - @cypress-design/icon-registry@0.5.0

## 0.4.2

### Patch Changes

- [`e3eb9c7`](https://github.com/cypress-io/cypress-design/commit/e3eb9c7fee2d7a6e0a773e85ed4b73be04d83587) Thanks [@elevatebart](https://github.com/elevatebart)! - downgrade typescript to 4.4 for compat with app

- Updated dependencies [[`e3eb9c7`](https://github.com/cypress-io/cypress-design/commit/e3eb9c7fee2d7a6e0a773e85ed4b73be04d83587)]:
  - @cypress-design/icon-registry@0.4.2

## 0.4.1

### Patch Changes

- [`c339ddd`](https://github.com/cypress-io/cypress-design/commit/c339dddb8347ceccdb497a0c2a4dfa3b52947114) Thanks [@elevatebart](https://github.com/elevatebart)! - take into account kebab-cased attributes in the icons plugin

- Updated dependencies [[`c339ddd`](https://github.com/cypress-io/cypress-design/commit/c339dddb8347ceccdb497a0c2a4dfa3b52947114)]:
  - @cypress-design/icon-registry@0.4.1

## 0.4.0

### Minor Changes

- [#41](https://github.com/cypress-io/cypress-design/pull/41) [`4259026`](https://github.com/cypress-io/cypress-design/commit/4259026314464260e89bcd88690c8a60ad2f0459) Thanks [@elevatebart](https://github.com/elevatebart)! - ## New syntaxes to add dynamic icon colors

  ### With a prefix focus/hover

  ```html
  <IconBook
    size="16"
    strokeColor="blue-600"
    hoverStrokeColor="jade-600"
    focusStrokeColor="jade-900"
  />
  ```

  ### With the same prefix acting on a group

  ```html
  <button class="group">
    <IconBook
      size="16"
      strokeColor="blue-600"
      hoverStrokeColor="jade-600"
      focusStrokeColor="jade-900"
      interactiveColorsOnGroup
    />Read
  </button>
  ```

### Patch Changes

- Updated dependencies [[`4259026`](https://github.com/cypress-io/cypress-design/commit/4259026314464260e89bcd88690c8a60ad2f0459)]:
  - @cypress-design/icon-registry@0.4.0

## 0.3.0

### Minor Changes

- [#33](https://github.com/cypress-io/cypress-design/pull/33) [`5f9cf10`](https://github.com/cypress-io/cypress-design/commit/5f9cf10ff4709fcd7d322c2dc5dbc676473b433e) Thanks [@elevatebart](https://github.com/elevatebart)! - Allow vue icon to have a class

### Patch Changes

- Updated dependencies [[`5f9cf10`](https://github.com/cypress-io/cypress-design/commit/5f9cf10ff4709fcd7d322c2dc5dbc676473b433e), [`69b3327`](https://github.com/cypress-io/cypress-design/commit/69b332757ba3b73d0ae881c5959daa7a2e644fe0)]:
  - @cypress-design/icon-registry@0.3.0

## 0.2.0

### Minor Changes

- [`efb31b3`](https://github.com/cypress-io/cypress-design/commit/efb31b35d9c84b922a20ae46afa583f0b5849b41) Thanks [@elevatebart](https://github.com/elevatebart)! - Export the WindiColor and iconId types

### Patch Changes

- Updated dependencies [[`efb31b3`](https://github.com/cypress-io/cypress-design/commit/efb31b35d9c84b922a20ae46afa583f0b5849b41)]:
  - @cypress-design/icon-registry@0.2.0

## 0.1.0

### Minor Changes

- [#10](https://github.com/cypress-io/cypress-design/pull/10) [`e20eea8`](https://github.com/cypress-io/cypress-design/commit/e20eea84375b7f4bd3a15a80fce3bdbfcb327981) Thanks [@elevatebart](https://github.com/elevatebart)! - Creation of vue and react icon components

### Patch Changes

- Updated dependencies [[`e20eea8`](https://github.com/cypress-io/cypress-design/commit/e20eea84375b7f4bd3a15a80fce3bdbfcb327981)]:
  - @cypress-design/icon-registry@0.1.0
