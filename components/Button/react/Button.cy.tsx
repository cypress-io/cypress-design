/// <reference types="cypress" />

import { mount } from 'cypress/react';
import { Sample } from './Button.stories';

describe('<Button />', {viewportHeight:600, viewportWidth:1000}, () => {
  it('renders variants disabled', () => {
    mount(Sample({ disabled: true }));
  });

  it('renders variants', () => {
    mount(Sample());
    // The disabled button does not respect AAA contrast rules
    cy.configureAxe({
      rules: [{
        id: "color-contrast",
        enabled: false,
      }]
    })
  });
});
