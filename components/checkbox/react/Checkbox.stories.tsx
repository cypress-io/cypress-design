import * as React from 'react';
import { Story } from '@storybook/react';

import { Checkbox, type CheckboxProps } from './Checkbox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Checkbox',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <div className="p-4">
    <Checkbox modelValue={true} label="Checked" onChange={() => {}} />
    <br />
    <Checkbox modelValue={false} label="Unchecked" onChange={() => {}} />
    <br />
    <Checkbox
      modelValue={true}
      disabled
      label="Disabled & checked"
      onChange={() => {}}
    />
    <br />
    <Checkbox
      modelValue={false}
      disabled
      label="Disabled & unchecked"
      onChange={() => {}}
    />
  </div>
);

export const Primary: Story<CheckboxProps> = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
