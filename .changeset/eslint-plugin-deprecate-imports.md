---
'@cypress-design/eslint-plugin': minor
---

Deprecate the `deprecate-imports` and `deprecate-imports-again` rules. They still work, but ESLint now reports them as deprecated, and they will be removed in a future release. ESLint's built-in `no-restricted-imports` rule covers the same cases without an import resolver, including named imports through barrel files. The [`deprecate-imports` docs](https://github.com/cypress-io/cypress-design/blob/main/packages/eslint-plugin/docs/rules/deprecate-imports.md#migrating-to-no-restricted-imports) show how to move each entry over.
