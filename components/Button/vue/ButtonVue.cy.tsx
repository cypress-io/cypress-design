/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import ButtonStory from './Button.rootstory'

describe('<Button />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  function mountStory(options: Parameters<typeof ButtonStory>[0] = {}) {
    mount(() => <ButtonStory {...options} />)
  }
  assertions(mountStory)
})
