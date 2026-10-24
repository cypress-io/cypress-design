import path from 'node:path'
import globals from 'globals'
import js from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import reactHooksRaw from 'eslint-plugin-react-hooks'
import astro from 'eslint-plugin-astro'
import { fixupPluginRules } from '@eslint/compat'
import tailwind from 'eslint-plugin-tailwindcss'
import cypressDesign from '@cypress-design/eslint-plugin'

const reactHooks = fixupPluginRules(reactHooksRaw)

const config = [
  js.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: [
      'icon-registry/**/*.js',
      'docs/docgen/*.cjs',
      'components/**/generate-icons.js',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    files: [
      'scripts/**/*',
      '**/rollup.config.{mjs,js}',
      '**/vite.config.ts',
      'components/*.vite.config.ts',
      'cypress.config.ts',
    ],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.node,
    },
  },
  {
    files: ['packages/eslint-plugin/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['packages/eslint-plugin/tests/**/*.js'],
    languageOptions: {
      globals: globals.mocha,
    },
  },
  {
    files: [
      '{packages,css,icon-registry}/**/*.{test,cy}.{ts,tsx}',
      '{packages,css,icon-registry}/**/testUtils.ts',
      'components/*/*.test.ts',
    ],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.node,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: { '@typescript-eslint': typescriptEslint },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: [
      '{packages,css,icon-registry}/**/*.{ts,tsx}',
      'components/*/constants/src/**/*.ts',
      'docs/src/**/*.ts',
    ],
    ignores: ['docs/src/**/*.cy.ts', '**/*.astro/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      globals: { ...globals.node, ...globals.browser },
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: { '@typescript-eslint': typescriptEslint },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },

  {
    files: [
      'components/*/react/**/*.{cy,rootStory,rootstory}.tsx',
      'components/*/react/**/_testUtils.tsx',
      'components/*/{assertions,a11y-assertions}.ts',
      'cypress/**/*.ts',
    ],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.mocha,
        ...globals.chai,
        expect: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
      },
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.react.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
      'no-only-tests': noOnlyTests,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...reactHooksRaw.configs.recommended.rules,
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-only-tests/no-only-tests': 'error',
    },
  },
  {
    files: [
      'components/*/react/**/*.{ts,tsx}',
      'docs/src/**/*.tsx',
      'test/react-app/src/**/*.{ts,tsx}',
    ],
    ignores: [
      'components/*/react/**/*.{cy,rootStory,rootstory}.tsx',
      'components/*/react/**/_testUtils.tsx',
    ],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.react.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...reactHooksRaw.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: [
      'components/*/vue/**/*.{ts,tsx,vue}',
      'components/vue-utils.ts',
      'docs/src/**/*.vue',
      'test/vue-app/src/**/*.{ts,vue}',
    ],
    ignores: [
      'components/*/vue/**/*.{cy,rootStory,rootstory}.tsx',
      'components/*/vue/**/_testUtils.tsx',
    ],
    languageOptions: {
      parser: vueParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.vue.json', './tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      vue,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },
  {
    files: [
      'components/*/vue/**/*.{cy,rootStory,rootstory}.tsx',
      'components/*/vue/**/_testUtils.tsx',
      'docs/src/**/*.cy.ts',
    ],
    languageOptions: {
      parser: vueParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.mocha,
        ...globals.chai,
        expect: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
      },
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.vue.json', './tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'no-only-tests': noOnlyTests,
      vue,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      'no-only-tests/no-only-tests': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // None of the enabled rules need type information, and these can't resolve
    // through their block's `project`: no listed tsconfig includes them, or (docs
    // .vue) the root tsconfig's program is first built by a non-Vue block, so it
    // never sees .vue files. Listing each area's own tsconfig instead builds one
    // TypeScript program per package and runs out of heap.
    files: [
      'components/*/*.test.ts',
      'components/*/constants/src/**/*.ts',
      'docs/src/**/*.{tsx,vue}',
      'test/*-app/src/**/*.{ts,tsx,vue}',
    ],
    languageOptions: {
      parserOptions: { project: null },
    },
  },
  {
    // Demo tiles are shown verbatim as copyable examples: logging is how they
    // show a handler fired, and an inline disable would appear in the example
    files: ['docs/src/demos/**/*.vue'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['docs/src/**/*.astro', 'docs/src/**/*.astro/*.ts'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { '@typescript-eslint': typescriptEslint },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },
  {
    files: [
      'components/*/react/**/*.{ts,tsx}',
      'components/*/vue/**/*.{ts,tsx,vue}',
      'docs/src/**/*.{ts,tsx,vue,astro}',
    ],
    plugins: { tailwindcss: tailwind },
    settings: {
      tailwindcss: {
        config: path.join(import.meta.dirname, 'tailwind.config.mjs'),
        callees: ['clsx', 'twMerge'],
        // Non-Tailwind hook classes: `chevron` and `icon` mark component
        // parts, `icon-light`/`icon-dark` mark the SVG paths tw-icon-plugin
        // colors, and the rest are styled in docs .astro <style> blocks or
        // docs/src/styles/markdown.scss
        whitelist: [
          'chevron',
          'icon',
          'icon-(light|dark)',
          'header-anchor',
          'markdown(-title)?',
          'component-framework',
          'demo-tile',
          'tile-(scroll|highlight|input|action)',
          'swatch',
          'sw-copied',
        ],
      },
    },
    rules: {
      // prettier-plugin-tailwindcss owns class order
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-arbitrary-value': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
    },
  },
  {
    // Tests pass made-up classes on purpose to check they reach the DOM
    files: [
      'components/*/{react,vue}/**/*.{cy,rootStory,rootstory}.tsx',
      'components/*/{react,vue}/**/_testUtils.tsx',
      'docs/src/**/*.cy.ts',
    ],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  {
    // No `files`, so it applies to every file the blocks above lint.
    // The ignores are known WindiCSS debt (see .agents/architecture.md).
    // Remove entries as they're migrated; don't add new ones.
    ignores: [
      'icon-registry/src/icons.ts',
      'components/Icon/react/index.ts',
      'components/Icon/vue/index.ts',
      'components/Menu/react/Menu.tsx',
      'components/Alert/constants/src/index.ts',
      'components/StatusIcon/constants/src/constants.ts',
    ],
    ...cypressDesign.configs.recommended,
  },
  {
    ignores: [
      '**/dist/**/*',
      '**/cache/**/*',
      'docs/.astro/**/*',
      '**/iconsData/**/*',
      '**/_TreeShakableIcons.ts',
      'icon-registry/src/icons.ts',
      'icon-registry/src/iconsList.ts',
    ],
  },
]

export default config
