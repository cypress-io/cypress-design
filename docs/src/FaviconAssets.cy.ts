/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import { FAVICON_ASSETS } from '@cypress-design/favicon'
import FaviconAssets from './FaviconAssets.vue'

describe('FaviconAssets', () => {
  beforeEach(() => {
    mount(FaviconAssets)
  })

  it('lists every asset the package ships', () => {
    // The table is generated from FAVICON_ASSETS, so this fails if an asset is
    // added to the package without the page picking it up.
    cy.get('tbody tr').should('have.length', FAVICON_ASSETS.length)
    FAVICON_ASSETS.forEach((name) => {
      cy.contains('tbody td', name).should('exist')
    })
  })

  it('renders every image rather than a broken-asset placeholder', () => {
    // naturalWidth is 0 when the browser failed to decode the file, which is
    // what a wrong path or a corrupt export looks like.
    // `should` retries, unlike `each` -- images are still decoding when the
    // component finishes mounting.
    cy.get('img').should('have.length.greaterThan', 0)
    cy.get('img').should(($imgs) => {
      $imgs.each((_, img) => {
        const el = img as HTMLImageElement
        expect(
          el.naturalWidth,
          `${el.getAttribute('src')} decoded`,
        ).to.be.greaterThan(0)
      })
    })
  })

  it('looks right', () => {
    // Guards the artwork itself: a bad regeneration changes these pixels.
    cy.get('img').should('have.length.greaterThan', 0)
    cy.percySnapshot('favicon-assets')
  })
})
