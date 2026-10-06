---
'@cypress-design/react-statusicon': patch
'@cypress-design/vue-testresult': patch
---

List `@cypress-design/icon-registry` in `dependencies`. The build keeps it external, so the published bundle imports it at runtime, and it previously resolved only because the icon packages install it too.
