# list the imports you want to warn on and the docs to fix it (`deprecate-imports`)

Cypress has decided to reuse as much as possible the same components. In each property, App, Cloud, Website, Docs, we created local versions of the components we needed. To replace the local components with the shared ones, we created a new rule that will warn you when you are importing a local component that has a shared version.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
import Button from '@frontend-shared/components/Button'
```

Examples of **correct** code for this rule:

```js
import Button from '@cypress-design/vue-button'
```

### Usage

```js
// .eslintrc.js

module.exports = {
  plugins: ['@typescript-eslint', '@cypress-design'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json'],
      },
    },
  },
  rules: {
    '@cypress-design/deprecate-imports': [
      // send a warning on all components that start withe the invalid path
      'warn',
      [
        {
          // the name of the deprecated component
          name: 'Button',
          // An array of globs (see minimatch) that the rule will use to match the import path
          // [NOTE] eslint uses the "resolver" so determine and match the file. If the file is not found,
          // the plugin will stay silent. Test your globs with https://www.npmjs.com/package/minimatch
          source: ['**/invalid-path/*'],
          // a link to the docs that explain how to fix the import
          docs: 'https://design.cypress.io/components/vue/Button',
        },
      ],
    ],
    // the second rule is a clone of the first one. It allows
    // to throw an error for some components and a warning for others
    // this is a workaround for a limitation of eslint
    // see https://github.com/eslint/eslint/issues/11089
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
}
```
