---
'@cypress-design/react-tooltip': patch
'@cypress-design/vue-tooltip': patch
---

Point the tooltip arrow at its trigger when the tooltip shifts to stay in view. Near the edge of the viewport, the arrow used to stay where the tooltip would have been before it shifted, so it could point tens of pixels away from the trigger.
