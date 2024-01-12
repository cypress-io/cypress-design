/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import Radio from './Radio.vue'

describe('<Radio/>', () => {
  function mountStory(options: ComponentProps<typeof Radio> = { id: '1' }) {
    mount(() => <Radio {...options} />)
  }
  assertions(mountStory)
})
