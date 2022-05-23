---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>.stories.mdx
---
import { ArgsTable, Canvas, Meta, Story, Description } from '@storybook/addon-docs'
import { version } from "./package.json"
import changelog from "./CHANGELOG.md"
import <%= h.inflection.camelize(name, false) %>Story from './<%= h.inflection.camelize(name, false) %>.rootstory';

import { <%= h.inflection.camelize(name, false) %> } from './<%= h.inflection.camelize(name, false) %>'

<h1>Component Name<span className="text-lg font-normal"> - v{version}</span></h1>

<Meta title="Component Name" component={<%= h.inflection.camelize(name, false) %>} />

<Canvas withSource="none">
  <Story name="Component Name">
    <<%= h.inflection.camelize(name, false) %>Story />
  </Story>
</Canvas>

<ArgsTable />

<Description>
  {changelog.replace(/^# .+/, '## Changelog')}
</Description>
