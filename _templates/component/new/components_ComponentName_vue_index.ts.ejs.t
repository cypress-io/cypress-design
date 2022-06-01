---
to: components/<%= h.inflection.camelize(name, false) %>/vue/index.ts
---
export { default } from './<%= h.inflection.transform(name, ['underscore','dasherize']) %>.vue'
