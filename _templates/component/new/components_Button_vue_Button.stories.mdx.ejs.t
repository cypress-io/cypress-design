---
to: components/<%= h.capitalize(name) %>/vue/<%= h.capitalize(name) %>.stories.mdx
---
import { ArgsTable, Canvas, Meta, Story } from '@storybook/addon-docs'

import <%= h.capitalize(name) %> from './<%= h.capitalize(name) %>.vue'

# <%= h.capitalize(name) %>

<Meta title="<%= h.capitalize(name) %>" component={<%= h.capitalize(name) %>} />

<Canvas>
  <Story name="<%= h.capitalize(name) %>">
    {{
      template: `<<%= h.capitalize(name) %> id="foo" />`,
      components: { <%= h.capitalize(name) %> }
    }}
  </Story>
</Canvas>

<ArgsTable />
