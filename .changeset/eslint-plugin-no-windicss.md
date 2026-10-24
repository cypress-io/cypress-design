---
'@cypress-design/eslint-plugin': minor
---

Add the `no-windicss` rule, which reports new WindiCSS imports (`windicss`, `@windicss/*`, `vite-plugin-windicss`, `virtual:windi.css` and similar) and references to the `WindiColor` type. The plugin now exports ESLint 9 flat-config metadata and a `configs.recommended` flat config that turns the rule on, and the README documents flat-config setup under the correct package name.
