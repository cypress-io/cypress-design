/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  beforeEach(() => {
    mountStory()
  })

  afterEach(() => {
    cy.percySnapshot()
  })

  describe('@container', { viewportWidth: 1024, viewportHeight: 400 }, () => {
    it('renders all sizes', () => {
      cy.viewport(320, 400).log('@xs')

      cy.viewport(384, 400).log('@sm')

      cy.viewport(448, 400).log('@md')

      cy.viewport(512, 400).log('@lg')

      cy.viewport(576, 400).log('@xl')

      cy.viewport(672, 400).log('@2xl')

      cy.viewport(768, 400).log('@3xl')

      cy.viewport(896, 400).log('@4xl')

      cy.viewport(1024, 400).log('@5xl')
    })

    it('expand when groups are present', () => {
      cy.get('[data-cy="cd-tr-container"]').eq(-1).as('container')
      cy.get('@container').invoke('height').should('equal', 56)

      // Expand the group
      cy.get('@container').click().log('Expand the group')
      cy.get('@container').invoke('height').should('be.greaterThan', 56)

      // Collapse the group
      cy.get('@container').click().log('Collapse the group')
      cy.get('@container').invoke('height').should('equal', 56)
      cy
    })
  })

  describe('Properties', { viewportWidth: 1024, viewportHeight: 400 }, () => {
    it('status', () => {
      cy.get('[data-cy="cd-tr-icon"] svg').should('exist')
    })

    it('names', () => {
      cy.get('[data-cy="cd-tr-name-container-column"]').should('exist')
    })

    it('added', () => {
      cy.get('[data-cy="cd-tr-added"]').should('exist')
    })

    it('modified', () => {
      cy.get('[data-cy="cd-tr-modified"]').should('exist')
    })

    it('flaky', () => {
      cy.get('[data-cy="cd-tr-flaky"]').should('exist')
    })
  })
}
