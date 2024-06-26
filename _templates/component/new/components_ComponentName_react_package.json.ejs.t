---
to: components/<%= h.inflection.camelize(name, false) %>/react/package.json
---
{
  "name": "@cypress-design/react-<%= name.toLowerCase() %>",
  "version": "0.0.1",
  "files": [
    "*"
  ],
  "typings": "./dist/index.d.ts",
  "module": "./dist/index.es.mjs",
  "main": "./dist/index.umd.js",
  "exports": {
    ".": {
      "import": "./dist/index.es.mjs",
      "require": "./dist/index.umd.js"
    }
  },
  "scripts": {
    "build": "yarn build:module && yarn build:types",
    "build:module": "rollup -c ./rollup.config.mjs",
    "build:types": "tsc --project ./tsconfig.build.json"
  },
  "dependencies": {
    "clsx": "*"
  },
  "devDependencies": {
    "@cypress-design/constants-<%= name.toLowerCase() %>": "*",
    "@cypress-design/rollup-plugin-tailwind-keep": "*"
  },
  "license": "MIT"
}