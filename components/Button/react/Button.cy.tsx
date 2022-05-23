/// <reference types="cypress" />

import { mount } from 'cypress/react';
import ButtonStory from './Button.rootstory';

describe('<Button />', {viewportHeight:600, viewportWidth:1000}, () => {
  it('renders variants disabled', () => {
    mount(ButtonStory({ disabled: true }));
  });

  it('renders variants', () => {
    mount(ButtonStory());
  });
});
