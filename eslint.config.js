// @ts-check
// eslint.config.js
import globals from 'globals'
import typescriptParser from '@typescript-eslint/parser'
import vue from 'vue-eslint-parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import reactHooksRaw from 'eslint-plugin-react-hooks'
import { fixupPluginRules } from '@eslint/compat'

const reactHooks = fixupPluginRules(reactHooksRaw)

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  {
    files: ['scripts/**/*', '**/rollup.config.{mjs,js}'],
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
      globals: globals.node,
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
    files: ['components/*/react/*.{cy,rootStory,rootstory}.tsx'],
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
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['components/*/react/*.tsx'],
    ignores: ['components/*/react/*.{cy,rootStory,rootstory}.tsx'],
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
