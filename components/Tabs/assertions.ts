/// <reference types="cypress" />

import { variants, Tab } from './constants'

const tabs = [
  { id: 'ov', label: 'Overview', active: true },
  { id: 'cl', label: 'Command Log' },
  { id: 'err', label: 'Errors' },
  { id: 'reco', label: 'Recommendations' },
]

const longTabs = [
  { id: 'ov1', label: 'Overview' },
  { id: 'cl1', label: 'Command Log' },
  { id: 'err1', label: 'Errors' },
  { id: 'reco1', label: 'Recommendations' },
  { id: 'ov2', label: 'Overview 1' },
  { id: 'cl2', label: 'Command Log 1' },
  { id: 'err2', label: 'Errors 1' },
  { id: 'reco2', label: 'Recommendations 1' },
  { id: 'ov3', label: 'Overview 2', active: true },
  { id: 'cl3', label: 'Command Log 2' },
  { id: 'err3', label: 'Errors 2' },
  { id: 'reco3', label: 'Recommendations 2' },
  { id: 'ov4', label: 'Overview 3' },
  { id: 'cl4', label: 'Command Log 3' },
  { id: 'err4', label: 'Errors 3' },
  { id: 'reco4', label: 'Recommendations 3' },
]

export default function assertions(
  mountStory: (options?: {
    tabs: Tab[]
    variant?: keyof typeof variants
  }) => void
): void {
  describe('Tabs', { viewportHeight: 80 }, () => {
    it('renders', () => {
      mountStory({ tabs })
    })

    it('moves to tab on click', () => {
      mountStory({ tabs })
      cy.contains('Errors').click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Errors')
    })

    it('moves to tab on arrow press', () => {
      mountStory({ tabs })
      cy.contains('button', 'Overview').type('{rightArrow}{rightArrow}')
      cy.get('[aria-selected="true"]').should('contain.text', 'Errors')
    })

    it('displays active tab when tabs are overflowing', () => {
      mountStory({
        tabs: longTabs,
        variant: 'underline-small',
      })
    })

    Object.keys(variants).forEach((variant) => {
      it(`renders ${variant}`, () => {
        mountStory({ tabs, variant: variant as keyof typeof variants })
      })
    })
  })
}
