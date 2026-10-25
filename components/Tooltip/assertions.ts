/// <reference types="cypress" />

// Floating UI positions tooltips asynchronously and React renders them at the
// viewport's top-left corner until it does, so a snapshot taken too early
// shows every tooltip stacked in the corner.
export function waitForTooltipsToPosition(): void {
  cy.get('[role="tooltip"]').should(($tooltips) => {
    $tooltips.each((_, tooltip) => {
      const { top, left } = tooltip.getBoundingClientRect()
      expect(top !== 0 || left !== 0, 'tooltip has been positioned').to.equal(
        true,
      )
    })
  })
}

export default function assertions(
  mountStory: (options?: any) => void,
  fw: 'react' | 'vue',
): void {
  it('renders', () => {
    mountStory()

    cy.contains('[tabindex="1"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('be.visible')
    waitForTooltipsToPosition()
    cy.percySnapshot()
    ;['top', 'right', 'bottom', 'left', 'top-start'].forEach((placement) => {
      cy.contains('[tabindex="1"]', `Hover Me (${placement})`).focus()
      cy.contains(`Popover (${placement})`).should('be.visible')
      waitForTooltipsToPosition()
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
    waitForTooltipsToPosition()
    cy.percySnapshot()
    ;['top', 'right', 'bottom', 'left', 'top-start'].forEach((placement) => {
      cy.contains('[tabindex="1"]', `Hover Me (${placement})`).focus()
      cy.contains(`Popover (${placement})`).should('be.visible')
      waitForTooltipsToPosition()
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
