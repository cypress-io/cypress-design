/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory()
    cy.viewport(360, 480)
    cy.viewport(640, 480)
    cy.viewport(768, 480)
    cy.viewport(1024, 480)
    cy.viewport(1280, 480)
  })
}
