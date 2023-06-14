/// <reference types="cypress" />

export default function assertions(
  mountStory: (options?: any) => void,
  fw: 'react' | 'vue'
): void {
  it('renders', () => {
    mountStory()

    cy.contains('[tabindex="1"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('be.visible')
    cy.percySnapshot()
    ;['top', 'right', 'bottom', 'left', 'top-start'].forEach((placement) => {
      cy.contains('[tabindex="1"]', `Hover Me (${placement})`).focus()
      cy.contains(`Popover (${placement})`).should('be.visible')
      cy.percySnapshot(`tooltip-light-${placement}-${fw}`)
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
      cy.percySnapshot(`tooltip-dark-${placement}-${fw}`)
    })
  })

  it('shifts when overflowing', () => {
    mountStory({ single: true })
    cy.contains('[tabindex="1"]', 'Lorem ipsum').focus()
    cy.contains('div', 'popit: Lorem ipsum').then(($el) => {
      const { left } = $el[0].getBoundingClientRect()
      expect(left).to.be.greaterThan(0)
    })
  })
}
