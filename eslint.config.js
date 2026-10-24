import globals from 'globals'
import js from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import reactHooksRaw from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import vueA11y from 'eslint-plugin-vuejs-accessibility'
import { fixupPluginRules } from '@eslint/compat'

const reactHooks = fixupPluginRules(reactHooksRaw)

// The preset also sets `files: ['**/*.vue']` and its own vue-eslint-parser,
// which would override the parser setup below, so only its plugin and rules
// are applied to the Vue blocks.
const vueA11yRecommended = vueA11y.configs['flat/recommended'].find(
  (c) => c.rules,
)

const reactTestFiles = [
  'components/*/react/**/*.{cy,rootStory,rootstory}.tsx',
  'components/*/react/**/_testUtils.tsx',
]
const vueTestFiles = [
  'components/*/vue/**/*.{cy,rootStory,rootstory}.tsx',
  'components/*/vue/**/_testUtils.tsx',
]

const config = [
  js.configs.recommended,
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
    files: ['scripts/**/*', '**/rollup.config.{mjs,js}', '**/vite.config.ts'],
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
    files: [
      '{packages,css,icon-registry}/**/*.{test,cy}.{ts,tsx}',
      '{packages,css,icon-registry}/**/testUtils.ts',
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
    files: ['{packages,css,icon-registry}/**/*.{ts,tsx}'],
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
    files: reactTestFiles,
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
      ...jsxA11y.flatConfigs.recommended.plugins,
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
      'no-only-tests': noOnlyTests,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...reactHooksRaw.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-only-tests/no-only-tests': 'error',
    },
  },
  {
    files: ['components/*/react/**/*.tsx'],
    ignores: reactTestFiles,
    languageOptions: {
      parser: typescriptParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.react.json'],
      },
    },
    plugins: {
      ...jsxA11y.flatConfigs.recommended.plugins,
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...reactHooksRaw.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['components/*/vue/**/*.{ts,tsx,vue}'],
    ignores: vueTestFiles,
    processor: vue.processors['.vue'],
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
      ...vueA11yRecommended.plugins,
      '@typescript-eslint': typescriptEslint,
      vue,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      ...vueA11yRecommended.rules,
      'vue/comment-directive': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },
  {
    files: vueTestFiles,
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
    files: ['docs/src/**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: jsxA11y.flatConfigs.recommended.plugins,
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  {
    files: ['docs/src/**/*.vue'],
    processor: vue.processors['.vue'],
    languageOptions: {
      parser: vueParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      ...vueA11yRecommended.plugins,
      '@typescript-eslint': typescriptEslint,
      vue,
    },
    rules: {
      ...vueA11yRecommended.rules,
      'vue/comment-directive': 'error',
      // The core rule reads type-only parameters (e.g. in `defineEmits`) as
      // unused variables.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    // The rule kebab-cases component names before matching, so it reads the
    // design system's own `<Select>` component as a native `<select>`. Select
    // labels its trigger itself (`placeholder` / `triggerAriaLabel`).
    files: ['docs/src/demos/Select/**/*.vue'],
    rules: {
      'vuejs-accessibility/form-control-has-label': 'off',
    },
  },
  {
    ignores: [
      '**/dist/**/*',
      '**/cache/**/*',
      '**/iconsData/**/*',
      '**/_TreeShakableIcons.ts',
      'icon-registry/src/icons.ts',
      'icon-registry/src/iconsList.ts',
    ],
  },
]

export default config
