---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.cy.tsx
---
/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import <%= h.inflection.camelize(name, false) %>Story from './<%= h.inflection.camelize(name, false) %>.rootstory'

describe('<<%= h.inflection.camelize(name, false) %>/>', () => {
  function mountStory(options: Parameters<typeof <%= h.inflection.camelize(name, false) %>Story>[0] = {}) {
    mount(() => <<%= h.inflection.camelize(name, false) %>Story {...options} />)
  }
  assertions(mountStory)
})
