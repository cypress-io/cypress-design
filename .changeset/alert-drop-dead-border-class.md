---
'@cypress-design/react-alert': patch
'@cypress-design/vue-alert': patch
---

Remove `border-t-1` from the details footer. It isn't a Tailwind class and generated no CSS; the border comes from `border-t`, so the Alert looks the same.
