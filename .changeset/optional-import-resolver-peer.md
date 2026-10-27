---
'@cypress-design/eslint-plugin': minor
---

Mark the `eslint-import-resolver-typescript` peer dependency as optional. Only the deprecated `deprecate-imports` and `deprecate-imports-again` rules use it, so npm no longer installs it in every project that uses `no-windicss` or the `recommended` config, and Yarn no longer warns when it's missing.

If you still use `deprecate-imports` or `deprecate-imports-again` with the TypeScript resolver, add it to your own devDependencies (`npm install --save-dev eslint-import-resolver-typescript`). Otherwise, the next fresh install drops it, and the rules report a `Resolve error` instead of your deprecated imports. Better yet, move to `no-restricted-imports`, which needs no resolver: see the [migration guide](https://github.com/cypress-io/cypress-design/blob/main/packages/eslint-plugin/docs/rules/deprecate-imports.md#migrating-to-no-restricted-imports).
