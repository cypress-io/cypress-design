# @cypress-design/eslint-plugin

a plugin to help migration to @cypress-design

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-cypress-design-eslint-plugin`:

```sh
npm install eslint-plugin-cypress-design-eslint-plugin --save-dev
```

## Usage

Add `cypress-design-eslint-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["cypress-design-eslint-plugin"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "cypress-design-eslint-plugin/rule-name": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                             | Description                                                 |
| :--------------------------------------------------------------- | :---------------------------------------------------------- |
| [deprecate-imports](docs/rules/deprecate-imports.md)             | list the imports you want to warn on and the docs to fix it |
| [deprecate-imports-again](docs/rules/deprecate-imports-again.md) | list the imports you want to warn on and the docs to fix it |

<!-- end auto-generated rules list -->
