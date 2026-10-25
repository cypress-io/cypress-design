---
'@cypress-design/react-select': patch
'@cypress-design/vue-select': patch
---

Set `aria-selected="false"` on `button` rows. They carry `role="option"` like the other rows, but without `aria-selected` screen readers had no selection state to announce for them.
