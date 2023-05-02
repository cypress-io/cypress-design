---
to: components/<%= h.inflection.camelize(name, false) %>/vue/tsconfig.json
---
{
  "extends": "../../../tsconfig.vue.json",
	"compilerOptions": {
    "rootDir": "../../../"
  },
  "exclude": ["vite.config.ts"],
  "include": [
    "*.vue",
    "*.ts",
    "*.tsx",
    "../*.ts",
    "../../../cypress/support/*.ts"
  ]
}
