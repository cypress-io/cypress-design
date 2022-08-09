---
to: components/<%= h.inflection.camelize(name, false) %>/react/package.json
---
{
  "name": "@cypress-design/react-<%= name.toLowerCase() %>",
  "version": "0.0.0",
  "files": [
    "*"
  ],
  "typings": "./dist/react/index.d.ts",
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
    "build:module": "rollup -c ./rollup.config.js",
    "build:types": "tsc --project ./tsconfig.build.json"
  },
  "dependencies": {
    "clsx": "*"
  },
  "license": "MIT"
}