/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import TestItem from './TestItem'
import assertions from '../assertions'

describe('TestItem', () => {
  function mountStory(options: Parameters<typeof TestItem>[0] = { id: '1' }) {
    mount(<TestItem {...options} />)
  }
  assertions(mountStory)
})
