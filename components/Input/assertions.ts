/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders disabled', () => {
    mountStory({ disabled: true })
    cy.get('input').first().as('firstInput')
    cy.log('disabled state should not allow text changes')
    cy.get('@firstInput').should('have.value', '')
    cy.get('@firstInput').type('my search')
    cy.get('@firstInput').should('have.value', '')
    cy.percySnapshot()
  })

  it('can type text', () => {
    mountStory()
    cy.get('input').first().as('firstInput')
    cy.log('enabled state should allow text changes')
    cy.get('@firstInput').should('have.value', '')
    cy.get('@firstInput').type('my search')
    cy.get('@firstInput').should('have.value', 'my search')
    cy.percySnapshot()
  })

  it('calls onChange', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    mountStory({ onChange: onChangeSpy })
    cy.get('input').first().as('firstInput')
    cy.get('@firstInput').should('have.value', '')
    cy.get('@firstInput')
      .type('my search')
      .get('@onChangeSpy')
      .should('have.been.called')
  })

  it('calls onReset', () => {
    const onResetSpy = cy.spy().as('onResetSpy')
    mountStory({ onChange: onResetSpy })
    cy.get('@onResetSpy').click().should('have.been.calledOnce')
  })

  it('shows search icon', () => {
    mountStory({ isSearch: true })
    cy.get('[data-cy="text-input--search-icon"]').should('exist')
    cy.percySnapshot()
  })

  it('shows search results', () => {
    mountStory({
      searchResults: {
        match: 7,
        total: 124,
        entity: 'specs',
      },
    })
    cy.get('[data-cy="text-input--search-icon"]')
      .should('exist')
      .within(() => {
        cy.should('have.text', '7 of 124 specs')
      })
    cy.percySnapshot()
  })
}
