---
'@cypress-design/vue-modal': patch
---

List `@cypress-design/vue-icon` in `dependencies`. The build keeps it external, so `dist/` imports it at runtime, but it was only a devDependency and consumers never got it installed.
