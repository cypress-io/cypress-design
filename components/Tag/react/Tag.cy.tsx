/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import TagStory from './Tag.rootstory'
import assertions from '../assertions'

describe('Tag', () => {
  function mountStory() {
    mount(<TagStory />)
  }
  assertions(mountStory)
})
