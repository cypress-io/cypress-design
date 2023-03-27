/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import DocMenuStory from './DocMenu.rootstory'
import assertions from '../assertions'
import { NavGroup, NavItemLink } from '../constants'

describe('<DocMenu/>', () => {
  function mountStory(items: (NavItemLink | NavGroup)[] = []) {
    mount(<DocMenuStory items={items} />)
  }
  assertions(mountStory)
})
