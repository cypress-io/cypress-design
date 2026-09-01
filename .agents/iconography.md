---
name: iconography
description: Fetch when creating, modifying, or styling icons. Skip for purely structural or text-only changes.
---

# Iconography

## Principles

- **One icon per concept.** If a single idea (AI, success, warning, etc.) gets multiple icons across the product, the product feels built by committee. Pick one symbol per concept and use it everywhere.
- **Don't add icons to disambiguate things that don't need disambiguating.** Every signal added to the UI competes with the signals that actually matter. More icons rarely means more clarity; it usually means more noise.
- **Prefer a section title + description over a row of `?` tooltips.** Tooltips everywhere read as cluttered and teach the user that they need to hover to understand. A clear heading and short description teaches more with less ink and survives skimming.

For illustration craft (style, framing, lighting, theme, and guidelines), see [illustrations.md](https://design.cypress.io/agents/illustrations.md). For broader visual hierarchy thinking, see [principles/visual-hierarchy.md](https://design.cypress.io/agents/principles/visual-hierarchy.md).

## Construction

- **All line icons use a 2px stroke** ("flat icon" style). Avoid 1px or 1.5px strokes — they read too thin at small sizes.
- Apply this to `strokeWidth="2"` on every `<svg>` line icon. SVGs should use `stroke="currentColor"`, `fill="none"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- Brand logos are exempt — leave them as-is.

## Two-tone icons: coloring the light and dark layers

Some `icon-registry` icons are two-tone — a `currentColor`-driven layer plus a second "light" layer (some ship a hardcoded light-mode hex baked into the path itself, e.g. earth's `fill="#D0D2E0"`). That reads fine on a light background but renders as a wrong-toned blob the moment the icon sits on a dark surface — it needs an explicit color, not just inheriting `color`.

**Through the real `Icon` component (the normal case):** set its color props — `fillColor`/`strokeColor` for the primary layer, `secondaryFillColor`/`secondaryStrokeColor` for the light/secondary layer (see [components/Icon/instructions.md](https://design.cypress.io/agents/components/Icon/instructions.md)). These drive the design system's Tailwind plugin (`icon-light`/`icon-dark`/`icon-light-secondary`/`icon-dark-secondary` utility classes) — check the available color channels for a given glyph on the Icons page before assuming it has a secondary channel to set.

**Hand-inlining raw registry SVG markup** (e.g. building a standalone illustration render) bypasses that plugin, so the `icon-light`/`icon-dark` classes baked into the path need a manual CSS mapping instead of a component prop — see [ui-illustrations.md](https://design.cypress.io/agents/ui-illustrations.md) → "Make the icons actually render" for that pattern. Don't assume a two-tone icon "just works" on a dark surface in either path without checking its light/secondary layer first.
