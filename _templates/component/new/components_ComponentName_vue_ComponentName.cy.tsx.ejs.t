---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.cy.tsx
---
/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import <%= h.inflection.camelize(name, false) %>Story from './<%= h.inflection.camelize(name, false) %>.rootstory'

describe('<<%= h.inflection.camelize(name, false) %> />', () => {
  it('renders', () => {
    mount(<%= h.inflection.camelize(name, false) %>Story)
  })
})
