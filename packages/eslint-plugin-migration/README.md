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

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
