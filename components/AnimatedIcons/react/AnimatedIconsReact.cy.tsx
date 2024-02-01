/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import AnimatedIcons from './AnimatedIcons'
import assertions from '../assertions'

describe('AnimatedIcons', () => {
  function mountStory(
    options: Parameters<typeof AnimatedIcons>[0] = { id: '1' },
  ) {
    mount(<AnimatedIcons {...options} />)
  }
  assertions(mountStory)
})
