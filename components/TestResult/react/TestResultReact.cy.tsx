/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import TestResult from './TestResult'
import assertions from '../assertions'

describe('TestResult', () => {
  function mountStory(options: Parameters<typeof TestResult>[0] = { id: '1' }) {
    mount(<TestResult {...options} />)
  }
  assertions(mountStory)
})
