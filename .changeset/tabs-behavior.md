---
'@cypress-design/vue-tabs': patch
---

`v-model:active-id` now updates when a tab is clicked, not only on arrow-key navigation. `update:activeId` is still skipped when a `switch` handler calls `preventDefault()`.
