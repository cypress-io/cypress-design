---
to: components/<%= h.inflection.camelize(name, false) %>/react/tsconfig.json
---
{
  "extends": "../../../tsconfig.react.json",
  "include": ["*.tsx", "*.ts"]
}
