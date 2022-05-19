// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import 'virtual:windi.css';
import 'cypress-axe';

beforeEach(() => {
  cy.injectAxe();
});

afterEach(() => {
  cy.configureAxe({
    rules: [
      {
        id: 'html-has-lang',
        enabled: false,
      },
      {
        id: 'landmark-one-main',
        enabled: false,
      },
      {
        id: 'page-has-heading-one',
        enabled: false,
      },
      {
        id: 'region',
        enabled: false,
      },
    ],
  });
  cy.checkA11y();
});
