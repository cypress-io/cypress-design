# Disallow new WindiCSS imports and references to the `WindiColor` type (`@cypress-design/no-windicss`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

The Cypress Design System has moved from WindiCSS to Tailwind. A few WindiCSS remnants are still around while the migration finishes, and the biggest one is the `WindiColor` type exported by `@cypress-design/icon-registry` (and re-exported by `@cypress-design/react-icon` and `@cypress-design/vue-icon`). Every new reference makes that type harder to remove.

This rule reports:

- imports, re-exports, dynamic `import()` calls, and `require()` calls of WindiCSS packages: `windicss`, `windicss/*`, `@windicss/*`, and any package whose name contains a `windicss` segment, such as `vite-plugin-windicss` or `windicss-webpack-plugin`
- WindiCSS virtual modules such as `virtual:windi.css`
- any reference to the `WindiColor` type

## Rule Details

Examples of **incorrect** code for this rule:

```js
import 'virtual:windi.css'
import WindiCSS from 'vite-plugin-windicss'
```

```ts
import type { WindiColor } from '@cypress-design/vue-icon'

interface Props {
  iconColor?: WindiColor
}
```

Examples of **correct** code for this rule:

```js
import '@cypress-design/css/dist/tokens.css'
import { TailwindIconExtractor } from '@cypress-design/css'
```

```vue
<IconActionPlay stroke-color="indigo-500" />
```

When you need to pass an icon color through your own component, prefer a static string binding at the call site, or a narrower string type you own, over re-exporting `WindiColor`.

## When Not To Use It

If your project still depends on WindiCSS and you haven't started migrating to Tailwind, turn the rule off, or turn it off with `ignores` for the files you haven't migrated yet.
