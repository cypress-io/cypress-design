import 'cypress-axe'

beforeEach(() => {
  cy.injectAxe()
})

afterEach(() => {
  cy.checkA11y(
    'body',
    {
      runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      rules: {
        'color-contrast': { enabled: false },
      },
    },
    // Define at the top of the spec file or just import it
    function terminalLog(violations) {
      // pluck specific keys to keep the table readable
      cy.task(
        'a11y-table',
        violations.map(({ id, impact, description, nodes }) => ({
          id,
          impact,
          description,
          nodes: nodes.length,
        })),
      )
    },
  )
})
