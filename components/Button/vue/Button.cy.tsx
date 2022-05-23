/// <reference types="cypress" />
import { mount } from 'cypress/vue';
import ButtonStory from './Button.rootstory';

describe('<Button />', {viewportHeight:600, viewportWidth:1000}, () => {
  it('renders variants disabled', () => {
    mount(() => Sample({ disabled: true }));
  });

  it('renders variants', () => {
    mount(Sample);
  });
});
