---
'@cypress-design/vue-docmenu': patch
'@cypress-design/react-docmenu': patch
---

DocMenu: a collapsible group header renders as a `<button>` and no longer carries the group's `href`, which isn't valid on a button.

React DocMenu no longer scrolls the page to the active item when it first mounts, only when the active item changes, matching Vue.
