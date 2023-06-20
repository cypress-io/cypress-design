/// <reference types="cypress" />

import { ref } from 'vue'
import { mount } from 'cypress/vue'
import Checkbox from './Checkbox.vue'

describe('<Checkbox />', () => {
  it('changes when the label is clicked', () => {
    mount(() => {
      return (
        <Checkbox
          label="Welcome guide settings"
          id="welcome-opt-out"
          checked
          class="px-2 py-1 m-2 border border-gray-300 rounded"
        />
      )
    })

    cy.get('input[type="checkbox"]').should('be.checked')
    cy.percySnapshot()
    cy.contains('Welcome guide settings').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
    cy.percySnapshot()
  })

  it('changes when checkbox is clicked', () => {
    mount(() => {
      return (
        <Checkbox
          label="Welcome guide settings"
          id="welcome-opt-out"
          checked
          class="px-2 py-1 m-2 border border-gray-300 rounded"
        />
      )
    })

    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('svg').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('keeps its width when label is long', () => {
    mount(() => {
      return (
        <Checkbox
          label={[
            'lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
            'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
            'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
            'sunt in culpa qui officia deserunt mollit anim id est laborum.',
          ].join(' ')}
          id="lorem-checkbox"
        />
      )
    })

    cy.get('label span:first-child').invoke('outerWidth').should('equal', 16)
  })

  it('renders vModel', () => {
    const isChecked = ref(false)
    mount(() => {
      return (
        <div>
          <Checkbox
            label="Welcome guide settings"
            v-model={isChecked.value}
            class="px-2 py-1 m-2 border border-gray-300 rounded"
          />
          <div
            class="px-2 py-1 m-2 border border-gray-300 rounded"
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

  it("renders vModel when it's an array", () => {
    const checkedValues = ref([])
    mount(() => {
      return (
        <div>
          <Checkbox
            name="first-checkbox"
            label="First checkbox"
            v-model={checkedValues.value}
            class="px-2 py-1 m-2 border border-gray-300 rounded"
          />
          <Checkbox
            name="second-checkbox"
            label="Second checkbox"
            v-model={checkedValues.value}
            class="px-2 py-1 m-2 border border-gray-300 rounded"
          />
          <Checkbox
            name="third-checkbox"
            label="Third checkbox"
            v-model={checkedValues.value}
            class="px-2 py-1 m-2 border border-gray-300 rounded"
          />
          <div
            class="px-2 py-1 m-2 border border-gray-300 rounded"
            data-cy="result"
          >
            {JSON.stringify(checkedValues.value)}
          </div>
        </div>
      )
    })

    cy.get('[data-cy="result"]').should('contain', '[]')
    cy.contains('First checkbox').click()
    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('[data-cy="result"]').should('contain', '["first-checkbox"]')
    cy.contains('Second checkbox').click()
    cy.get('[data-cy="result"]').should(
      'contain',
      '["first-checkbox","second-checkbox"]'
    )
    cy.contains('Second checkbox').click()
    cy.get('[data-cy="result"]').should('contain', '["first-checkbox"]')
  })
})
