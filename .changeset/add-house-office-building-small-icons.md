---
"@cypress-design/icon-registry": major
"@cypress-design/react-icon": major
"@cypress-design/vue-icon": major
---

Add `building-house` and `building-office-small` at 24px (`IconBuildingHouse`, `IconBuildingOfficeSmall`). Add `technology-dollar` at 24px (previously 16px only), using the existing well-centered 24px dollar glyph already proven in production on cypress.io's Pricing nav dropdown.

**Breaking:** rename `general-office-building` to `building-office-large` (`IconGeneralOfficeBuilding` → `IconBuildingOfficeLarge`), grouping it under the same `building-*` family as the two new icons above. Update imports accordingly.

Fix `cypress-studio` (16px, 24px, 48px): the glyph shipped on the `icon-light` class instead of `icon-dark`, so `strokeColor` never applied and the icon rendered washed-out via `fillColor` only. Consumers coloring the icon via `fillColor` will need to switch to `strokeColor`.
