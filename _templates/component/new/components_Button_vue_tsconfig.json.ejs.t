---
to: components/<%= h.capitalize(name) %>/vue/tsconfig.json
---
{
  "extends": "../../../tsconfig.vue.json",
  "include": ["*.vue", "*.ts", "*.tsx"]
}
