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
  overrides: [
    {
      files: ['packages/eslint-plugin/**/*.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['components/*/react/*.{ts,tsx}'],
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.react.json'],
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['components/*/react/*.{cy,rootStory,rootstory}.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.react.json'],
      },
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['components/*/vue/*.{ts,vue}'],
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.vue.json'],
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['test/vue-app/src/*.{ts,vue}'],
      plugins: ['@typescript-eslint', '@cypress-design'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: ['./test/vue-app/tsconfig.json'],
      },
      rules: {
        '@cypress-design/deprecate-imports': [
          'warn',
          [
            {
              name: 'Button',
              source: ['./invalid-path/*'],
              docs: 'https://design.cypress.io/components/vue/Button',
            },
          ],
        ],
        '@cypress-design/deprecate-imports-again': [
          'error',
          [
            {
              name: 'Lodash',
              source: 'lodash',
              docs: 'https://design.cypress.io/components/vue/Button',
            },
          ],
        ],
      },
    },
  ],
}
