---
to: components/<%= h.capitalize(name) %>/react/tsconfig.build.json
---
{
  "extends": "../../../tsconfig.react.build.json",
  "include": ["./<%= h.capitalize(name) %>.tsx", "./index.ts"],
  "compilerOptions": {
    "outDir": "dist",
  }
}
