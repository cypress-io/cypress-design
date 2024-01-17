/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Example from './Example'
import assertions from '../assertions'

describe('Example', () => {
  function mountStory(options: Parameters<typeof Example>[0] = { id: '1' }) {
    mount(<Example {...options} />)
  }
  assertions(mountStory)
})
