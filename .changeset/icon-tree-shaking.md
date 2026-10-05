---
'@cypress-design/vue-icon': patch
'@cypress-design/react-icon': patch
---

Fix tree shaking in `@cypress-design/vue-icon`: importing a single named icon (for example `IconActionPlaySmall`) now bundles about 13 KB instead of every icon plus the full icon registry (about 960 KB). Both icon packages are now marked `"sideEffects": false`. The default `Icon` component still includes every icon because it looks icons up by name at runtime, so prefer named imports.
