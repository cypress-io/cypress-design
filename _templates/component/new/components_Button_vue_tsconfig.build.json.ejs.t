---
to: components/<%= h.capitalize(name) %>/vue/tsconfig.build.json
---
{
  "extends": "../../../tsconfig.vue.json",
  "include": ["./*.vue", "./index.ts"],
  "compilerOptions": {
    "outDir": "dist",
  }
}
