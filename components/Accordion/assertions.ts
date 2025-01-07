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
  titleClassName?: string
  descriptionClassName?: string
  onClickSummary?: (event: MouseEvent) => boolean | undefined
  onToggle?: (open: boolean) => void
}

export default function assertions(
  mountStory: (options?: AccordionStoryOptions) => void,
): void {
  it('opens when clicking on the heading', () => {
    mountStory()
    cy.get('details summary').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')
  })

  it('closes when clicking again on details', () => {
    mountStory()
    cy.wait(50) // react is slow to respond for some reason
    cy.get('details summary').click()

    cy.contains('Lorem ipsum, dolor sit amet').should('be.visible')

    cy.wait(50) // react is slow to respond for some reason

    cy.get('details summary').click()

    cy.get('details').should('not.have.attr', 'open')
  })

  it('displays a separator when separator:true', () => {
    mountStory({ separator: true })
    // the separator has a width of 1px. For some reason cypress detects it as invisible.
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

  it('applies the titleClassName correctly', () => {
    mountStory({ titleClassName: 'text-indigo-600' })

    cy.get('details summary span')
      .find('.text-indigo-600')
      .should('exist')
      .and('have.text', 'Accordion Title')
  })

  it('applies the descriptionClassName correctly', () => {
    mountStory({ descriptionClassName: 'text-gray-700' })

    cy.get('details summary')
      .find('.text-gray-700')
      .should('exist')
      .and(
        'have.text',
        'Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla.',
      )
  })

  it('calls onClickSummary when summary is clicked', () => {
    const onClickSummary = cy.stub()
    mountStory({ onClickSummary })

    cy.get('details summary')
      .click()
      .then(() => {
        expect(onClickSummary).to.have.been.called
      })
  })

  it('calls onToggle with the new state when toggled', () => {
    const onToggle = cy.stub()
    mountStory({ onToggle })

    cy.get('details summary')
      .click()
      .then(() => {
        expect(onToggle).to.have.been.calledWith(true)
      })
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
      mountStory({ headingClassName: 'bg-indigo-50' })
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
