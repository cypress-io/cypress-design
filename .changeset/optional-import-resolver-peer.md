---
'@cypress-design/eslint-plugin': patch
---

Mark the `eslint-import-resolver-typescript` peer dependency as optional. Only the deprecated `deprecate-imports` and `deprecate-imports-again` rules use it, so projects that use `no-windicss` or the `recommended` config no longer get a missing-peer warning (or an install error with strict package managers).
