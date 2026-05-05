# Architecture guidance

## Design System Documentation

The documentation for all components, patterns, and foundations of the Design System is generated using Astro (previously VitePress) and is hosted on `design.cypress.io`.

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

### Tailwind CSS

Tailwind is the CSS framework for this design system and for all Cypress front-end products (Cypress.io, Cypress Docs, Cypress Cloud, Cypress App, etc). Use Tailwind utility classes for all styling — do not reach for SASS, CSS Modules, or CSS-in-JS.

This repo documents Tailwind usage as it applies to the Cypress design system: which classes are sanctioned, which color tokens map to which utilities, and how components compose utilities. When in doubt, write Tailwind.

### WindiCSS — in progress, do not add

**STOP: Do not write new WindiCSS code or import WindiCSS-specific APIs.** The codebase previously used WindiCSS and still has remnants. Every new line of Windi is more debt to clean up later.

Outstanding cleanup items:

- [ ] Replace the `WindiColor` type in `icon-registry/src/icons.ts` with `string`, and remove all `WindiColor` re-exports from `@cypress-design/vue-icon` and `@cypress-design/react-icon`. This is the largest remaining Windi holdover — it leaks into every icon component prop definition.
- [ ] Audit remaining `windi` references in config files and remove them once confirmed unused.

Until `WindiColor` is removed, work around it without importing the type: prefer static string prop bindings (e.g. `stroke-color="indigo-500"`) so the literal is checked directly against the union, or use a type cast in the calling code rather than propagating the type further.

## Hosted styles

Stylesheets are generated and hosted on `design.cypress.io` so build-free consumers (Claude Design, plain HTML pages, docs, email previews) can load them directly:

- `https://design.cypress.io/colors.css` — color tokens only (`--cy-*` custom properties).
- `https://design.cypress.io/tokens.css` — full design-system tokens (colors + spacing + typography + any future tokens).

Generation runs from `@cypress-design/css` (`build:colors-css`) and writes into `docs/public/` so VitePress/Vercel serves the files at the URLs above. Same hosting rules as the Web Components bundle: CORS open, no versioning in the URL, modest `Cache-Control`. This gives every Cypress product (and Claude Design) one consistent way to pull in the design system: a `<link>` for tokens and a `<script type="module">` for components — no build step required.
