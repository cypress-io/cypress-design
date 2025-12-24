/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import Textbox from './Textbox'
import TextboxStory from './Textbox.rootstory'
import assertions from '../assertions'

describe('<Textbox />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  it('should accept text input', () => {
    mount(<Textbox placeholder="Enter text..." />)
    cy.get('input').type('test input')
    cy.get('input').should('have.value', 'test input')
  })

  it('should handle disabled state', () => {
    mount(<Textbox disabled value="Disabled text" />)
    cy.get('input').should('be.disabled')
    cy.get('input').should('have.value', 'Disabled text')
  })

  it('should render with left icon', () => {
    mount(
      <Textbox
        placeholder="Search..."
        iconLeft={<span className="w-4 h-4 bg-gray-400" />}
      />,
    )
    cy.get('input').should('exist')
  })

  it('should render with labels', () => {
    mount(<Textbox labelLeft="Left" labelRight="Right" value="Text" />)
    cy.contains('Left').should('exist')
    cy.contains('Right').should('exist')
  })

  function mountStory(options: Parameters<typeof TextboxStory>[0] = {}) {
    mount(<TextboxStory {...options} />)
  }
  assertions(mountStory)
})
