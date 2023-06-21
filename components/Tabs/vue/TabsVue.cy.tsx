/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import Tabs from './Tabs.vue'
import type { Tab, variants } from '../constants'

describe('<Tabs/>', () => {
  function mountStory(
    options: {
      tabs: Tab[]
      activeId?: string
      variant?: keyof typeof variants
    } = { tabs: [] }
  ) {
    mount(() => (
      <div class="m-4">
        <Tabs {...options} />
      </div>
    ))
  }
  assertions(mountStory)
})
