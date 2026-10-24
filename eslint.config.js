import path from 'node:path'
import globals from 'globals'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import chaiFriendly from 'eslint-plugin-chai-friendly'
import reactHooksRaw from 'eslint-plugin-react-hooks'
import astro from 'eslint-plugin-astro'
import { fixupPluginRules } from '@eslint/compat'
import tailwind from 'eslint-plugin-tailwindcss'

const reactHooks = fixupPluginRules(reactHooksRaw)

const componentTests = (framework) => [
  `components/*/${framework}/**/*.{cy,rootStory,rootstory}.tsx`,
  `components/*/${framework}/**/_testUtils.tsx`,
]

const nodeTooling = [
  'scripts/**/*',
  '**/rollup.config.{mjs,js}',
  '**/vite.config.ts',
  'components/*.vite.config.ts',
  'cypress.config.ts',
]

const testRules = {
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
}

const cypressTests = {
  extends: [chaiFriendly.configs.recommendedFlat],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.mocha,
      ...globals.chai,
      expect: 'readonly',
      cy: 'readonly',
      Cypress: 'readonly',
    },
  },
  plugins: { 'no-only-tests': noOnlyTests },
  rules: {
    ...testRules,
    'no-only-tests/no-only-tests': 'error',
  },
}

const reactFiles = [
  'components/*/react/**/*.{ts,tsx}',
  'docs/src/**/*.tsx',
  'test/react-app/src/**/*.{ts,tsx}',
]
const reactTestFiles = [
  ...componentTests('react'),
  'components/*/{assertions,a11y-assertions}.ts',
  'cypress/**/*.ts',
]

const vueFiles = [
  'components/*/vue/**/*.{ts,tsx,vue}',
  'components/vue-utils.ts',
  'docs/src/**/*.vue',
  'test/vue-app/src/**/*.{ts,vue}',
]
const vueTestFiles = [...componentTests('vue'), 'docs/src/**/*.cy.ts']

export default defineConfig([
  js.configs.recommended,
  astro.configs['flat/recommended'],
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
    files: ['packages/eslint-plugin/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [...nodeTooling, '**/*.mjs'],
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.node,
    },
  },
  {
    files: nodeTooling,
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: [
      '{packages,css,icon-registry}/**/*.{ts,tsx}',
      'components/*/constants/src/**/*.ts',
      'docs/src/**/*.ts',
    ],
    ignores: ['docs/src/**/*.cy.ts', '**/*.astro/*.ts'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      'no-console': 'error',
    },
  },
  {
    files: [
      '{packages,css,icon-registry}/**/*.{test,cy}.{ts,tsx}',
      '{packages,css,icon-registry}/**/testUtils.ts',
      'components/*/*.test.ts',
    ],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: testRules,
  },
  {
    files: [...reactFiles, ...reactTestFiles],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.react.json'],
      },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooksRaw.configs.recommended.rules,
  },
  {
    files: reactTestFiles,
    ...cypressTests,
  },
  {
    files: [...vueFiles, ...vueTestFiles],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parser: vueParser,
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.vue.json', './tsconfig.json'],
      },
    },
    plugins: { vue },
    rules: vue.configs.recommended.rules,
  },
  {
    files: vueTestFiles,
    ...cypressTests,
    rules: {
      ...cypressTests.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: vueFiles,
    ignores: componentTests('vue'),
    rules: {
      'no-console': 'error',
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
    // Rules only: extending tseslint.configs.recommended would also swap in its
    // parser, replacing astro-eslint-parser on .astro files
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      ...tseslint.plugin.configs.recommended.rules,
      'no-console': 'error',
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
      ...componentTests('react'),
      ...componentTests('vue'),
      'docs/src/**/*.cy.ts',
    ],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  globalIgnores([
    '**/dist/**/*',
    '**/cache/**/*',
    'docs/.astro/**/*',
    '**/iconsData/**/*',
    '**/_TreeShakableIcons.ts',
    'icon-registry/src/icons.ts',
    'icon-registry/src/iconsList.ts',
  ]),
])
