---
'@cypress-design/vue-accordion': patch
---

The Vue Accordion now follows the `open` prop when it changes after mount, matching React. `onToggle` now fires once per open or close instead of twice.
