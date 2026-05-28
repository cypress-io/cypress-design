---
name: iconography
description: Fetch when creating, modifying, or styling icons. Skip for purely structural or text-only changes.
---

# Iconography

## Principles

- **One icon per concept.** If a single idea (AI, success, warning, etc.) gets multiple icons across the product, the product feels built by committee. Pick one symbol per concept and use it everywhere.
- **Don't add icons to disambiguate things that don't need disambiguating.** Every signal added to the UI competes with the signals that actually matter. More icons rarely means more clarity; it usually means more noise.
- **Prefer a section title + description over a row of `?` tooltips.** Tooltips everywhere read as cluttered and teach the user that they need to hover to understand. A clear heading and short description teaches more with less ink and survives skimming.

For illustration craft (style, framing, lighting, Cypress Heroes house style), see [illustrations.md](./illustrations.md). For broader visual hierarchy thinking, see [principles/visual-hierarchy.md](./principles/visual-hierarchy.md).

## Construction

- **All line icons use a 2px stroke** ("flat icon" style). Avoid 1px or 1.5px strokes — they read too thin at small sizes.
- Apply this to `strokeWidth="2"` on every `<svg>` line icon. SVGs should use `stroke="currentColor"`, `fill="none"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- Brand logos are exempt — leave them as-is.
