// eslint.config.js
import typescript from '@typescript-eslint/parser'
import vue from 'vue-eslint-parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'

const config = [
  {
    languageOptions: {
      parser: vue,
      extraFileExtensions: ['.vue'],
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: [typescriptPlugin, noOnlyTests],
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'no-only-tests/no-only-tests': 'error',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['scripts/**/*'],
    languageOptions: {
      parser: typescript,
    },
    env: {
      node: true,
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      parser: typescript,
    },
  },
  {
    files: ['packages/eslint-plugin/**/*.js'],
    env: {
      node: true,
    },
  },
  // ... rest of your overrides
]

export default config
