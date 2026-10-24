---
'@cypress-design/react-select': patch
'@cypress-design/vue-select': patch
---

Button rows now set `aria-selected="false"`. They already have `role="option"`, and an option needs `aria-selected`, so screen readers announce them as valid listbox options.
