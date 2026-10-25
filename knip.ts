import type { KnipConfig } from 'knip'

// Component workspaces get `vue` from the root, so knip's built-in Vue
// compiler (enabled per workspace by a `vue` dependency) never runs on their
// SFCs and every import inside them goes unseen.
const scriptBlocks = /<script\b[^>]*>([\s\S]*?)<\/script>/g

const config: KnipConfig = {
  // `docs/public/` holds static files served as-is, including the generated
  // token stylesheets that `docs/.gitignore` hides from git.
  ignore: ['**/dist/**', 'docs/public/**'],
  // `@cypress-design/rollup-plugin-tailwind-keep` is imported from the shared
  // `components/*.rollup.config.mjs` and `components/vue.vite.config.ts`, which
  // belong to the root workspace. `@percy/cli` only runs as the Cypress action's
  // `command-prefix` in CI.
  ignoreDependencies: [
    '@cypress-design/rollup-plugin-tailwind-keep',
    '@percy/cli',
  ],
  // CI downloads the Vale binary; it isn't an npm package.
  ignoreBinaries: ['vale'],
  rules: {
    // Components export both a named and a default binding on purpose.
    duplicates: 'off',
  },
  compilers: {
    vue: (text: string) =>
      [...text.matchAll(scriptBlocks)].map(([, body]) => body).join('\n'),
  },
  workspaces: {
    '.': {
      entry: [
        'scripts/*.mjs',
        '_templates/**/*.cjs',
        'cypress/support/*.ts',
        'docs/src/**/*.cy.ts',
      ],
      astro: {
        config: ['docs/astro.config.mjs'],
        entry: ['docs/src/pages/**/*.{astro,mdx,md,ts}', 'docs/src/env.d.ts'],
      },
    },
    'components/*/react': {
      entry: ['**/*.cy.tsx'],
      rollup: ['rollup.config.mjs', 'rollup.dts.config.mjs'],
    },
    'components/*/vue': {
      entry: ['index.ts', '**/*.cy.tsx'],
    },
    'components/TestResult/vue': {
      entry: ['index.ts', '**/*.cy.tsx'],
      // The build bundles vue-statusicon, which imports icon-registry and
      // leaves it external, so the built dist imports it at runtime.
      ignoreDependencies: ['@cypress-design/icon-registry'],
    },
    css: {
      // Rollup's postcss plugin loads the root `postcss.config.mjs`.
      // `color-constants` is never imported, but it makes
      // `turbo run build --filter=@cypress-design/css` build it first, which
      // CI relies on before building icon-registry.
      ignoreDependencies: ['autoprefixer', '@cypress-design/color-constants'],
    },
    'packages/eslint-plugin': {
      // Rules are loaded at runtime with `requireindex`, and
      // `eslint-doc-generator` loads its rc file by name.
      entry: ['lib/rules/*.js', '.eslint-doc-generatorrc.js'],
      // `eslint-module-utils/resolve` falls back to the `node` resolver,
      // which it requires by name, when no `import/resolver` is configured.
      ignoreDependencies: ['eslint-import-resolver-node'],
    },
    'icon-registry': {
      entry: ['*.mjs', 'svgo-plugins/*.js'],
    },
  },
}

export default config
