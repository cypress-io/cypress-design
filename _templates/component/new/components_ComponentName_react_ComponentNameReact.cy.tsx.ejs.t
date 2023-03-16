---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>React.cy.tsx
---
/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import <%= h.inflection.camelize(name, false) %>Story from './<%= h.inflection.camelize(name, false) %>.rootstory'
import assertions from '../assertions'

describe('<%= h.inflection.camelize(name, false) %>', () => {
  function mountStory(options: Parameters<typeof <%= h.inflection.camelize(name, false) %>Story>[0] = {}) {
    mount(<<%= h.inflection.camelize(name, false) %>Story {...options} />)
  }
  assertions(mountStory)
})
