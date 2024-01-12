/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory()
    cy.viewport(500, 400)
    cy.viewport(1280, 400)
  })
}
