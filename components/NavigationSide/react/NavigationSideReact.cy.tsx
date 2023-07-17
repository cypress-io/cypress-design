/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import NavigationSideStory from './NavigationSide.rootstory'
import assertions from '../assertions'

describe('NavigationSide', () => {
  function mountStory(options: Parameters<typeof NavigationSideStory>[0] = {}) {
    mount(<NavigationSideStory {...options} />)
  }
  assertions(mountStory)
})
