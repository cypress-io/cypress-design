# @cypress-design/react-textbox

## 1.1.0

### Minor Changes

- [#758](https://github.com/cypress-io/cypress-design/pull/758) [`9c9f95a`](https://github.com/cypress-io/cypress-design/commit/9c9f95aebfffdce9f408cfcd13104cacd08fb1b3) Thanks [@jennifer-shehane](https://github.com/jennifer-shehane)! - Export each component’s props type: `AccordionProps`, `AlertProps`, `ButtonProps`, `DocMenuProps` (plus `NavItem`), `ModalProps`, `StatusIconProps`, `TabsProps`, `TagProps`, `TestResultProps`, `TextboxProps` and `TooltipProps`. Each one is derived from the component (`ComponentProps<typeof Tag>`), so it covers everything the component accepts, including the HTML or SVG attributes it passes through. Use it to type a wrapper that forwards its props.

  `Button`, `Icon`, `StatusIcon` and `Textbox` are now also exported by name (`import { Button } from '@cypress-design/react-button'`). Each of these packages already had other named exports, so what `require()` returns is unchanged. The other packages stay default-only at runtime, so their CommonJS `require()` still returns the component.

## 1.0.2

### Patch Changes

- [#728](https://github.com/cypress-io/cypress-design/pull/728) [`7807cfd`](https://github.com/cypress-io/cypress-design/commit/7807cfdba9d330f24f3b4912a9ad41cedf2193cb) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Fix types for consumers using TypeScript's `bundler` module resolution (the default for Vite and most modern setups):

  - `react-logo`, `react-menu`, `react-modal`, `react-testresult`: add the `types` condition to `exports`, so TypeScript finds `dist/index.d.ts` instead of reporting the package as untyped.
  - `vue-spinner`: the `./sfc` subpath now points TypeScript at `dist/Spinner.vue.d.ts`.
  - `vue-docmenu`: `linkComponent` accepts any Vue component (`Component | 'a'`); the previous `DefineComponent | 'a'` type rejected real components.
  - `react-textbox`: `onChange` receives a `ChangeEvent`, so `event.target.value` type-checks.

## 1.0.1

### Patch Changes

- [#642](https://github.com/cypress-io/cypress-design/pull/642) [`ffef070`](https://github.com/cypress-io/cypress-design/commit/ffef07087593351e46ef79238a5f29106b637a59) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Adding Textbox compenent

- Updated dependencies [[`ffef070`](https://github.com/cypress-io/cypress-design/commit/ffef07087593351e46ef79238a5f29106b637a59)]:
  - @cypress-design/constants-textbox@1.0.1
