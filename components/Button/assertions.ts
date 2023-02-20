/// <reference types="cypress" />

export interface ButtonStoryOptions {
  disabled?: boolean
  onClick?: () => void
  href?: string
}

export default function assertions(
  mountStory: (options?: ButtonStoryOptions) => void
): void {
  it('renders variants disabled', () => {
    mountStory({ disabled: true })
    cy.get('button').first().as('firstButton')

    cy.log('disabled state should not have underline on hover')
    cy.get('@firstButton').should(
      'not.have.css',
      'text-decoration-line',
      'underline'
    )
    // @ts-ignore
    cy.get('@firstButton').realHover()
    cy.get('@firstButton').should(
      'not.have.css',
      'text-decoration-line',
      'underline'
    )
    cy
  })

  it('renders variants', () => {
    mountStory()
    cy.get('button').first().as('firstButton')

    cy.log('should have underline on hover')
    cy.get('@firstButton').should(
      'not.have.css',
      'text-decoration-line',
      'underline'
    )
    // @ts-ignore
    cy.get('@firstButton').realHover()
    cy.get('@firstButton').should(
      'have.css',
      'text-decoration-line',
      'underline'
    )
    cy.percySnapshot()
  })

  it('is clickable', () => {
    const onClickSpy = cy.spy().as('onClickSpy')
    mountStory({ onClick: onClickSpy })
    cy.get('button:first')
      .click()
      .get('@onClickSpy')
      .should('have.been.calledOnce')
  })

  it('renders links', () => {
    mountStory({ href: '#' })
    cy.get('button').should('not.exist')
    cy.contains('Button').should('have.attr', 'href', '#')
  })
}
