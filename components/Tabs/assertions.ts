/// <reference types="cypress" />

import { variants, Tab } from './constants'

const tabs = [
  { id: 'ov', label: 'Overview' },
  { id: 'cl', label: 'Command Log' },
  { id: 'err', label: 'Errors' },
  { id: 'reco', label: 'Recommendations' },
]

export default function assertions(
  mountStory: (options?: {
    tabs: Tab[]
    activeId?: string
    variant?: keyof typeof variants
  }) => void,
): void {
  describe('Tabs', { viewportHeight: 80 }, () => {
    it('renders', () => {
      mountStory({ tabs, activeId: 'ov' })
    })

    it('moves to tab on click', () => {
      mountStory({ tabs, activeId: 'ov' })
      cy.contains('Errors').click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Errors')
    })

    it('moves to tab after resize on click', () => {
      mountStory({ tabs, activeId: 'ov' })
      cy.contains('Errors').click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Errors')
      cy.viewport(300, 80)
      cy.wait(100)
      cy.get('[role=tablist] > div:last-child').then(($marker) => {
        expect(parseInt($marker[0].style.left)).to.be.greaterThan(5)
      })
    })

    it('moves to tab on arrow press', () => {
      mountStory({ tabs, activeId: 'ov' })
      cy.contains('button', 'Overview').type('{rightArrow}{rightArrow}')
      cy.get('[aria-selected="true"]').should('contain.text', 'Errors')
    })

    it('renders data attributes', () => {
      const richTabs = tabs.map((tab) => ({
        ...tab,
        'data-foo': 'bar',
      }))
      mountStory({ tabs: richTabs, activeId: 'ov' })
      cy.get('[data-foo="bar"]').should('have.length', 4)
    })

    Object.keys(variants).forEach((variant) => {
      it(`renders ${variant}`, () => {
        mountStory({
          tabs,
          activeId: 'ov',
          variant: variant as keyof typeof variants,
        })
      })
    })
  })
}
