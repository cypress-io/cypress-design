/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import NavigationLayoutStory from './NavigationLayout.rootstory'
import assertions from '../assertions'

describe('NavigationLayout', () => {
  function mountStory(
    options: Parameters<typeof NavigationLayoutStory>[0] = {},
  ) {
    mount(<NavigationLayoutStory {...options} />)
  }
  assertions(mountStory)
})
