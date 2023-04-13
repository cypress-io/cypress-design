/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import type { NavGroup, NavItemLink } from '../constants'
import DocMenuStory from './DocMenu.rootstory'

describe('<DocMenu/>', () => {
  function mountStory(items: (NavItemLink | NavGroup)[] = []) {
    mount(() => <DocMenuStory items={items} />)
  }
  assertions(mountStory)
})
