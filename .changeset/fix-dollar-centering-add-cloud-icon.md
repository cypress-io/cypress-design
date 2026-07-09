---
"@cypress-design/icon-registry": minor
"@cypress-design/react-icon": minor
"@cypress-design/vue-icon": minor
---

Fix `technology-dollar`'s 16px glyph being off-center: the viewBox was `0 0 10 16` instead of a proper `0 0 16 16` square (the artwork itself was already symmetric within its own bounds — this was purely a coordinate-space mismatch, not a redraw).

Add `technology-cloud` at 24px (`IconTechnologyCloud`) — a circle-disc-backed play-button glyph, replacing a local stand-in that had no Design System equivalent.
