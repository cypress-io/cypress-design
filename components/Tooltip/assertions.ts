/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory()

    cy.contains('[tabindex="1"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('be.visible')
    cy.percySnapshot()
    ;['top', 'right', 'bottom', 'left', 'top-start'].forEach((placement) => {
      cy.contains('[tabindex="1"]', `Hover Me (${placement})`).focus()
      cy.contains(`Popover (${placement})`).should('be.visible')
      cy.percySnapshot(`tooltip-light-${placement}`)
    })
  })

  it('renders disabled', () => {
    mountStory({ disabled: true })

    cy.contains('[tabindex="1"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('not.to.exist')
  })

  it('renders dark', () => {
    mountStory({ color: 'dark' })

    cy.contains('[tabindex="1"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('be.visible')
    cy.percySnapshot()
    ;['top', 'right', 'bottom', 'left', 'top-start'].forEach((placement) => {
      cy.contains('[tabindex="1"]', `Hover Me (${placement})`).focus()
      cy.contains(`Popover (${placement})`).should('be.visible')
      cy.percySnapshot(`tooltip-dark-${placement}`)
    })
  })
}
