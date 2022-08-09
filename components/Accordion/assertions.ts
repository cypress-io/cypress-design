/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('opens when clicking on the heading', () => {
    mountStory()
    cy.get('details').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')
  })

  it('closes when clicking again on details', () => {
    mountStory()
    cy.get('details').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')

    cy.get('details').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('not.be.visible')
  })
}
