---
'@cypress-design/vue-statusicon': patch
---

StatusIcon (Vue): `SolidStatusIcon`, `OutlineStatusIcon` and `SimpleStatusIcon` default `size` to `'24'`, like React. Leaving `size` out used to throw during render and take down the app. A `size`/`status` pair with no icon asset now renders nothing instead of throwing.
