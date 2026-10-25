---
to: components/<%= h.inflection.camelize(name, false) %>/react/index.ts
---
export { default } from './<%= h.inflection.camelize(name, false) %>'
export { <%= h.inflection.camelize(name, false) %> } from './<%= h.inflection.camelize(name, false) %>'
export type { <%= h.inflection.camelize(name, false) %>Props } from './<%= h.inflection.camelize(name, false) %>'
