# @cypress-design/constants-tabs

## 1.0.0

### Major Changes

- [#439](https://github.com/cypress-io/cypress-design/pull/439) [`5bddc81`](https://github.com/cypress-io/cypress-design/commit/5bddc8150ae23549c3dca059a79260914323836a) Thanks [@rachelruderman](https://github.com/rachelruderman)! - - Tabs component now requires `aria-controls` prop
  - Tab `id` is now passed through as an `id` attribute on the tab
  - Inactive tabs now have `aria-selected=false`
  - Button component now exports StaticClasses

## 0.6.6

### Patch Changes

- [`ab1b74c`](https://github.com/cypress-io/cypress-design/commit/ab1b74cc4e9582118298168edf2a8ba50d41f362) Thanks [@elevatebart](https://github.com/elevatebart)! - fix babel build

## 0.6.5

### Patch Changes

- [`4c6fb8d`](https://github.com/cypress-io/cypress-design/commit/4c6fb8d408650ff985a71cdd5d46e738e5ee16c2) Thanks [@elevatebart](https://github.com/elevatebart)! - fix class issue

## 0.6.4

### Patch Changes

- [`d0c6410`](https://github.com/cypress-io/cypress-design/commit/d0c64109f49cba1efb0c54c2daa1924a2898b96f) Thanks [@elevatebart](https://github.com/elevatebart)! - only border on the bottom

## 0.6.3

### Patch Changes

- [`6b05f7d`](https://github.com/cypress-io/cypress-design/commit/6b05f7d698d1c0f7056ab45f43856bece4833263) Thanks [@elevatebart](https://github.com/elevatebart)! - active tabs should never have a underline on hover (even when anchors)

## 0.6.2

### Patch Changes

- [`04c9f71`](https://github.com/cypress-io/cypress-design/commit/04c9f714391166128f189551696bdac7a7d836ff) Thanks [@elevatebart](https://github.com/elevatebart)! - use a proper plugin for hocus

## 0.6.1

### Patch Changes

- [`288a9c4`](https://github.com/cypress-io/cypress-design/commit/288a9c4c4c26002e6753191217f4f4ca60727adb) Thanks [@elevatebart](https://github.com/elevatebart)! - add a missing class to the border-b (underline)

## 0.6.0

### Minor Changes

- [#301](https://github.com/cypress-io/cypress-design/pull/301) [`db5ca48`](https://github.com/cypress-io/cypress-design/commit/db5ca48eb3f21a3fe24d6075c87baa4445ef00f5) Thanks [@elevatebart](https://github.com/elevatebart)! - allow constants to be rendered custom + better tag style for most variants

## 0.5.3

### Patch Changes

- [#292](https://github.com/cypress-io/cypress-design/pull/292) [`c570715`](https://github.com/cypress-io/cypress-design/commit/c5707156552fa29511876114109c4afe35a67cc5) Thanks [@mabela416](https://github.com/mabela416)! - Allow Tab to accept data-pendo prop

- [#295](https://github.com/cypress-io/cypress-design/pull/295) [`209d58e`](https://github.com/cypress-io/cypress-design/commit/209d58ef50ab9d97ee5c1650f6086f640f1384bf) Thanks [@elevatebart](https://github.com/elevatebart)! - move underline a pixel up

## 0.5.2

### Patch Changes

- [`ddaee22`](https://github.com/cypress-io/cypress-design/commit/ddaee22971121704cb9f3b780857c9877e470faf) Thanks [@elevatebart](https://github.com/elevatebart)! - adjust position of active marker when resizing window

## 0.5.1

### Patch Changes

- [`743a060`](https://github.com/cypress-io/cypress-design/commit/743a060b016a346a9a4ce38e630cec4b9aa24705) Thanks [@elevatebart](https://github.com/elevatebart)! - remove translate-y from center tabs

## 0.5.0

### Minor Changes

- [#283](https://github.com/cypress-io/cypress-design/pull/283) [`cec77ef`](https://github.com/cypress-io/cypress-design/commit/cec77ef4d2e4af090efcb9e61905208b785f8183) Thanks [@elevatebart](https://github.com/elevatebart)! - add centered variant for blog

### Patch Changes

- Updated dependencies [[`e390827`](https://github.com/cypress-io/cypress-design/commit/e3908270ece513886c64cebcb78cebe0cd0d8c3d)]:
  - @cypress-design/icon-registry@0.25.0

## 0.4.1

### Patch Changes

- [`869d592`](https://github.com/cypress-io/cypress-design/commit/869d59290038d8919c318f4b6594867d1f1b8d4f) Thanks [@elevatebart](https://github.com/elevatebart)! - adust the underline-small classes with relative

## 0.4.0

### Minor Changes

- [#272](https://github.com/cypress-io/cypress-design/pull/272) [`9a3e358`](https://github.com/cypress-io/cypress-design/commit/9a3e3582b8ca2dfdadd9198054042c9f0083be01) Thanks [@elevatebart](https://github.com/elevatebart)! - remove dark mode implementation to avoid wrong side effects

## 0.3.0

### Minor Changes

- [#267](https://github.com/cypress-io/cypress-design/pull/267) [`dd57623`](https://github.com/cypress-io/cypress-design/commit/dd57623479470aaa0616dda02f59c6011cb2cd78) Thanks [@elevatebart](https://github.com/elevatebart)! - move active status of tabs to a prop of the component

## 0.2.0

### Minor Changes

- [#214](https://github.com/cypress-io/cypress-design/pull/214) [`319cf8c`](https://github.com/cypress-io/cypress-design/commit/319cf8c43ce9efa8c0f3d2cfc4f4c0039cddb385) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Add dark variants to tabs

## 0.1.0

### Minor Changes

- [#196](https://github.com/cypress-io/cypress-design/pull/196) [`fc6d9e4`](https://github.com/cypress-io/cypress-design/commit/fc6d9e4fedcc01fa8e01b868b0fa66d8895c37d0) Thanks [@elevatebart](https://github.com/elevatebart)! - refactor: avoid constants relative imports
