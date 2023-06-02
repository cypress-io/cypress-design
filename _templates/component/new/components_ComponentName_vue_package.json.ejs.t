---
to: components/<%= h.inflection.camelize(name, false) %>/vue/package.json
---
{
  "name": "@cypress-design/vue-<%= name.toLowerCase() %>",
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
    "build:module": "yarn vite build",
    "build:types": "yarn vue-tsc --project ./tsconfig.build.json"
  },
  "dependencies": {
    "@cypress-design/constants-<%= name.toLowerCase() %>": "*"
  },
  "devDependencies": {
    "@cypress-design/rollup-plugin-tailwind-keep": "*"
  },
  "license": "MIT"
}