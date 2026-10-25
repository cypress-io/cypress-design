# @cypress-design/eslint-plugin

ESLint rules that ship with the Cypress Design System. Install this plugin alongside the design-system packages, and the conventions that govern correct use come with them. You don't need to copy rules into each project by hand.

The plugin supports ESLint 9 [flat config](https://eslint.org/docs/latest/use/configure/configuration-files) (`eslint.config.js`).

## Installation

```sh
npm install --save-dev eslint @cypress-design/eslint-plugin
```

Or with Yarn:

```sh
yarn add --dev eslint @cypress-design/eslint-plugin
```

## Usage

### Recommended config

The `recommended` config turns on every rule that works without options (today that's `no-windicss`):

```js
// eslint.config.js
import cypressDesign from '@cypress-design/eslint-plugin'

export default [
  // ...your other configs
  cypressDesign.configs.recommended,
]
```

To scope it to some files, or to leave out files you haven't migrated yet, spread it into your own config object:

```js
// eslint.config.js
import cypressDesign from '@cypress-design/eslint-plugin'

export default [
  {
    files: ['src/**/*.{js,ts,tsx,vue}'],
    ignores: ['src/legacy/**'],
    ...cypressDesign.configs.recommended,
  },
]
```

To lint TypeScript or Vue files, set up `@typescript-eslint/parser` or `vue-eslint-parser` the way you normally would. The plugin doesn't configure a parser.

### Configure rules yourself

Register the plugin under the `@cypress-design` namespace, then turn on the rules you want:

```js
// eslint.config.js
import cypressDesign from '@cypress-design/eslint-plugin'

export default [
  {
    plugins: { '@cypress-design': cypressDesign },
    rules: {
      '@cypress-design/no-windicss': 'error',
      '@cypress-design/deprecate-imports': [
        'warn',
        [
          {
            name: 'Button',
            source: ['**/components/Button/*'],
            docs: 'https://design.cypress.io/components/button',
          },
        ],
      ],
    },
  },
]
```

The `deprecate-imports` rules resolve each import to a file path before matching it against `source`, so they need an import resolver in `settings`. See the [`deprecate-imports` docs](docs/rules/deprecate-imports.md) for an example.

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.

| Name                                                             | Description                                                           | 💼  |
| :--------------------------------------------------------------- | :-------------------------------------------------------------------- | :-- |
| [deprecate-imports](docs/rules/deprecate-imports.md)             | list the imports you want to warn on and the docs to fix it           |     |
| [deprecate-imports-again](docs/rules/deprecate-imports-again.md) | list the imports you want to warn on and the docs to fix it           |     |
| [no-windicss](docs/rules/no-windicss.md)                         | Disallow new WindiCSS imports and references to the `WindiColor` type | ✅  |

<!-- end auto-generated rules list -->
