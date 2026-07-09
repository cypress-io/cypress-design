---
"@cypress-design/icon-registry": patch
"@cypress-design/react-icon": patch
"@cypress-design/vue-icon": patch
---

Fix `technology-dollar`'s 16px glyph being off-center: the `viewBox` was `0 0 10 16` instead of a proper `0 0 16 16` square (the artwork itself was already symmetric within its own bounds — this was purely a coordinate-space mismatch, not a redraw).
