/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    cy.viewport(1280, 400)
    mountStory()
  })
}
