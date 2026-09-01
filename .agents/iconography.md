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

## Two-tone icons carry hardcoded light-mode fills

Some `icon-registry` SVGs are two-tone: a `currentColor` layer plus a separate light layer with a **hardcoded light-mode hex fill baked into the path** (e.g. earth ships `fill="#D0D2E0"`). That's invisible on a light background but renders as a wrong-toned light-gray blob the moment the icon sits on a dark surface — the icon needs an explicit override, not just a `color` change.

Two class conventions exist on these paths and both need handling:

- Separate paths: `class="icon-light"` / `class="icon-dark"`
- Combined single-path icons: `class="icon-light-fill icon-dark-stroke"` (e.g. the lightning bolt)

Working pattern: set `color` on the `<svg>` for the dark/`currentColor` layer, and override the light layer via a CSS custom property so callers can opt in per-context —

```css
svg .icon-light,
svg .icon-light-fill {
  fill: var(--il, transparent);
}
```

— then pass the sampled fill (or `transparent` to suppress it) as `--il` wherever the icon sits on a dark background. Don't assume a two-tone icon "just works" on a dark surface without checking its light layer first.
