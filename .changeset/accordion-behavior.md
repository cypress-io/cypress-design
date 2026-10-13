---
'@cypress-design/vue-accordion': minor
---

Vue Accordion fixes:

- A real mouse click can close the accordion again. Vue re-rendered `open` between the click handlers, so the open/close animation undid every close.
- The accordion now follows the `open` prop when it changes after mount, matching React. A change mid-animation cancels the animation instead of being undone by it.
- `onToggle` fires once per open or close instead of twice.
- Returning `false` from `onClickSummary` now also stops the open/close animation.
