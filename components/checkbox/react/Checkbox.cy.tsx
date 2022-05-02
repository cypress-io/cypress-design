/// <reference types="cypress" />

import React from 'react';
import { mount } from 'cypress/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders', () => {
    let isChecked = true;

    mount(
      <Checkbox
        label={<span>Welcome guide settings</span>}
        id="welcome-opt-out"
        modelValue={isChecked}
        onChange={() => (isChecked = !isChecked)}
      />
    );
  });
});
