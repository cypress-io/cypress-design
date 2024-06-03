// @ts-check
// eslint.config.js
import globals from 'globals'
import typescriptParser from '@typescript-eslint/parser'
import vue from 'vue-eslint-parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'

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
