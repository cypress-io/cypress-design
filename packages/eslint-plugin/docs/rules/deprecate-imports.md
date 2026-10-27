# List the imports you want to warn on and the docs to fix it (`@cypress-design/deprecate-imports`)

❌ This rule is deprecated.

<!-- end auto-generated rule header -->

> [!WARNING]
> This rule and its duplicate, [`deprecate-imports-again`](deprecate-imports-again.md), are deprecated and will be removed in a future release. ESLint's built-in [`no-restricted-imports`](https://eslint.org/docs/latest/rules/no-restricted-imports) rule covers the same cases without an import resolver. See [Migrating to `no-restricted-imports`](#migrating-to-no-restricted-imports).

Cypress has decided to reuse as much as possible the same components. In each property, App, Cloud, Website, Docs, we created local versions of the components we needed. To replace the local components with the shared ones, we created a new rule that will warn you when you are importing a local component that has a shared version.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import Button from '@frontend-shared/components/Button'
```

Examples of **correct** code for this rule:

```js
import Button from '@cypress-design/vue-button'
```

### Usage

The rule resolves each import to a file before matching it, so your project needs the resolver its `import/resolver` settings name. For the TypeScript resolver used below:

```sh
npm install --save-dev eslint-import-resolver-typescript
```

Without `import/resolver` settings, the rule falls back to `eslint-import-resolver-node`, which you also need to install yourself. If the resolver is missing, the rule reports a `Resolve error` instead of your deprecated imports.

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

## Migrating to `no-restricted-imports`

Each `deprecate-imports` entry becomes a `no-restricted-imports` entry, and the `docs` link moves into its `message`:

```js
// eslint.config.js
export default [
  {
    files: ['src/**/*.{js,ts,tsx,vue}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          paths: [
            // A whole package or module path.
            {
              name: 'lodash',
              message: 'Use native array methods instead.',
            },
            // Specific named or default imports from a module, which is
            // what the `specifiers` option did. This also catches imports
            // through a barrel file.
            {
              name: '@frontend/design-system',
              importNames: ['Button', 'Alert'],
              message:
                'Use @cypress-design/react-button or @cypress-design/react-alert instead: https://design.cypress.io/components/button',
            },
          ],
          // Glob-style matching, which is what `source` did.
          patterns: [
            {
              group: ['**/components/Button', '**/components/Button/*'],
              message:
                'Use @cypress-design/vue-button instead: https://design.cypress.io/components/button',
            },
          ],
        },
      ],
    },
  },
]
```

A few differences to keep in mind:

- **It matches the import string, not the resolved file.** `deprecate-imports` resolved each import to a file path first. `no-restricted-imports` matches what's written in the `import` statement, so write `group` patterns that cover the aliases and relative paths your code actually uses. In exchange, you no longer need `eslint-import-resolver-typescript` or `import/resolver` settings for this.
- **Named imports work through barrel files.** Because nothing gets resolved, `importNames` catches `import { Button } from '@frontend/design-system'` even when that module re-exports from an index file.
- **One rule, one severity.** `deprecate-imports-again` existed so you could have one `warn` list and one `error` list. To keep that split, put the second list in [`@typescript-eslint/no-restricted-imports`](https://typescript-eslint.io/rules/no-restricted-imports/), which takes the same options.

## Options

<!-- begin auto-generated rule options list -->

| Name     | Description                                                    | Type   |
| :------- | :------------------------------------------------------------- | :----- |
| `docs`   | URL to the documentation                                       | String |
| `name`   | Name of the deprecated import                                  | String |
| `source` | RegExp or glob describing a way to match the deprecated import |        |

<!-- end auto-generated rule options list -->
