import React from 'react';
import { mount } from 'cypress/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('has checked state', () => {
    mount(<Checkbox modelValue={true} label="Foo" onChange={() => {}} />);
    cy.getCy('cy-checkbox').get('label');
  });
});
