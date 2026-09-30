---
'@cypress-design/react-logo': patch
'@cypress-design/react-menu': patch
'@cypress-design/react-modal': patch
'@cypress-design/react-testresult': patch
'@cypress-design/vue-spinner': patch
'@cypress-design/vue-docmenu': patch
'@cypress-design/react-textbox': patch
---

Fix types for consumers using TypeScript's `bundler` / `node16` resolution:

- `react-logo`, `react-menu`, `react-modal`, `react-testresult`: add the `types` condition to `exports`, so TypeScript finds `dist/index.d.ts` instead of reporting the package as untyped.
- `vue-spinner`: the `./sfc` subpath now points TypeScript at `dist/Spinner.vue.d.ts`.
- `vue-docmenu`: `linkComponent` accepts any Vue component (`Component | 'a'`); the previous `DefineComponent | 'a'` type rejected real components.
- `react-textbox`: `onChange` receives a `ChangeEvent`, so `event.target.value` type-checks.
