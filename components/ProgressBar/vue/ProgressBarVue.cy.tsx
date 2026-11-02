/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import ProgressBar from './ProgressBar.vue'
import assertions from '../assertions'
import type { ProgressBarProps } from '@cypress-design/constants-progressbar'

function mountStory({
  className,
  ...props
}: ProgressBarProps & { className?: string } = {}) {
  mount(() => (
    <div class="w-96 p-8">
      <ProgressBar aria-label="Progress" class={className} {...props} />
    </div>
  ))
}

describe('<ProgressBar /> Vue', () => {
  assertions(mountStory, 'vue')
})

describe('<ProgressBar /> Vue — class syntax', () => {
  it('merges object and array class syntax onto the track', () => {
    mount(() => (
      <div class="w-96 p-8">
        <ProgressBar
          aria-label="Progress"
          value={50}
          class={[{ 'bg-white': true }, 'mt-2']}
        />
      </div>
    ))
    cy.get('[data-cy="progress-bar"]')
      .should('have.class', 'bg-white')
      .and('have.class', 'mt-2')
      .and('not.have.class', 'bg-gray-50')
  })
})
