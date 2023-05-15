/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory({ title: 'Modal' })
    cy.contains('Open Modal').click()
  })
}
