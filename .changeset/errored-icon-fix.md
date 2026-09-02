---
'@cypress-design/icon-registry': patch
'@cypress-design/constants-statusicon': patch
'@cypress-design/react-statusicon': patch
'@cypress-design/vue-statusicon': patch
---

Fix the errored/timedOut/overLimit/noTests status icon's circle radius reaching all the way to the SVG's edge (0–16, no margin) instead of matching every other status icon's inset circle (radius 5–7, a 1px margin from the edge). Also recolor the running icon's static track circle from a fully-opaque `gray-100` to `gray-1000` at 50% opacity, so it reads as a subtler background track behind the animated arc.
