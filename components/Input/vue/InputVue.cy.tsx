/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import InputStory from './Input.rootstory'

describe('<Input/>', () => {
  function mountStory(options: Parameters<typeof InputStory>[0] = {}) {
    mount(() => <InputStory {...options} />)
  }
  assertions(mountStory)
})
