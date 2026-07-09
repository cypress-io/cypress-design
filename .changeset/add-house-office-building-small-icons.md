---
"@cypress-design/icon-registry": minor
"@cypress-design/react-icon": minor
"@cypress-design/vue-icon": minor
---

Add `general-house` and `general-office-building-small` at 24px (`IconGeneralHouse`, `IconGeneralOfficeBuildingSmall`). Add `technology-dollar` at 24px (previously 16px only), using the existing well-centered 24px dollar glyph already proven in production on cypress.io's Pricing nav dropdown.

Fix `cypress-studio` (16px, 24px, 48px): the glyph shipped on the `icon-light` class instead of `icon-dark`, so `strokeColor` never applied and the icon rendered washed-out via `fillColor` only. Consumers coloring the icon via `fillColor` will need to switch to `strokeColor`.
