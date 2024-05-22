---
'@cypress-design/constants-tabs': major
'@cypress-design/react-tabs': major
'@cypress-design/vue-tabs': major
'@cypress-design/react-button': patch
'@cypress-design/vue-button': patch

---

- Tabs component now requires `aria-controls` prop
- Tab `id` is now passed through as an `id` attribute on the tab
- Inactive tabs now have `aria-selected=false`
- Button component now exports StaticClasses