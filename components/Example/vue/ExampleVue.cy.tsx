/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import Example from './Example.vue'

describe('<Example/>', () => {
  function mountStory(options: ComponentProps<typeof Example> = { id: '1' }) {
    mount(() => <Example {...options} />)
  }
  assertions(mountStory)
})
