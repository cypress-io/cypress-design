/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import InputStory from './Input.rootstory'
import assertions from '../assertions'

describe('Input', () => {
  function mountStory(options: Parameters<typeof InputStory>[0] = {}) {
    mount(<InputStory {...options} />)
  }
  assertions(mountStory)
})
