export default function assertions(
  mountStory: (options?: {
    title?: string
    helpLink?: string
    fullscreen?: boolean
  }) => void,
): void {
  beforeEach(() => {
    cy.viewport(800, 400)
  })

  it('renders', () => {
    mountStory({ title: 'Modal' })
    cy.contains('Open Modal').click()
    cy.findByRole('dialog').should('be.visible')
  })

  it('renders with helpLink', () => {
    mountStory({ title: 'Modal', helpLink: 'https://www.google.com' })
    cy.contains('Open Modal').click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('link', { name: 'Need help' }).should(
      'have.attr',
      'href',
      'https://www.google.com',
    )
  })

  it('restores scroll after closing', () => {
    mountStory({
      title: 'Modal',
    })
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('button', { name: 'Close' }).click()
    cy.findByRole('dialog').should('not.exist')
    cy.window().its('scrollY').should('be.above', 0)
  })

  it('should show a fullscreen modal', () => {
    mountStory({
      title: 'Modal',
      fullscreen: true,
    })
    cy.findByRole('button', { name: 'Open Modal' }).click()
  })
}
