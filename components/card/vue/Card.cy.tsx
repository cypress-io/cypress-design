/// <reference types="cypress" />
import { mount } from 'cypress/vue';

describe('<Card />', () => {
  it('renders', () => {
    mount(() => {
      return <div class="card">hello</div>;
    });
    cy.get('.card').should('have.css', 'box-shadow', 'none');
  });

  it('renders with shadow', () => {
    mount(() => {
      return <div class="card shadow-marketing-card">hello</div>;
    });
    cy.get('.card').should('have.css', 'box-shadow').and('not.eq', 'none');
  });
});
