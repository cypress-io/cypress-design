import 'cypress-axe'

beforeEach(() => {
  cy.injectAxe()
})

afterEach(() => {
  cy.checkA11y('body', {
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  })
})
