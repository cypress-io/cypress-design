---
to: components/<%= h.inflection.camelize(name, false) %>/constants/package.json
---
{
  "name": "@cypress-design/constants-<%= name.toLowerCase() %>",
  "private": true,
  "version": "0.3.0",
  "files": [
    "*"
  ],
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc --project ./tsconfig.json"
  },
  "devDependencies": {
    "@cypress-design/icon-registry": "*"
  },
  "license": "MIT"
}