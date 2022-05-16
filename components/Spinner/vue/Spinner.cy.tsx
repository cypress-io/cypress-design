/// <reference types="cypress" />

import Spinner from './Spinner.vue';

describe('<Spinner />', () => {
  it('renders', () => {
    cy.mount(
      <Spinner label="Welcome guide settings" id="welcome-opt-out" />
    );
  });
});
