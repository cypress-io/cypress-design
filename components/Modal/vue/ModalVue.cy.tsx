/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import ModalStory from './Modal.rootstory'

describe('<Modal/>', () => {
  function mountStory(options: Parameters<typeof ModalStory>[0] = {}) {
    mount(() => <ModalStory {...options} />)
  }
  assertions(mountStory)
})
