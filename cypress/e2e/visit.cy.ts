describe('test project', () => {
  afterEach(function () {
    if (this?.currentTest?.state === 'failed') {
      // Add more context about the failure
      const testState = {
        title: this?.currentTest?.title,
        fullTitle: this?.currentTest?.fullTitle(),
        file: this?.currentTest?.file,
        // duration: this?.currentTest?.duration,
        state: this?.currentTest?.state,
        type: this?.currentTest?.type,
        // retries: this?.currentTest?.retries,
        error: this?.currentTest?.err?.message,
        stack: this?.currentTest?.err?.stack,
        // timestamp: new Date().toISOString(),
        // browser: Cypress.browser.name,
        // os: Cypress.platform,
        body: this?.currentTest?.body,
        // viewportWidth: Cypress.config().viewportWidth,
        // viewportHeight: Cypress.config().viewportHeight,
        // parentTitle: this?.currentTest?.parent?.title,
        // grandparentTitle: this?.currentTest?.parent?.parent?.title,
        // testSuite: this?.currentTest?.parent?.parent?.title
        //   ? `${this?.currentTest?.parent?.parent?.title} > ${this?.currentTest?.parent?.title}`
        //   : this?.currentTest?.parent?.title,
      }
      cy.task('speculate', testState)
    }
  })

  it('Loads the headline', () => {
    cy.visit('/')
    cy.get('#cypress-desiegn-system').should('be.visible')
    cy.percySnapshot()
  })
})
