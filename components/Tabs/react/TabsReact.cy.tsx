/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Tabs from './Tabs'
import type { Tab, variants } from '../constants'
import assertions from '../assertions'

describe('Tabs', () => {
  function mountStory(
    options: { tabs: Tab[]; variant?: keyof typeof variants } = { tabs: [] }
  ) {
    mount(<Tabs {...options} />)
  }
  assertions(mountStory)
})
