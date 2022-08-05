# @cypress-design/css

## 0.6.1

### Patch Changes

- [#64](https://github.com/cypress-io/cypress-design/pull/64) [`6f4f64b`](https://github.com/cypress-io/cypress-design/commit/6f4f64be15016f7ff16a6b8221708686f2dca3ca) Thanks [@elevatebart](https://github.com/elevatebart)! - - remove dependency of @cypress-design/css to `dedent`
  - merge the windicss config passed to plugins with the default config

## 0.6.0

### Minor Changes

- [#51](https://github.com/cypress-io/cypress-design/pull/51) [`ccd8f9a`](https://github.com/cypress-io/cypress-design/commit/ccd8f9a8feb624c0a52deaa9754c76969f43fc1e) Thanks [@elevatebart](https://github.com/elevatebart)! - expose a rollup plugin to list all used windi classes at the boootom of the component

### Patch Changes

- [#47](https://github.com/cypress-io/cypress-design/pull/47) [`8994dbf`](https://github.com/cypress-io/cypress-design/commit/8994dbf14ac80a2326d3b5947942e7c1ac2efa9a) Thanks [@elevatebart](https://github.com/elevatebart)! - detect transparent, white, black, and current colors in the purgecss plugin

## 0.5.2

### Patch Changes

- [`e3eb9c7`](https://github.com/cypress-io/cypress-design/commit/e3eb9c7fee2d7a6e0a773e85ed4b73be04d83587) Thanks [@elevatebart](https://github.com/elevatebart)! - downgrade typescript to 4.4 for compat with app

## 0.5.1

### Patch Changes

- [`c339ddd`](https://github.com/cypress-io/cypress-design/commit/c339dddb8347ceccdb497a0c2a4dfa3b52947114) Thanks [@elevatebart](https://github.com/elevatebart)! - take into account kebab-cased attributes in the icons plugin

## 0.5.0

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

- [`4af3ea0`](https://github.com/cypress-io/cypress-design/commit/4af3ea08b8e172d328c11b64764631e85ffe0c07) Thanks [@elevatebart](https://github.com/elevatebart)! - allow for v-bind/calculated icon colors

## 0.4.1

### Patch Changes

- [#20](https://github.com/cypress-io/cypress-design/pull/20) [`14dd0f5`](https://github.com/cypress-io/cypress-design/commit/14dd0f5b8e37882cbf7def1bcf0ce013241e39fb) Thanks [@elevatebart](https://github.com/elevatebart)! - To avoid having every color in the universe in the **safelist**, add the IconExtractor.
  Also, remove the entire safelist from the css plugins windi config.

## 0.4.0

### Minor Changes

- [#23](https://github.com/cypress-io/cypress-design/pull/23) [`977825c`](https://github.com/cypress-io/cypress-design/commit/977825c3bb9c2f10085cd8caa4315a625499b783) Thanks [@mapsandapps](https://github.com/mapsandapps)! - Add CSS shortcut and shadow for Card

### Patch Changes

- [#33](https://github.com/cypress-io/cypress-design/pull/33) [`5f9cf10`](https://github.com/cypress-io/cypress-design/commit/5f9cf10ff4709fcd7d322c2dc5dbc676473b433e) Thanks [@elevatebart](https://github.com/elevatebart)! - add icon-dark-white to safelist

## 0.3.0

### Minor Changes

- [`d19cf7b`](https://github.com/cypress-io/cypress-design/commit/d19cf7b882c35aef7b1ce2d3b7105ae727b1d2ab) Thanks [@elevatebart](https://github.com/elevatebart)! - add boxShadow-dropdown utility class to the css config

## 0.2.0

### Minor Changes

- [#10](https://github.com/cypress-io/cypress-design/pull/10) [`e20eea8`](https://github.com/cypress-io/cypress-design/commit/e20eea84375b7f4bd3a15a80fce3bdbfcb327981) Thanks [@elevatebart](https://github.com/elevatebart)! - - added icons secondary color classes to the safelist
  - added transparent & current icon colors to the safelist
  - rename and update color variables:
    - customColors -> cyColors : contains all the colors of the official Cypress palette
    - cyColors -> semanticColors : contains semanticly meaningful colors. Examples: warning, success, error, etc.

### Patch Changes

- [#11](https://github.com/cypress-io/cypress-design/pull/11) [`b4f81f0`](https://github.com/cypress-io/cypress-design/commit/b4f81f065ddb523731ed60f43e3d20b71090a783) Thanks [@mapsandapps](https://github.com/mapsandapps)! - **chore**: Remove yellow - no longer in figma

## 0.1.1

### Patch Changes

- [`1ecd63e`](https://github.com/cypress-io/cypress-design/commit/1ecd63e19bdb0b7cc00d7ddc25c632d98cad795b) Thanks [@elevatebart](https://github.com/elevatebart)! - Fix types for typescript 4.6.4 compatibility

## 0.1.0

### Minor Changes

- [#7](https://github.com/cypress-io/cypress-design/pull/7) [`04ae342`](https://github.com/cypress-io/cypress-design/commit/04ae342db01cf9db0eb6a3a99f8c0539d31ede04) Thanks [@elevatebart](https://github.com/elevatebart)! - Initial release of CSS:

  Initial release of the following components

  - Checkbox
