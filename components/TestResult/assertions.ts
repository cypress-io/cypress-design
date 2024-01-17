/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  describe('viewport', () => {
    beforeEach(() => {
      mountStory()
    })

    afterEach(() => {
      cy.percySnapshot()
    })

    it('xs', () => {
      cy.viewport(360, 400)
    })

    it('sm', () => {
      cy.viewport(640, 400)
    })

    it('md', () => {
      cy.viewport(1024, 400)
    })

    it('lg', () => {
      cy.viewport(1280, 400)
    })

    // it('fails as expected', () => {
    //   expect(true).to.equal(false)
    // })
  })
}
