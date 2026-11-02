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
