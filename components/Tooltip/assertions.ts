/// <reference types="cypress" />

// Floating UI positions tooltips asynchronously and React renders them at the
// document's top-left corner until it does, so a snapshot taken too early
// shows every tooltip stacked in the corner. Compare in document coordinates:
// focusing a trigger can scroll the page, which moves that corner on screen.
export function waitForTooltipsToPosition(): void {
  cy.get('[role="tooltip"]').should(($tooltips) => {
    $tooltips.each((_, tooltip) => {
      const win = tooltip.ownerDocument.defaultView!
      const { top, left } = tooltip.getBoundingClientRect()
      const atOrigin = top + win.scrollY === 0 && left + win.scrollX === 0
      expect(atOrigin, 'tooltip still at the document origin').to.equal(false)
    })
  })
}

export default function assertions(
  mountStory: (options?: any) => void,
  fw: 'react' | 'vue',
): void {
  it('renders', () => {
    mountStory()

    cy.contains('[tabindex="0"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('be.visible')
    waitForTooltipsToPosition()
    cy.percySnapshot()
    ;['top', 'right', 'bottom', 'left', 'top-start'].forEach((placement) => {
      cy.contains('[tabindex="0"]', `Hover Me (${placement})`).focus()
      cy.contains(`Popover (${placement})`).should('be.visible')
      waitForTooltipsToPosition()
      cy.percySnapshot(`tooltip-light-${placement}-${fw}`)
    })
  })

  it('renders disabled', () => {
    mountStory({ disabled: true })

    cy.contains('[tabindex="0"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('not.to.exist')
  })

  it('renders dark', () => {
    mountStory({ color: 'dark' })

    cy.contains('[tabindex="0"]', 'Hover Me (dynamic: )').focus()
    cy.contains('PopovDyn').should('be.visible')
    waitForTooltipsToPosition()
    cy.percySnapshot()
    ;['top', 'right', 'bottom', 'left', 'top-start'].forEach((placement) => {
      cy.contains('[tabindex="0"]', `Hover Me (${placement})`).focus()
      cy.contains(`Popover (${placement})`).should('be.visible')
      waitForTooltipsToPosition()
      cy.percySnapshot(`tooltip-dark-${placement}-${fw}`)
    })
  })

  it('shifts when overflowing', () => {
    mountStory({ single: true })
    cy.contains('[tabindex="0"]', 'Lorem ipsum').focus()
    cy.contains('div', 'popit: Lorem ipsum').then(($el) => {
      const { left } = $el[0].getBoundingClientRect()
      expect(left).to.be.greaterThan(0)
    })
  })

  it('points the arrow at the reference after shifting', () => {
    mountStory({ single: true, placement: 'bottom' })
    cy.contains('[tabindex="0"]', 'Lorem ipsum').focus()
    cy.contains('div', 'popit: Lorem ipsum').should('be.visible')
    waitForTooltipsToPosition()
    cy.get('[role="tooltip"] svg').should(($arrow) => {
      const reference = Cypress.$('[tabindex="0"]')[0].getBoundingClientRect()
      const tooltip = $arrow
        .closest('[role="tooltip"]')[0]
        .getBoundingClientRect()
      const arrow = $arrow[0].getBoundingClientRect()
      expect(
        tooltip.left + tooltip.width / 2,
        'tooltip shifted off center',
      ).not.to.be.closeTo(reference.left + reference.width / 2, 2)
      expect(arrow.left + arrow.width / 2).to.be.closeTo(
        reference.left + reference.width / 2,
        2,
      )
    })
  })
}
