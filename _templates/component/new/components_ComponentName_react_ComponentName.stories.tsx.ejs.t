---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>.stories.tsx
---
import * as React from 'react';
import { Story } from '@storybook/react';

import { <%= h.inflection.camelize(name, false) %>, type <%= h.inflection.camelize(name, false) %>Props } from './<%= h.inflection.camelize(name, false) %>';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: '<%= h.inflection.camelize(name, false) %>',
  component: <%= h.inflection.camelize(name, false) %>,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    id: { control: 'text' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <<%= h.inflection.camelize(name, false) %> {...args} />;

export const Sample: Story<<%= h.inflection.camelize(name, false) %>Props> = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = {};
