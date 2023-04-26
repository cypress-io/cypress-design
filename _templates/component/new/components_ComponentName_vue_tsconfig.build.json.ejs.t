---
to: components/<%= h.inflection.camelize(name, false) %>/vue/tsconfig.build.json
---
{
  "extends": "../../../tsconfig.vue.json",
  "include": ["./*.vue", "./index.ts"],
  "compilerOptions": {
    "outDir": "dist",
    "composite": false
  }
}
