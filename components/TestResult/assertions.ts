/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  beforeEach(() => {
    mountStory()
  })

  afterEach(() => {
    cy.percySnapshot()
  })

  describe('Container', () => {
    it('@xs', () => {
      cy.viewport(320, 400)
    })

    it('@sm', () => {
      cy.viewport(384, 400)
    })

    it('@md', () => {
      cy.viewport(448, 400)
    })

    it('@lg', () => {
      cy.viewport(512, 400)
    })

    it('@xl', () => {
      cy.viewport(576, 400)
    })
  })

  describe('Properties', () => {
    it('status', () => {
      cy.get('[data-cy="test-result-icon"] svg').should('exist')
    })

    it('names', () => {
      cy.get('[data-cy="test-result-name"]').should('exist')
    })

    it('added', () => {
      cy.get('[data-cy="test-result-added"]').should('exist')
    })

    it('modified', () => {
      cy.get('[data-cy="test-result-modified"]').should('exist')
    })

    it('flaky', () => {
      cy.get('[data-cy="test-result-flaky"]').should('exist')
    })
  })
}
