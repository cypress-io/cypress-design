export default function assertions(mountStory: (options?: any) => void): void {
  beforeEach(() => {
    cy.viewport(800, 400)
  })

  it('renders', () => {
    mountStory({ title: 'Modal' })
    cy.contains('Open Modal').click()
    cy.findByRole('modal').should('be.visible')
  })

  it('renders with helpLink', () => {
    mountStory({ title: 'Modal', helpLink: 'https://www.google.com' })
    cy.contains('Open Modal').click()
    cy.findByRole('modal').should('be.visible')
    cy.findByRole('link', { name: 'Need help' }).should(
      'have.attr',
      'href',
      'https://www.google.com'
    )
  })

  it('restores scroll after closing', () => {
    mountStory({
      title: 'Modal',
    })
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('modal').should('be.visible')
    cy.findByRole('button', { name: 'Close' }).click()
    cy.findByRole('modal').should('not.exist')
    cy.window().its('scrollY').should('be.above', 0)
  })
}
