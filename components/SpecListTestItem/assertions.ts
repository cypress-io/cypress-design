/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory()
    cy.viewport(640, 640)
    cy.viewport(768, 768)
    cy.viewport(1024, 1024)
    cy.viewport(1280, 1280)
  })
}
