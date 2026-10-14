# Cypress Design System

## Usage

### See the docs

The documentation website for this repo is published after each commit to the main branch.

You can find the last published version at https://design.cypress.io

### Install the CSS package

First install the css package, tailwind and autoprefixer

```bash
npm install --save-dev @cypress-design/css tailwindcss autoprefixer
```

Then configure your tailwind.config.cjs using the following template

```js
// tailwind.config.cjs
const { TailwindConfig } = require('@cypress-design/css/tailwind')

module.exports = TailwindConfig([
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
])
```

Check it out in the docs [here](https://design.cypress.io/colors)

### Install each component independently

Components need the css package to work properly. Make sure you have fully setup the `@cypress-design/css` before installing any component.

To make sure each component fix is never blocked by an ongoing refactoring, we decided to publish each component as its own package.

If you want to install the Cypress Button, run

```bash
npm install @cypress-design/vue-button
```

At Cypress, we prefer using Vuejs to build new apps.

Since some projects at Cypress already use React as a framework, we decided to still publish each component as a react version and a vue version.

If you want to install the Cypress Button, and your project still uses React, install the react version

```bash
npm install @cypress-design/react-button
```

See [the component ReadMe](./components/) for the list of available components and [the docs](https://cypress-design.vercel.app) for their usage

## Contributing

### Before you start

**Read the guidance documents first:**

- `/.agents/index.md` — Design, voice, and component guidance router
- `/.agents/architecture.md` — Constraints, technical debt, and architectural patterns

### Key Decision Patterns

**When to add a new component to `/components`:**

- Reusable UI element used across 2+ Cypress products
- Has a clear, documented API (props, variants, states)
- Needs both React and Vue implementations
- Example: Button, Modal, Tabs, Menu

**When to add to `/packages` instead:**

- Build utilities, code generators, or shared ESLint rules
- Used by components but not a component itself
- Example: color-constants, eslint-plugin

**When to add documentation:**

- Component demo: `/docs/src/demos/{Component}.vue` (live, interactive)
- Component page: Auto-routed from `components/` structure
- Foundation page: `/docs/src/pages/` (colors, icons, typography)
- Pattern page: `/docs/src/pages/patterns/` (multi-component examples)

### Set up Node and Yarn

You need Node.js 22.12 or later. The repo pins Yarn 4.9.1 in `package.json` (`packageManager`), and Corepack (bundled with Node) provides it:

```bash
corepack enable
yarn --version   # 4.9.1 inside the repo
```

If `yarn --version` prints 1.x (or you see `This project's package.json defines "packageManager": "yarn@4.9.1"`), a separately installed Yarn 1 is ahead of Corepack on your `PATH`. Remove it (`brew uninstall yarn` or `npm uninstall -g yarn`) and run `corepack enable` again. If `corepack enable` fails with a permissions error, run it with `sudo`.

Other repos keep working with Yarn 1. Corepack picks the version per repo: a repo with a `packageManager` field gets that version, and one without gets Corepack's global default. To make that default Yarn 1.22.22:

```bash
corepack install --global yarn@1.22.22
```

To avoid changing anything globally, keep your Yarn 1 install and prefix commands in this repo with `corepack` instead, for example `corepack yarn install`.

### Running the docs locally

```bash
yarn && yarn dev
```

This will:

- Install dependencies
- Start the Astro dev server (with icon and constant watchers) at `http://localhost:4321`
- Watch for changes to icon SVGs, component constants, and docs source (hot-reload)

### Create a new component

Using [hygen](https://hygen.io) we can scaffold all the tooling needed for a new components.

To start writing a new component, run this command:

```bash
yarn new:component
```

The system will ask you to provide the name of the component and generate all the files needed to start writing it.

In the new directory, you will find a React and a Vuejs version to complete. Each framework folder will also contain a stories file.

### Adding a new icon

Icons live in `/icon-registry/icons-static/` and follow the naming format: `<category>-<icon-name>_x<size>.svg` (e.g., `object-bug_x24.svg`).

From Figma, ensure width and height match the size suffix (e.g., `x24` icons should be 24×24px).

Once added, adjust the SVG attributes for the icon generation tool:

- Remove `width` and `height` attributes from the `<svg>` tag
- Replace fill/stroke colors with `currentColor`
- Add `class="icon-dark"` to dark paths (typically strokes)
- Add `class="icon-light"` to light paths (typically fills)
- Use `class="icon-*-secondary"` for secondary colors
- Combine classes for mixed fills/strokes: `class="icon-dark-stroke icon-light-fill"`

Verify your icon: `yarn dev`, navigate to the `icons` page, search for it, and adjust colors as needed.

When adding or updating an icon, bump the minor version in a Changeset for `@cypress-design/icon-registry`, `@cypress-design/react-icon`, and `@cypress-design/vue-icon` (use `yarn changeset`).

### Updating the component generator

When you use the `yarn new:component` command, the template used is called a generator. It could be useful to update it from time to time if the standards change.

First, create a scaffold for a component called ComponentName. The name matters because it will be used to generate the component templates and overwrite the old ones.

```bash
yarn new:component --name ComponentName
```

Then do all the changes you want to make to the component template.

Every time you use `ComponentName` in this template, it will be replaced in generated scaffolding.

Finally, to commit the changes to the template, run

```bash
# Remove the old template
rm -rf _templates/component/new
# start a new hygen-create session
npx hygen-create start component
# add all the files inside the component to the template
npx hygen-create add components/ComponentName/**/*
# remove the file automatically generated by hygen-create
npx hygen-create remove hygen-create.json
# Use ComponentName as a placeholder for the component name
npx hygen-create usename ComponentName
# generate the new template
npx hygen-create generate
# remove the temporary component
rm -rf components/ComponentName
# remove the metadata file
rm -f hygen-create.json
```

Finally, you should see the `prompt.js` file has been removed. Revert that change before committing.

### Running tests

```bash
yarn cy        # Open Cypress (interactive mode, watches for changes)
yarn cy:run    # CLI mode (headless)
yarn test      # Unit tests (vitest)
yarn eslint    # Linting
```

### Recent Changes: Astro Migration

The docs have been migrated from VitePress to Astro (simpler, more maintainable for a static site). Component implementations, build process, and publishing remain unchanged.

**To update docs when working on a component:**

1. Write or update `/components/{Component}/instructions.md` (consumer API docs)
2. Add/update demo in `/docs/src/demos/{Component}.vue` (live example)
3. Component page (`/docs/src/pages/components/[component].astro`) automatically picks it up

**Cleanup debt (not urgent):**

- Remove `/docs/.vitepress/` (old VitePress theme, now unused)
- Remove `/docs/docgen/` (old doc generation scripts)
- Remove `/scripts/copy-md.mjs` and `/scripts/clean-component-docs.mjs`

## Repository Structure

This is a Yarn monorepo (with Turbo) containing the Cypress Design System — reusable components, design tokens, and a documentation site.

### Core Directories

**`/components`** — Reusable UI components (the heart of the design system)

- Each component directory (e.g., `Button/`, `Modal/`, `Tabs/`) contains:
  - `/react` — React implementation (published as `@cypress-design/react-button`, etc.)
  - `/vue` — Vue implementation (published as `@cypress-design/vue-button`, etc.)
  - `/constants` — Shared types and enums (published as `@cypress-design/constants-button`, etc.)
  - `instructions.md` — Consumer API documentation (props, variants, states, accessibility)
  - `architecture.md` — Implementation details (for component maintainers)
- Each framework and constants folder is its own Yarn workspace, published separately to npm
- New components: `yarn new:component` (uses hygen scaffolding)

**`/css`** — Design tokens and color palette

- `@cypress-design/css` package: exports colors, spacing, typography as CSS custom properties
- `build:colors-css` script generates `docs/public/colors.css` and `docs/public/tokens.css`
- These hosted CSS files are available on `design.cypress.io` for build-free consumers (Claude Design, plain HTML, email)

**`/docs`** — Design system documentation website (Astro-based)

- `/src/pages` — Route structure (generates URLs):
  - `index.mdx`, `install.mdx`, `colors.mdx`, `icons.mdx` — Foundation pages
  - `/components/[component].astro` — Dynamic component pages (loads demo + docs automatically)
  - `/patterns` — Multi-component pattern examples (ButtonBar, Card, TestResultsList)
- `/src/demos` — Live, interactive demo components (Vue SFCs and Astro components)
  - Single source of truth for each component/pattern demo
  - Auto-rendered on the component page with framework tabs
- `/src/components` — Astro component building blocks (Sidebar, Outline, FrameworkTabs, etc.)
- `/src/lib/components.ts` — Metadata: available components, framework support, Figma links
- `/src/layouts` — Page layouts (BaseLayout handles sidebar, outline, global styles)
- `/src/styles` — Global CSS (fonts, markdown rendering, dark mode support)
- `/public` — Static assets (fonts, logos, SVG icons, hosted CSS files)

**`/icon-registry`** — Icon compilation and generation

- Watches `/icons-static` for SVG files
- Generates TypeScript/React/Vue icon components
- Used by `@cypress-design/react-icon` and `@cypress-design/vue-icon` packages

**`/packages`** — Shared tools and utilities (not UI components)

- `/color-constants` — Color token generation and TypeScript types
- `/eslint-plugin` — Custom ESLint rules for the design system
- `/rollup-plugin-tailwind-keep` — Build plugin to preserve Tailwind utilities

**`/cypress`** — Component testing suite (Cypress + component testing)

- `/e2e` — Component interaction tests, visual tests, accessibility tests

**`/test`** — Test applications (not published)

- `/react-app`, `/vue-app` — Sample projects for validating components in real setups

**`/_templates`** — Hygen scaffolding templates

- Used by `yarn new:component` to generate component boilerplate

### Configuration & Guidance

**`/.agents`** — Agent documentation (read before any work)

- `architecture.md` — Constraints, decision patterns, and gotchas for agents
- `index.md` — Design, voice, and component guidance router
- `skills/` — Task-specific guidance for common workflows

**`/.claude`** — Claude Code configuration

- `launch.json` — Dev server setup
- `settings.json` — Permissions and hooks
- `commands/` — Slash commands

**`/scripts`** — Build automation

- `watch-constants.mjs` — Watches component constants and rebuilds packages
- `watch-icons.mjs` — Watches icon SVGs and regenerates components
- `capitalize-icon.mjs` — Post-install icon naming normalization
