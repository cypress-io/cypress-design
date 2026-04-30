# Architecture guidance

## Frameworks supported

- [x] React — Used primarily by Cypress Cloud and Cypress Docs
- [x] Vue — Used primarily by Cypress.io and Cypress App
- [ ] Astro - Used by Cypress.io
- [ ] Web Components - Used by Claude Design

  - Packaged as pre-built ESM bundles and self-hosted on `design.cypress.io` (already deployed via Cloudflare).
  - URL convention: `https://design.cypress.io/<component>/<component>.js` (e.g., `https://design.cypress.io/button/button.js`), plus an aggregate `https://design.cypress.io/components.js` that registers all components.
  - No versioning in the URL — always serve latest. Breaking changes are communicated through the design system release notes.
  - All runtime dependencies (e.g., Lit) are inlined so consumers don't need a bundler or import map.
  - Styles are encapsulated via Shadow DOM — no Tailwind, React, or Vue required at runtime.
  - Theming is exposed through CSS custom properties so consumers can override tokens with a plain `<link rel="stylesheet">` (e.g., `https://design.cypress.io/theme.css`).
  - Drop-in usage: one `<script type="module" src="https://design.cypress.io/button/button.js">` tag, then use `<cy-button>` directly in HTML.
  - Cloudflare should serve these with CORS open (`Access-Control-Allow-Origin: *`) so any consumer can load them, and a modest `Cache-Control` (since URLs are unversioned) to balance freshness with performance.

## CSS guidance

The `@cypress-design/css` package, published as `@cypress-design/css/index.css`, ships the full color palette and design tokens as CSS custom properties.

### Tailwind over SASS, CSS Modules, or other CSS-in-JS solutions

Tailwind should be the default styling solution for any front-end code generated across all Cypress products (e.g. Cypress.io, Cypress Docs, Cypress Cloud, etc).

## Hosted styles

**TODO:** Stylesheets are hosted on `design.cypress.io` so build-free consumers (Claude Design, plain HTML pages, docs, email previews) can load them directly:

- `https://design.cypress.io/colors.css` — color tokens only (`--cy-*` custom properties).
- `https://design.cypress.io/tokens.css` — full design-system tokens (colors + spacing + typography + any future tokens).

Same hosting rules as the Web Components bundle: CORS open, no versioning in the URL, modest `Cache-Control`. This gives every Cypress product (and Claude Design) one consistent way to pull in the design system: a `<link>` for tokens and a `<script type="module">` for components — no build step required.
