/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  beforeEach(() => {
    cy.viewport(800, 400)
  })

  it('renders', () => {
    mountStory({ title: 'Modal' })
    cy.contains('Open Modal').click()
  })

  it('renders with helpLink', () => {
    mountStory({ title: 'Modal', helpLink: 'https://www.google.com' })
    cy.contains('Open Modal').click()
  })
}
