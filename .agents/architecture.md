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
- Tile-based pages (every component with a demo except Favicon, which renders nothing visible) use `/docs/src/demos/<Name>/` instead: `tiles.ts` lists the ladder in page order, `vue/<Tile>.vue` and `react/<Tile>.tsx` hold one self-contained example each (the file is shown verbatim as the tile's code), and `AllStates.{vue,astro,tsx}` is the all-states gallery shown under the page title, above the framework tabs. Missing React tiles render a placeholder and are listed in `/docs/src/demos/MISSING.md`.
- Each tile's code block is editable in place (a transparent textarea over the Shiki-highlighted code) with a Copy button, and a Reset button once edited. Edits re-highlight and re-run the tile in the browser (`/docs/src/lib/tile-editor.ts`); imports resolve through `/docs/src/lib/tile-modules.ts`, so add new component packages there. Styling in edited tiles is limited to Tailwind classes the site already generates (build-time CSS); the preview says so once a tile is edited.
- New demo tiles reuse the item data, labels, and placeholders from the component's existing demo (its `AllStates.vue` or the single-demo file). Don't invent new sample content; only write new data when no existing example covers that feature.

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

**Class order and token use are flagged by tooling, not yet enforced.** Nothing here fails CI: the ESLint rules are warnings, and CI doesn't run `prettier --check`.

- Prettier (`prettier-plugin-tailwindcss`, configured in `.prettierrc.json`) sorts classes in `class`/`className` attributes, `clsx()` calls, and `@apply`. The pre-commit hook runs it on staged files; otherwise run `yarn prettier --write`. Don't hand-order classes. `twMerge()` arguments are left unsorted on purpose: tailwind-merge keeps the last of two conflicting classes, so their order is meaningful.
- ESLint (`eslint-plugin-tailwindcss`, configured in `eslint.config.js`) warns on arbitrary values (`text-[#123456]`, `px-[16px]`) and on classes that aren't in the Tailwind config. Reach for a design token first. A legitimate non-Tailwind hook class goes in the `whitelist` setting there, not an inline disable. A class built at runtime (`` `grid-cols-${n}` ``) belongs in script next to its `<tw-include>` comment, where the rule doesn't read it.
- Gaps: neither tool reads `.astro` files yet. The ESLint rules only see class attributes and `clsx()`/`twMerge()` arguments in files directly under `components/*/{react,vue}/` and in `docs/src/`, so class strings in `components/*/constants` objects and in component subfolders (such as `components/Icon/*/animated/`) aren't checked.

### Technical Debt: WindiCSS

**Do not write new WindiCSS code.** The codebase has remnants from a previous migration. The largest holdover is the `WindiColor` type in `icon-registry/src/icons.ts` — it leaks into every icon component prop definition (`@cypress-design/react-icon`, `@cypress-design/vue-icon`).

**Workaround:** Use static string bindings (e.g., `stroke-color="indigo-500"`) or type casts in calling code rather than propagating the type further.

**Cleanup debt:** Remove `WindiColor` type and all `windi` config references once the migration is complete.

## Publishing and Deployment

Components are published to npm as individual packages via Changesets (`.changeset/*.md` intent files).

**Local dev:**

- Yarn 4.9.1 comes from Corepack (`packageManager` in `package.json`). Run `corepack enable` before any `yarn` command. If `yarn --version` prints 1.x, or a command fails with `This project's package.json defines "packageManager": "yarn@4.9.1"`, a global Yarn 1 is shadowing Corepack. Use `corepack yarn <command>`, or remove the global Yarn 1 (`brew uninstall yarn` / `npm uninstall -g yarn`) and run `corepack enable` again. Repos without a `packageManager` field still get Yarn 1 through Corepack's global default (`corepack install --global yarn@1.22.22`). See the README's “Set up Node and Yarn”.
- `yarn dev` — Watches icon SVGs, component constants, and Astro source (hot-reload)
- `yarn build:docs` — Builds component packages, generates design tokens CSS, builds Astro site
- Deployed to `design.cypress.io` via Vercel (main branch)

### Internal dependency ranges

An `@cypress-design/*` package in a published package's `dependencies` is
declared as `workspace:^<its current version>`, e.g.
`"@cypress-design/vue-icon": "workspace:^3.3.2"`. devDependencies are bundled
into `dist/`, so they (and the private root and `test/*` apps) stay `"*"`.

Changesets republishes a dependent only when a dependency's release falls
outside the dependent's range. With a real `^` range, a **major** of a
dependency bumps every dependent (a `patch`) and rewrites its range in the
version PR; minor and patch releases stay in range and leave dependents alone.
`*` is never out of range, so a dependent declared with `*` would stay on the
old major on npm.
`scripts/changesets-workspace-ranges.test.mjs` runs the real release plan
against a fixture with the repo's `.changeset/config.json` to hold Changesets
to this.

Because Changesets rewrites those ranges, `yarn.lock` changes in every version
PR. `changesets/action` runs `yarn version-packages` (`changeset version`, then
`yarn install --mode=update-lockfile`) so the version PR still passes
`yarn install --immutable` — the failure behind
[#722](https://github.com/cypress-io/cypress-design/pull/722). Publishing runs
`yarn release`: `scripts/set-version.mjs` resolves each `workspace:` range to
the plain semver range (and external `*` deps to `^<latest on npm>`), then
`changeset publish`.

**`node scripts/check-internal-deps.mjs`** (PR CI, `test.yml`) fails when a
published package:

- declares an `@cypress-design/*` package in `dependencies` as anything but a
  `workspace:^<version>` range that includes the dependency's current version
  (peerDependencies keep plain ranges: `set-version.mjs` only resolves
  `workspace:` in `dependencies`);
- imports an `@cypress-design/*` package from its built `dist/*.mjs` (read with
  `es-module-lexer`) without listing it in `dependencies` or
  `peerDependencies`. devDependencies are bundled unless the build marks them
  external, and consumers never install devDependencies. It reads `dist/`
  rather than the build configs, so it needs the packages built first
  (`yarn build:components`).

### Gotcha: editing a component's source does not change what consumers see

Every component package's `exports` (`package.json`) point at `./dist/*`, a
rollup bundle — not the `.tsx`/`.ts` source directly. The docs site, a
linked/workspace consumer in another repo, and any other consumer all import
that built `dist/` output. If `yarn dev`'s watcher isn't running (or isn't
covering that package), editing source has **zero visible effect** anywhere
until the package is rebuilt — this looks exactly like "the fix didn't work"
when the real fix was never built. Confirm which case you're in by comparing
mtimes: `stat -f "%Sm %N" components/<Component>/react/dist/*.js
components/<Component>/react/*.tsx` — if `dist/` is older than your edit, it
hasn't been rebuilt yet.

To rebuild one package: `yarn workspace @cypress-design/react-<component>
run build:module`. If that fails with `command not found: rollup` (seen in
sandboxed/non-interactive shells where `yarn run` doesn't prepend
`node_modules/.bin` to `PATH`), invoke rollup directly instead: from the
package's `react/` dir, run
`~/Sites/cypress-design/node_modules/.bin/rollup -c ./rollup.config.mjs`
(the binary is hoisted to the repo root regardless of which package you're
building). Re-check the `dist/` mtime to confirm before telling anyone the
change is live.

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
2. Add tiles under `/docs/src/demos/{Component}/`: `tiles.ts` (ladder order), one file per tile in `vue/` and `react/` (only for frameworks the component ships), and optionally `AllStates.{vue,astro,tsx}` for the gallery. Reuse the component's existing demo data.
3. Register each new package in `/docs/src/lib/tile-modules.ts`, or editing its tiles fails with "The editor can't import …"
4. Component page (`/docs/src/pages/components/[component].astro`) picks up the tiles automatically. A component with only `/docs/src/demos/{Component}.vue` keeps the older single-demo layout.
