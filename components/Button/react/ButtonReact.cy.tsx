/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Button from './Button'
import ButtonStory from './Button.rootstory'
import assertions from '../assertions'

describe('<Button />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  function mountStory(options: Parameters<typeof ButtonStory>[0] = {}) {
    mount(<ButtonStory {...options} />)
  }
  assertions(mountStory)

  it('should increment the value when clicking on the button', () => {
    mount(<Button onClick={cy.stub().as('onClick')}>Click Me</Button>)
    cy.get('button').click().click().click().click()
    cy.get('@onClick').its('callCount').should('eq', 4)
  })
})
