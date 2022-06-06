/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import TooltipStory from './Tooltip.rootstory'
import assertions from '../assertions'

describe('<Tooltip />', { viewportHeight: 800, viewportWidth: 800 }, () => {
  function mountStory(options: Parameters<typeof TooltipStory>[0] = {}) {
    mount(() => <TooltipStory {...options} tabIndex={1} />)
  }

  assertions(mountStory)
})
