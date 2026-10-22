---
'@cypress-design/vue-tooltip': minor
'@cypress-design/react-tooltip': minor
---

Make the Tooltip work from the keyboard and with screen readers.

Vue: keyboard focus on a trigger inside the Tooltip now opens it. The wrapper listened for `focus`, which doesn't bubble from the trigger, so only a focusable wrapper ever opened it. It opens for keyboard focus only, so a mouse click doesn't pin it open, including a click into a text field. The tooltip content now has an id, and the default slot passes it as `describedBy` for the trigger's `aria-describedby`. A Tooltip with a `tabindex` sets `aria-describedby` on its own wrapper. A hover that ends while `open` is set no longer leaves the popper visible after `open` turns false.

React: `children` can be a function that receives `describedBy`, the id of the tooltip content, for `aria-describedby` on a focusable child. Before, only the wrapper `<div>` was described, so a nested `<button>` trigger had no description.

Vue and React: in an `interactive` tooltip, Tab from the open trigger moves focus to the first link or button in the tooltip, Shift+Tab from it returns to the trigger, and Tab from the last one continues to the next control on the page. Before, the tooltip sat at the end of `<body>`, out of reach of the keyboard. Other focusable elements inside the trigger area keep their tab order, and inside a modal dialog, where the tooltip can't take focus, Tab moves on normally. Escape closes the tooltip from the trigger or from inside it and returns focus to the trigger, even when the tooltip was reached with the mouse. It's only consumed when it closes the tooltip, so an enclosing dialog closes on the next Escape.
