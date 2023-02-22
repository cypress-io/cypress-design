/// <reference types="cypress" />

export interface AccordionStoryOptions {
  title?: string
  description?: string
  icon?: any
  iconEl?: any
  separator?: boolean
  open?: boolean
  fullWidthContent?: boolean
  headingClassName?: string
}

export default function assertions(
  mountStory: (options?: AccordionStoryOptions) => void
): void {
  it('opens when clicking on the heading', () => {
    mountStory()
    cy.get('details summary').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')
  })

  it('closes when clicking again on details', () => {
    mountStory()
    cy.get('details summary').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')

    cy.wait(10)

    cy.get('details summary').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('not.be.visible')
  })

  it('displays a separator when separator:true', () => {
    mountStory({ separator: true })
    // the separator has a with of 1px. For some reason cypress detects it as invisible.
    cy.get('[role="separator"]').should('exist')
  })

  it('does not display a separator when separator:false', () => {
    mountStory({ separator: false })
    cy.get('hr').should('not.exist')
  })

  it('has no padding when fullwidth', () => {
    mountStory({ fullWidthContent: true })

    cy.get('details summary').click()

    cy.get('[data-cy="content"]').parent().should('have.css', 'padding', '0px')
  })

  it('takes on the css class passed to headingClassName', () => {
    mountStory({ headingClassName: 'bg-gray-50' })

    cy.get('details summary').should('have.class', 'bg-gray-50')
  })

  it('should not show a separator if no icon is provided', () => {
    mountStory({ separator: true, icon: null })

    cy.get('details summary').contains('Accordion Title')
    cy.get('details summary hr').should('not.exist')
  })

  describe('snapshots', () => {
    it('default', () => {
      mountStory()
      cy.percySnapshot()
    })

    it('no separator', () => {
      mountStory({ separator: false })
      cy.percySnapshot()
    })

    it('blue', () => {
      mountStory({ headingClassName: 'bg-indigo-500' })
      cy.percySnapshot()
    })

    it('fullWidthContent', () => {
      mountStory({ fullWidthContent: true })
      cy.percySnapshot()
    })

    it('open', () => {
      mountStory()
      cy.get('details summary').click()
      cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')
      cy.percySnapshot()
    })
  })
}
