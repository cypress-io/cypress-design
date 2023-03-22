---
to: components/<%= h.inflection.camelize(name, false) %>/vue/tsconfig.json
---
{
  "extends": "../../../tsconfig.vue.json",
	"compilerOptions": {
    "rootDir": "../"
  },
  "include": [
    "*.vue",
    "*.ts",
    "*.tsx",
    "../*.ts",
    "../../../cypress/support/*.ts"
  ]
}
