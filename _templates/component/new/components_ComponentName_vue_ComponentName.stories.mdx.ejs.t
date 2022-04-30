---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.stories.mdx
---
import { ArgsTable, Canvas, Meta, Story } from '@storybook/addon-docs'

import <%= h.inflection.camelize(name, false) %> from './<%= h.inflection.camelize(name, false) %>.vue'

# <%= h.inflection.camelize(name, false) %>

<Meta title="<%= h.inflection.camelize(name, false) %>" component={<%= h.inflection.camelize(name, false) %>} />

<Canvas>
  <Story name="<%= h.inflection.camelize(name, false) %>">
    {{
      template: `<<%= h.inflection.camelize(name, false) %> id="foo" />`,
      components: { <%= h.inflection.camelize(name, false) %> }
    }}
  </Story>
</Canvas>

<ArgsTable />
