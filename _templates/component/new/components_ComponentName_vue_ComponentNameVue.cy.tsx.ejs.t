---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>Vue.cy.tsx
---
/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import <%= h.inflection.camelize(name, false) %> from './<%= h.inflection.camelize(name, false) %>.vue'

describe('<<%= h.inflection.camelize(name, false) %>/>', () => {
  function mountStory(
    options: ComponentProps<typeof <%= h.inflection.camelize(name, false) %>> = { id: '1' },
  ) {
    mount(() => <<%= h.inflection.camelize(name, false) %> {...options} />)
  }
  assertions(mountStory)
})
