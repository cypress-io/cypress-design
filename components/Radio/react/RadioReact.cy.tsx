/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Radio from './Radio'
import assertions from '../assertions'

describe('Radio', () => {
  function mountStory(options: Parameters<typeof Radio>[0] = { id: '1' }) {
    mount(<Radio {...options} />)
  }
  assertions(mountStory)
})
