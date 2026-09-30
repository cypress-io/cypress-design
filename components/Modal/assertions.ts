export default function assertions(
  mountStory: (options?: {
    title?: string
    helpLink?: string
    helpLinkLabel?: string
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
    cy.findByRole('link', { name: 'Need help' })
      .should('have.attr', 'href', 'https://www.google.com')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
  })

  it('renders a custom helpLinkLabel', () => {
    mountStory({
      title: 'Modal',
      helpLink: 'https://www.google.com',
      helpLinkLabel: 'Read the docs',
    })
    cy.contains('Open Modal').click()
    cy.findByRole('link', { name: 'Read the docs' }).should(
      'have.attr',
      'href',
      'https://www.google.com',
    )
  })

  it('closes on Escape and frees body scroll', () => {
    mountStory({ title: 'Modal' })
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('dialog').should('be.visible')
    cy.get('body').should('have.class', 'cy-modal-overflow-hidden')
    // Escape makes the browser fire `cancel` on the dialog
    cy.findByRole('dialog').trigger('cancel')
    cy.findByRole('dialog').should('not.exist')
    cy.get('body').should('not.have.class', 'cy-modal-overflow-hidden')
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
