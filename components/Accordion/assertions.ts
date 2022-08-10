/// <reference types="cypress" />

export interface AccordionStoryOptions {
  title?: string
  description?: string
  icon?: any
  separator?: boolean
  open?: boolean
  fullWidthContent?: boolean
}

export default function assertions(
  mountStory: (options?: AccordionStoryOptions) => void
): void {
  it('opens when clicking on the heading', () => {
    mountStory()
    cy.get('details').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')
  })

  it('closes when clicking again on details', () => {
    mountStory()
    cy.get('details').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')

    cy.get('details').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('not.be.visible')
  })

  it('displays a separator when separator:true', () => {
    mountStory({ separator: true })
    // the separator has a with of 1px. For some reason cypress detects it as invisible.
    cy.get('hr').should('exist')
  })

  it('not display a separator when separator:false', () => {
    mountStory({ separator: false })
    cy.get('hr').should('not.exist')
  })

  it('have no padding when fullwidth', () => {
    mountStory({ fullWidthContent: true })

    cy.get('details').click()

    cy.get('[data-cy="content"]').parent().should('have.css', 'padding', '0px')
  })
}
