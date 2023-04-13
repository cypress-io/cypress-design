---
to: components/<%= h.inflection.camelize(name, false) %>/react/tsconfig.json
---
{
  "extends": "../../../tsconfig.react.json",
	"compilerOptions": {
    "rootDir": "../"
  },
  "include": ["*.tsx", "*.ts", "../*.ts", "../../../cypress/support/*.ts"]
}
