# @cypress-design/react-icon

## 0.3.0

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

- [#39](https://github.com/cypress-io/cypress-design/pull/39) [`1b383f3`](https://github.com/cypress-io/cypress-design/commit/1b383f3d149948bf2cc062d3baa17d5ce032f07e) Thanks [@elevatebart](https://github.com/elevatebart)! - fix file path of sourcemaps

- Updated dependencies [[`4259026`](https://github.com/cypress-io/cypress-design/commit/4259026314464260e89bcd88690c8a60ad2f0459)]:
  - @cypress-design/icon-registry@0.4.0

## 0.2.1

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
