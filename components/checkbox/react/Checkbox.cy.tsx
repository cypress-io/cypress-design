/// <reference types="cypress" />

import React from 'react';
import { mount } from 'cypress/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it.skip('renders', () => {
    let isChecked = true;

    mount(
      <Checkbox
        label="Welcome guide settings"
        id="welcome-opt-out"
        modelValue={isChecked}
        onChange={() => (isChecked = !isChecked)}
      />
    );
  });
});
