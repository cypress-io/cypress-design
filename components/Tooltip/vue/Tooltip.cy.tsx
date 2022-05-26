/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import TooltipStory from './Tooltip.rootstory'

describe('<Tooltip />', () => {
  it('renders', () => {
    mount(TooltipStory)
  })
})
