describe('test project', () => {
  it('passes', () => {
    cy.visit('/')
    cy.percySnapshot()
  })
})
