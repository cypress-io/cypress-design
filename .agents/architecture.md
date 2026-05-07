# Architecture guidance

## Decision Patterns

**When to add a new component to `/components`:**

- Reusable UI element used across 2+ Cypress products
- Has clear, documented API (props, variants, states)
- Needs both React and Vue implementations
- Each component gets its own `react/`, `vue/`, and `constants/` workspace, published separately to npm

**When to add to `/packages` instead:**

- Build tools or utilities (not a UI element)
- Shared ESLint rules, Tailwind plugins, or code generators
- Anything used by components but not a component itself

**Where demos live:**

- `/docs/src/demos/` is the single source of truth for live examples
- Component page (`/docs/src/pages/components/[component].astro`) auto-renders it with framework tabs
- Each demo is a `.vue` SFC or `.astro` component

## Claude Code

**Read before any work:**

- `/.agents/architecture.md` — This file
- `/.agents/index.md` — Router for design / voice / content guidance (fetch specific pillars on demand)
- `/.agents/skills/` — Task-specific guidance for component work, PR reviews, etc.
- `/.agents/review-checklist.md` — Run before claiming any UI / visual / content task done

**Configuration:**

- `/.claude/launch.json` — Dev server setup
- `/.claude/settings.json` — Permissions and hooks
- `/.claude/commands/` — Bound slash commands

## Frameworks and Future Roadmap

**Supported:**

- [x] React — Cypress Cloud, Cypress Docs
- [x] Vue — Cypress.io, Cypress App

**Planned (not yet implemented):**

- [ ] Web Components — For Claude Design and build-free consumers
  - Pre-built ESM bundles, self-hosted on `design.cypress.io` via Cloudflare
  - URL pattern: `https://design.cypress.io/button/button.js` (no versioning; always latest)
  - Styles encapsulated via Shadow DOM; theming via CSS custom properties
  - Inlined dependencies (Lit, etc.) — zero external imports needed
  - Drop-in usage: `<script type="module" src="https://design.cypress.io/button/button.js"><cy-button>...</cy-button>`

## CSS and Token Strategy

The `@cypress-design/css` package exports design tokens as CSS custom properties, hosted on `design.cypress.io` for build-free consumers.

**Use Tailwind for all styling.** This design system is all-in on Tailwind utilities — no SASS, CSS Modules, or CSS-in-JS.

### Technical Debt: WindiCSS

**Do not write new WindiCSS code.** The codebase has remnants from a previous migration. The largest holdover is the `WindiColor` type in `icon-registry/src/icons.ts` — it leaks into every icon component prop definition (`@cypress-design/react-icon`, `@cypress-design/vue-icon`).

**Workaround:** Use static string bindings (e.g., `stroke-color="indigo-500"`) or type casts in calling code rather than propagating the type further.

**Cleanup debt:** Remove `WindiColor` type and all `windi` config references once the migration is complete.

## Publishing and Deployment

Components are published to npm as individual packages via Changesets (`.changeset/*.md` intent files).

**Local dev:**

- `yarn dev` — Watches icon SVGs, component constants, and Astro source (hot-reload)
- `yarn build:docs` — Builds component packages, generates design tokens CSS, builds Astro site
- Deployed to `design.cypress.io` via Vercel (main branch)

## Hosted Styles

Stylesheets are generated and hosted on `design.cypress.io` so build-free consumers (Claude Design, plain HTML pages, docs, email previews) can load them directly:

- `https://design.cypress.io/colors.css` — color tokens only (`--cy-*` custom properties).
- `https://design.cypress.io/tokens.css` — full design-system tokens (colors + spacing + typography + any future tokens).

Generation runs from `@cypress-design/css` (`build:colors-css`) and writes into `docs/public/` so Astro/Vercel serves the files at the URLs above. Same hosting rules as the Web Components bundle: CORS open, no versioning in the URL, modest `Cache-Control`. This gives every Cypress product (and Claude Design) one consistent way to pull in the design system: a `<link>` for tokens and a `<script type="module">` for components — no build step required.

## Astro Migration (This Branch)

**What changed:** Docs migrated from VitePress → Astro. VitePress was overly complex for a static site; Astro is simpler and more maintainable.

**What stayed the same:** Component implementations, build process, publishing, design tokens.

**Old paths to remove eventually:**

- `/docs/.vitepress/` — entire VitePress theme directory (unused)
- `/docs/docgen/` — old documentation generation scripts (Astro reads `.md` directly)
- `/scripts/copy-md.mjs`, `/scripts/clean-component-docs.mjs` — build helpers (no longer needed)

**New patterns:**

- Demo components live in `/docs/src/demos/` (single source of truth for live examples)
- Component page renders the demo + framework tabs + API docs
- Markdown pages in `/docs/src/pages/` route directly to URLs (Astro's file-based routing)
- Sidebar and outline auto-generated from page structure

**When adding component docs:**

1. Write `/components/{Component}/instructions.md` (consumer docs)
2. Add demo to `/docs/src/demos/{Component}.vue` (live example)
3. Component page (`/docs/src/pages/components/[component].astro`) automatically picks it up
