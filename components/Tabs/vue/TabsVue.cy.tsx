/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import TabsStory from './Tabs.rootstory'

describe('<Tabs/>', () => {
  function mountStory(options: Parameters<typeof TabsStory>[0] = {}) {
    mount(() => <TabsStory {...options} />)
  }
  assertions(mountStory)
})
