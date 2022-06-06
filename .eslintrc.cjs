module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'no-only-tests'],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'no-only-tests/no-only-tests': 'error',
    'no-unused-vars': 'off',
  },
}
