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
    cy.contains('Welcome guide settings').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
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
})
