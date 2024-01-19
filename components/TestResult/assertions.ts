/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  beforeEach(() => {
    mountStory()
  })

  afterEach(() => {
    cy.percySnapshot()
  })

  describe('@container', () => {
    it('renders all sizes', () => {
      cy.viewport(320, 400)
      cy.log('@xs')

      cy.viewport(384, 400)
      cy.log('@sm')

      cy.viewport(448, 400)
      cy.log('@md')

      cy.viewport(512, 400)
      cy.log('@lg')

      cy.viewport(576, 400)
      cy.log('@xl')

      cy.viewport(672, 400)
      cy.log('@2xl')

      cy.viewport(768, 400)
      cy.log('@3xl')

      cy.viewport(896, 400)
      cy.log('@4xl')

      cy.viewport(1024, 400)
      cy.log('@5xl')
    })
  })

  describe('Properties', { viewportWidth: 1024, viewportHeight: 400 }, () => {
    it('status', () => {
      cy.get('[data-cy="test-result-icon"] svg').should('exist')
    })

    it('names', () => {
      cy.get('[data-cy="test-result-name-container-column"]').should('exist')
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
