/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import TooltipStory from './Tooltip.rootstory'
import assertions from '../assertions'

describe('Tooltip', { viewportHeight: 1000 }, () => {
  function mountStory(options: Parameters<typeof TooltipStory>[0] = {}) {
    mount(<TooltipStory {...options} tabIndex={1} />)
  }

  assertions(mountStory)
})
