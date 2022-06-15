/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import StatusIconStory from './StatusIcon.rootstory'

describe('<StatusIcon />', () => {
  it('renders', () => {
    mount(StatusIconStory)
  })
})
