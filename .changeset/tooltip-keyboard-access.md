---
'@cypress-design/vue-tooltip': minor
'@cypress-design/react-tooltip': minor
---

Tooltip now works with the keyboard and screen readers.

- Vue: tabbing to a button or link inside a Tooltip now opens it. Before, only a Tooltip with its own `tabindex` responded to the keyboard. A mouse click no longer keeps the tooltip open after the pointer leaves.
- In an `interactive` tooltip, Tab from the trigger moves into the tooltip's links and buttons. Shift+Tab returns to the trigger, and Tab from the last one continues to the next control on the page. Before, those links could only be reached with the mouse.
- Escape closes the tooltip and returns focus to the trigger. Inside a Modal, the first Escape closes only the tooltip.
- Screen readers now read the tooltip as the trigger's description, once you connect it. Vue: bind the default slot's `describedBy` to the trigger's `aria-describedby`; a Tooltip with a `tabindex` does this for you. React: pass a function as `children` to receive `describedBy`. It's set only while the tooltip is open.
- Vue: a tooltip controlled with `open` no longer stays visible after `open` turns false when the pointer was over it.
