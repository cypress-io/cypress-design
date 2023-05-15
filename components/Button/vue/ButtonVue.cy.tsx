/// <reference types="cypress" />
import { ref } from 'vue'
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import Button from './Button.vue'
import ButtonStory from './Button.rootstory'

describe('<Button />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  function mountStory(options: Parameters<typeof ButtonStory>[0] = {}) {
    mount(() => <ButtonStory {...options} />)
  }
  assertions(mountStory)

  it('should increment the value when clicking on the button', () => {
    const val = ref(0)
    mount(() => (
      <div class="p-4">
        <div
          class="rounded-full p-4 bg-jade-300 mb-4 px-6 inline-block"
          data-cy="counter"
        >
          {val.value}
        </div>
        <Button onClick={() => val.value++}>increment</Button>
      </div>
    ))
    cy.get('button').click().click().click().click()
    cy.get('[data-cy="counter"]').contains('4')
  })

  it('responsively handles `disabled` changes', () => {
    const disabled = ref(true)

    mount({
      render: () => (
        <div>
          <button
            data-cy="toggle"
            onClick={() => (disabled.value = !disabled.value)}
          >
            Toggle
          </button>

          <Button data-cy="ds-button" disabled={disabled.value}>
            DS Button
          </Button>
          <button data-cy="html-button" disabled={disabled.value}>
            Base HTML Button
          </button>
        </div>
      ),
    })

    // HTML & DS Buttons start off disabled
    cy.findByTestId('html-button').should('be.disabled')
    cy.findByTestId('ds-button').should('be.disabled')

    // Click toggle button to update `ref` for `disabled` state
    cy.findByTestId('toggle').click()

    // Base HTML button properly enables
    cy.findByTestId('html-button').should('not.be.disabled')

    // FAILS - DS Button stays disabled
    cy.findByTestId('ds-button').should('not.be.disabled')
  })
})
