/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import TagStory from './Tag.rootstory'

describe('<Tag/>', () => {
  function mountStory() {
    mount(() => <TagStory />)
  }
  assertions(mountStory)
})
