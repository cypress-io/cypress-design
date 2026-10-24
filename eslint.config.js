import globals from 'globals'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import reactHooksRaw from 'eslint-plugin-react-hooks'
import { fixupPluginRules } from '@eslint/compat'

const reactHooks = fixupPluginRules(reactHooksRaw)

const componentTests = (framework) =>
  `components/*/${framework}/*.{cy,rootStory,rootstory}.tsx`

const testRules = {
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
}

const cypressTests = {
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

export default defineConfig([
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
    files: ['packages/eslint-plugin/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      'scripts/**/*',
      '**/rollup.config.{mjs,js}',
      '**/vite.config.ts',
      '**/*.mjs',
    ],
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.node,
    },
  },
  {
    files: ['scripts/**/*', '**/rollup.config.{mjs,js}', '**/vite.config.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: [
      '{packages,css,icon-registry}/**/*.{test,cy}.{ts,tsx}',
      '{packages,css,icon-registry}/**/testUtils.ts',
    ],
    rules: testRules,
  },
  {
    files: ['{packages,css,icon-registry}/**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
  {
    files: ['components/*/react/*.tsx'],
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
    files: [componentTests('react')],
    ...cypressTests,
  },
  {
    files: ['components/*/vue/*.{ts,tsx,vue}'],
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
    files: [componentTests('vue')],
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
    files: [
      '{packages,css,icon-registry}/**/*.{ts,tsx}',
      'components/*/vue/*.{ts,tsx,vue}',
    ],
    ignores: [componentTests('vue')],
    rules: {
      'no-console': 'error',
    },
  },
  globalIgnores([
    '**/dist/**/*',
    '**/cache/**/*',
    '**/iconsData/**/*',
    '**/_TreeShakableIcons.ts',
    'icon-registry/src/icons.ts',
    'icon-registry/src/iconsList.ts',
  ]),
])
