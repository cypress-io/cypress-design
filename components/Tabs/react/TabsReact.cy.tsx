/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import TabsStory from './Tabs.rootstory'
import assertions from '../assertions'

describe('Tabs', () => {
  function mountStory(options: Parameters<typeof TabsStory>[0] = {}) {
    mount(<TabsStory {...options} />)
  }
  assertions(mountStory)
})
