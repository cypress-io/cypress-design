/// <reference types="cypress" />

import { mount } from 'cypress/vue';

import Spinner from './Spinner.vue';

describe('<Spinner />', () => {
  it('renders', () => {
    mount(() => 
      <Spinner />
    );
  });
});
