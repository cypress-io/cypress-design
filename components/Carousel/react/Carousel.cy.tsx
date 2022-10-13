/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import CarouselStory from './Carousel.rootstory'
import assertions from '../assertions'

describe('Carousel', () => {
  function mountStory(options: Parameters<typeof CarouselStory>[0] = {}) {
    mount(<CarouselStory {...options} />)
  }
  assertions(mountStory)
})
