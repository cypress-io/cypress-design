---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>.rootstory.tsx
---
import * as React from 'react'
import <%= h.inflection.camelize(name, false) %> from './<%= h.inflection.camelize(name, false) %>'

export default () => <<%= h.inflection.camelize(name, false) %> id="foo" />
