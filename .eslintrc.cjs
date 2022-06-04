module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'no-only-tests'],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'no-only-tests/no-only-tests': 'error',
    'no-unused-vars': 'off',
  },
}
