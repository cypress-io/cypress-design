/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory()
    expect(false).to.equal(true)
    cy.percySnapshot()
  })
}
