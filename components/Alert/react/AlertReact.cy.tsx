/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import AlertStory from './Alert.rootstory'

describe('Alert', { viewportHeight: 800 }, () => {
  it('renders', () => {
    mount(<AlertStory />)
    cy.percySnapshot()
  })
})
