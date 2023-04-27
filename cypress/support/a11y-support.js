import 'cypress-axe'
beforeEach(() => {
  cy.injectAxe()
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
  })
})
afterEach(() => {
  cy.checkA11y(undefined, {
    runOnly: {
      type: 'tag',
      values: ['wcag21aa'],
    },
  })
})
