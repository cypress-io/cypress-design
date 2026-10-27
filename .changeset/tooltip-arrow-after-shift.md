---
'@cypress-design/react-tooltip': patch
'@cypress-design/vue-tooltip': patch
---

Point the tooltip arrow at its trigger when the tooltip shifts to stay in view. Near the edge of the viewport, the arrow used to stay where the tooltip would have been before it shifted, so it could point tens of pixels away from the trigger.

Tooltips also now count their distance from the trigger (`offsetOptions`) when deciding whether to flip to the other side. A tooltip that fit only without that gap used to stay put and run past the edge of the viewport by up to that distance; it now flips to the side where it fits.
