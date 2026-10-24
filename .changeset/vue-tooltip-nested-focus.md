---
'@cypress-design/vue-tooltip': patch
---

The tooltip now opens when a focusable element inside the trigger gets keyboard focus, such as a `<button>` in the default slot, and stays open while focus moves between elements inside the trigger. Before, it only opened when the wrapper itself was focused, because `focus` and `blur` events don't bubble. This matches the React tooltip.
