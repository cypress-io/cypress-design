/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import AccordionStory from './Accordion.rootstory'

describe('<Accordion/>', () => {
  function mountStory(options: Parameters<typeof AccordionStory>[0] = {}) {
    mount(() => <AccordionStory {...options} />)
  }
  assertions(mountStory)
})
