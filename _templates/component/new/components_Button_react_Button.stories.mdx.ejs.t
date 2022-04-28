---
to: components/<%= h.capitalize(name) %>/react/<%= h.capitalize(name) %>.stories.mdx
---
import { ArgsTable, Canvas, Meta, Story } from '@storybook/addon-docs'

import { <%= h.capitalize(name) %> } from './<%= h.capitalize(name) %>'

# <%= h.capitalize(name) %>

<Meta title="<%= h.capitalize(name) %>" component={<%= h.capitalize(name) %>} />

<Canvas>
  <Story name="<%= h.capitalize(name) %>">
    <<%= h.capitalize(name) %> id="foo" />
  </Story>
</Canvas>

<ArgsTable />
