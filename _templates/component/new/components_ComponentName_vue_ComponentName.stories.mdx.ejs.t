---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.stories.mdx
---
import { ArgsTable, Canvas, Meta, Story, Description } from '@storybook/addon-docs'
import { version } from "./package.json"
import changelog from "./CHANGELOG.md?raw"

import <%= h.inflection.camelize(name, false) %> from './<%= h.inflection.camelize(name, false) %>.vue'

import <%= h.inflection.camelize(name, false) %>Story from './<%= h.inflection.camelize(name, false) %>.rootstory'

<h1><%= h.inflection.camelize(name, false) %><span className="text-lg font-normal"> - v{version}</span></h1>

<Meta title="<%= h.inflection.camelize(name, false) %>" component={<%= h.inflection.camelize(name, false) %>} parameters={{
    design: {
      type: "figma",
      url: null,
    }
  }}  />

<Canvas withSource="none">
  <Story name="<%= h.inflection.camelize(name, false) %>">
    {<%= h.inflection.camelize(name, false) %>Story()}
  </Story>
</Canvas>

<ArgsTable />

<Description>
  {changelog.replace(/^# .+/, '## Changelog')}
</Description>

