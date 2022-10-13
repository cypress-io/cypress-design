/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import CarouselStory from './Carousel.rootstory'

describe('<Carousel/>', () => {
  function mountStory(options: Parameters<typeof CarouselStory>[0] = {}) {
    mount(() => <CarouselStory {...options} />)
  }
  assertions(mountStory)
})
