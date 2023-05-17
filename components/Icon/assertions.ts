/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders with size', () => {
    mountStory({ size: '24' })
    cy.percySnapshot()
  })

  it('renders with interactiveColorsOnGroup', () => {
    mountStory({ hoverStrokeColor: 'red-500', interactiveColorsOnGroup: true })
    cy.get('svg')
      .should('have.class', 'group-hover:icon-dark-red-500')
      .and('not.have.attr', 'interactiveColorsOnGroup')
  })

  it('should keep class', () => {
    mountStory({
      class: 'm-20',
      hoverStrokeColor: 'red-500',
      interactiveColorsOnGroup: true,
    })
    cy.get('svg').should('have.class', 'm-20')
  })

  it('should remove name', () => {
    mountStory({
      name: 'document-download',
      size: '24',
      hoverStrokeColor: 'red-500',
      interactiveColorsOnGroup: true,
    })
    cy.get('svg')
      .should('have.class', 'group-hover:icon-dark-red-500')
      .and('not.have.attr', 'name')
  })
}
