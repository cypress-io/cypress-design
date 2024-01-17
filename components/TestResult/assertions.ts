/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  describe('viewport', () => {
    before(() => {
      mountStory()
    })

    afterEach(() => {
      cy.percySnapshot()
    })

    it('xs', () => {
      cy.viewport(360, 480)
    })

    it('sm', () => {
      cy.viewport(640, 480)
    })

    it('md', () => {
      cy.viewport(1024, 480)
    })

    it('lg', () => {
      cy.viewport(1280, 480)
    })

    it('fails as expected', () => {
      expect(true).to.equal(false)
    })
  })
}
