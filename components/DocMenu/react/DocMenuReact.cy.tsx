/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import DocMenuStory from './DocMenu.rootstory'
import assertions from '../assertions'
import { NavGroup } from '../constants'

describe('<DocMenu/>', () => {
  function mountStory(groups: NavGroup[] = []) {
    mount(<DocMenuStory groups={groups} />)
  }
  assertions(mountStory)
})
