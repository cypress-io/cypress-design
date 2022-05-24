---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>.cy.tsx
---
/// <reference types="cypress" />

import * as React from 'react';
import { mount } from 'cypress/react';
import <%= h.inflection.camelize(name, false) %>Story from './<%= h.inflection.camelize(name, false) %>.rootstory';

describe('<%= h.inflection.camelize(name, false) %>', () => {
  it('renders', () => {
    mount(<<%= h.inflection.camelize(name, false) %>Story />);
  });
});
