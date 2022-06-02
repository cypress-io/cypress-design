---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.rootstory.tsx
---
import <%= h.inflection.camelize(name, false) %> from './<%= h.inflection.camelize(name, false) %>.vue'

export default () => <<%= h.inflection.camelize(name, false) %> id="foo" />
