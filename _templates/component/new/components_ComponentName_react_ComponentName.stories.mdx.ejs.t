---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>.stories.mdx
---
import { ArgsTable, Canvas, Meta, Story } from '@storybook/addon-docs'
import { version } from "./package.json"

import { <%= h.inflection.camelize(name, false) %> } from './<%= h.inflection.camelize(name, false) %>'

<h1><%= h.inflection.camelize(name, false) %><span className="text-lg font-normal"> - v{version}</span></h1>

<Meta title="<%= h.inflection.camelize(name, false) %>" component={<%= h.inflection.camelize(name, false) %>} />

<Canvas>
  <Story name="<%= h.inflection.camelize(name, false) %>">
    <<%= h.inflection.camelize(name, false) %> id="foo" />
  </Story>
</Canvas>

<ArgsTable />
