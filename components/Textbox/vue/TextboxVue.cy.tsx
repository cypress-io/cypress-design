/// <reference types="cypress" />

import { mount } from 'cypress/vue'
import Textbox from './Textbox.vue'
import TextboxStory from './Textbox.rootstory'
import assertions from '../assertions'

describe('<Textbox />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  it('should accept text input', () => {
    mount(Textbox, {
      props: {
        placeholder: 'Enter text...',
      },
    })
    cy.get('input').type('test input')
    cy.get('input').should('have.value', 'test input')
  })

  it('should handle disabled state', () => {
    mount(Textbox, {
      props: {
        disabled: true,
        modelValue: 'Disabled text',
      },
    })
    cy.get('input').should('be.disabled')
    cy.get('input').should('have.value', 'Disabled text')
  })

  it('should render with left icon', () => {
    mount(Textbox, {
      props: {
        placeholder: 'Search...',
        iconLeft: { template: '<span class="w-4 h-4 bg-gray-400" />' },
      },
    })
    cy.get('input').should('exist')
  })

  it('should render with labels', () => {
    mount(Textbox, {
      props: {
        labelLeft: 'Left',
        labelRight: 'Right',
        modelValue: 'Text',
      },
    })
    cy.contains('Left').should('exist')
    cy.contains('Right').should('exist')
  })

  function mountStory(options: Parameters<typeof TextboxStory>[0] = {}) {
    mount(TextboxStory, { props: options })
  }
  assertions(mountStory)
})
