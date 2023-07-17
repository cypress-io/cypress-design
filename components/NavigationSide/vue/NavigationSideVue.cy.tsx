/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import NavigationSideStory from './NavigationSide.rootstory'

describe('<NavigationSide/>', () => {
  function mountStory(options: Parameters<typeof NavigationSideStory>[0] = {}) {
    mount(() => <NavigationSideStory {...options} />)
  }
  assertions(mountStory)
})
