---
'@cypress-design/vue-modal': minor
'@cypress-design/react-modal': minor
---

Modal: Escape now closes through the component's normal close path. Before, the native `<dialog>` closed but the component stayed open and the page stayed scroll-locked. Vue emits `update:show(false)` and `close`; React calls `onClose`.

Add a `helpLinkLabel` prop (default `"Need help"`) to both frameworks. The help link now opens in a new tab with `rel="noopener noreferrer"` in both (React used to open it in the same tab).

Vue: add a `closeIcon` slot that replaces the default close icon, matching React's `closeIcon` prop. A `class` on `<Modal>` lands on the `<dialog>`, matching React's `className`.
