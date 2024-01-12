/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import TestItem from './TestItem.vue'

describe('<TestItem/>', () => {
  function mountStory(
    options: ComponentProps<typeof TestItem> = {
      names: ['Describe', 'this', 'for', 'me'],
    },
  ) {
    mount(() => (
      <div class="p-[24px]">
        <div>
          <TestItem {...options} />
          <TestItem {...options} />
          <TestItem {...options} />
          <TestItem {...options} />
          <TestItem {...options} />
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
