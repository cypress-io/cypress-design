---
to: components/<%= h.inflection.camelize(name, false) %>/constants/package.json
---
{
  "name": "@cypress-design/constants-<%= name.toLowerCase() %>",
  "version": "0.0.1",
  "files": [
    "*"
  ],
  "main": "dist/index.umd.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.mjs",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "rollup -c ./rollup.config.mjs"
  },
  "license": "MIT"
}