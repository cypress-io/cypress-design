/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import StatusIconStory from './StatusIcon.rootstory'

describe('StatusIcon', () => {
  it('renders', () => {
    mount(<StatusIconStory />)
  })
})
