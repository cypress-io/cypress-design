/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import AccordionStory from './Accordion.rootstory'
import assertions from '../assertions'

describe('Accordion', () => {
  function mountStory(options: Parameters<typeof AccordionStory>[0] = {}) {
    mount(<AccordionStory {...options} />)
  }
  assertions(mountStory)
})
