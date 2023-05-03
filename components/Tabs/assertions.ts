/// <reference types="cypress" />

import { variants, Tab } from './constants'

const tabs = [
  { id: 'ov', label: 'Overview', active: true },
  { id: 'cl', label: 'Command Log' },
  { id: 'err', label: 'Errors' },
  { id: 'reco', label: 'Recommendations' },
]

export default function assertions(
  mountStory: (options?: {
    tabs: Tab[]
    variant?: keyof typeof variants
  }) => void
): void {
  it('renders', () => {
    mountStory({ tabs })
  })

  it('moves to tab on click', () => {
    mountStory({ tabs })
    cy.contains('Errors').click()
    cy.get('[aria-selected="true"]').should('have.text', ' Errors ')
  })

  it('moves to tab on arrow press', () => {
    mountStory({ tabs })
    cy.contains('button', 'Overview').type('{rightArrow}{rightArrow}')
    cy.get('[aria-selected="true"]').should('have.text', ' Errors ')
  })

  Object.keys(variants).forEach((variant) => {
    it(`renders ${variant}`, () => {
      mountStory({ tabs, variant: variant as keyof typeof variants })
    })
  })
}
