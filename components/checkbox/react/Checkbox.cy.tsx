import * as React from 'react';
import { mount } from 'cypress/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders', () => {
    let isChecked = true;

    mount(
      <Checkbox
        label="Welcome guide settings"
        id="welcome-opt-out"
        modelValue={isChecked}
        onChange={() => (isChecked = !isChecked)}
        className="m-2 px-2 py-1 outline outline-gray-300"
      />
    );
  });
});
