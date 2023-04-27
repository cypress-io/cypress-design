---
to: components/<%= h.inflection.camelize(name, false) %>/constants/tsconfig.json
---
{
  "extends": "../../../tsconfig.json",
  "include": ["src/*.ts"],
  "compilerOptions": {
    "rootDir": "./src",
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist",
    "types": []
  }
}
