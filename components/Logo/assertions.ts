/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory()
    cy.get('svg').should('have.length.above', 0)
    cy.percySnapshot()
  })
}
