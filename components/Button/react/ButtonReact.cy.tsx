/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import ButtonStory from './Button.rootstory'
import assertions from '../assertions'

describe('<Button />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  function mountStory(options: Parameters<typeof ButtonStory>[0] = {}) {
    mount(<ButtonStory {...options} />)
  }
  assertions(mountStory)
})
