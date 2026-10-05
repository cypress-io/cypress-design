---
'@cypress-design/vue-icon': patch
'@cypress-design/react-icon': patch
---

Make the icon packages tree-shakable. Importing a single named icon (for example `IconActionPlaySmall`) now bundles about 13 KB instead of pulling in every icon and the full icon registry (previously around 960 KB for `@cypress-design/vue-icon`). Both packages are now marked `"sideEffects": false`. The default `Icon` component still includes every icon, since it looks icons up by name at runtime, so prefer named imports.
