import * as React from 'react'
import { mount } from 'cypress/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('changes when the label is clicked', () => {
    let isChecked = true

    mount(
      <Checkbox
        label="Welcome guide settings"
        id="welcome-opt-out"
        checked={isChecked}
        onChange={() => (isChecked = !isChecked)}
        className="m-2 px-2 py-1 border-1 border-gray-300 rounded"
      />
    )

    cy.get('input[type="checkbox"]').should('be.checked')
    cy.percySnapshot()
    cy.contains('Welcome guide settings').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
    cy.percySnapshot()
  })

  it('changes when checkbox is clicked', () => {
    let isChecked = true

    mount(
      <Checkbox
        label="Welcome guide settings"
        id="welcome-opt-out"
        checked={isChecked}
        onChange={() => (isChecked = !isChecked)}
        className="m-2 px-2 py-1 border-1 border-gray-300 rounded"
      />
    )

    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('svg').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('keeps its width when label is long', () => {
    mount(
      <Checkbox
        label="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        id="lorem-checkbox"
        onChange={() => {}}
      />
    )

    cy.percySnapshot()

    cy.get('label span:first-child').invoke('outerWidth').should('equal', 16)
  })
})
