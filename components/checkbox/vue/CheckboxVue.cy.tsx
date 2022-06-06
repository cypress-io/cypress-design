/// <reference types="cypress" />

import { ref } from 'vue'
import { mount } from 'cypress/vue'
import Checkbox from './Checkbox.vue'

describe('<Checkbox />', () => {
  it('renders', () => {
    mount(() => {
      return (
        <Checkbox
          label="Welcome guide settings"
          id="welcome-opt-out"
          checked
          class="m-2 px-2 py-1 border-1 border-gray-300 rounded"
        />
      )
    })

    cy.get('input[type="checkbox"]').should('be.checked')
    cy.contains('Welcome guide settings').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('renders vModel', () => {
    const isChecked = ref(false)
    mount(() => {
      return (
        <div>
          <Checkbox
            label="Welcome guide settings"
            vModel={isChecked.value}
            class="m-2 px-2 py-1 border-1 border-gray-300 rounded"
          />
          <div
            class="m-2 px-2 py-1 border-1 border-gray-300 rounded"
            data-cy="result"
          >
            isChecked = {isChecked.value.toString()}
          </div>
        </div>
      )
    })

    cy.get('[data-cy="result"]').should('contain', 'isChecked = false')
    cy.contains('Welcome guide settings').click()
    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('[data-cy="result"]').should('contain', 'isChecked = true')
  })
})
