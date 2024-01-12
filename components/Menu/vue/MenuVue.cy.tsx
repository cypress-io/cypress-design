/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import Menu from './Menu.vue'

describe('<Menu/>', () => {
  function mountStory(options: ComponentProps<typeof Menu> = { id: '1' }) {
    mount(() => <Menu {...options} />)
  }
  assertions(mountStory)
})
