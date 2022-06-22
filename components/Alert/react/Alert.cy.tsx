/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import AlertStory from './Alert.rootstory'

describe('Alert', () => {
  it('renders', () => {
    mount(<AlertStory />)
  })
})
