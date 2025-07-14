---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>React.cy.tsx
---
/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import <%= h.inflection.camelize(name, false) %> from './<%= h.inflection.camelize(name, false) %>'
import assertions from '../assertions'

describe('<%= h.inflection.camelize(name, false) %>', () => {
  function mountStory(
    options: Parameters<typeof <%= h.inflection.camelize(name, false) %>>[0] = { id: '1' },
  ) {
    mount(<<%= h.inflection.camelize(name, false) %> {...options} />)
  }
  assertions(mountStory)
})
