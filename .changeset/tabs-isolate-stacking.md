---
'@cypress-design/constants-tabs': patch
'@cypress-design/react-tabs': patch
'@cypress-design/vue-tabs': patch
---

Keep `Tabs` under overlays and modals. The tab list now creates its own stacking context at `z-index: 1`, so the `z-index` values it uses for the active tab and marker no longer compete with the rest of the page. You can remove any `relative z-0` wrapper you added around `Tabs` to work around this.
