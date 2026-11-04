/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import ProgressBar from './ProgressBar.vue'
import a11yAssertions from '../a11y-assertions'
import type { ProgressBarProps } from '@cypress-design/constants-progressbar'

function mountStory(props: ProgressBarProps = {}) {
  mount(() => (
    <div class="w-96 p-8">
      <ProgressBar {...props} />
    </div>
  ))
}

describe('<ProgressBar /> Vue — Accessibility', () => {
  a11yAssertions(mountStory)
})
