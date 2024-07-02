/// <reference types="cypress" />

import { CssVariants, Tab } from './constants'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
  { id: 'err', label: 'Errors', ['aria-controls']: 'tabpanel-id-3' },
  { id: 'reco', label: 'Recommendations', ['aria-controls']: 'tabpanel-id-4' },
]

export default function assertions(
  mountStory: (options?: {
    tabs: Tab[]
    activeId?: string
    variant?: keyof typeof CssVariants
    onSwitch?: (tab: Tab) => void | boolean
  }) => void,
): void {
  describe('Tabs', { viewportHeight: 80 }, () => {
    it('renders', () => {
      mountStory({ tabs, activeId: 'ov' })
      tabs.forEach((tab, i) => {
        cy.get(`#${tab.id}`).should(
          'have.attr',
          'aria-controls',
          `tabpanel-id-${i + 1}`,
        )
      })
    })

    it('moves to tab on click', () => {
      mountStory({ tabs, activeId: 'ov' })
      cy.contains('Errors').click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Errors')
      cy.get('[aria-selected="false"]').should('have.length', 3)
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

    it('calls onSwitch when switching tabs', () => {
      const onSwitch = cy.stub().as('onSwitch')
      mountStory({ tabs, activeId: 'ov', onSwitch })
      cy.contains('Errors')
        .click()
        .then(() => {
          expect(onSwitch).to.have.been.calledWith(Cypress.sinon.match(tabs[2]))
        })
    })

    it('prevents switching when onSwitch returns false', () => {
      const onSwitch = cy
        .stub()
        .as('onSwitch')
        .callsFake((_, e) => {
          e.preventDefault()
        })
      mountStory({ tabs, activeId: 'ov', onSwitch })
      cy.contains('Errors').click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Overview')
    })

    Object.keys(CssVariants).forEach((variant) => {
      it(`renders ${variant}`, () => {
        mountStory({
          tabs,
          activeId: 'ov',
          variant: variant as keyof typeof CssVariants,
        })
      })
    })
  })
}
