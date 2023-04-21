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
})
