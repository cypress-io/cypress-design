---
'@cypress-design/react-runresults': patch
---

Fix UMD build interop so default-imported sibling `@cypress-design/react-*` components resolve via `.default` (Rollup `interop: 'auto'`), removing the need for consumer-side ESM aliases.
