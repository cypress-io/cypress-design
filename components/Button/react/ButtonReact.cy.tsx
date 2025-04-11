/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Button from './Button'
import ButtonStory from './Button.rootstory'
import assertions from '../assertions'

describe('<Button />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  it('should increment the value when clicking on the button', () => {
    mount(<Button onClick={cy.stub().as('onClick')}>Click Me</Button>)
    cy.get('button').click().click().click().click()
    cy.get('@onClick').its('callCount').should('eq', 4)
  })

  it('should increment the value when clicking on the button', () => {
    const SUT = () => {
      const [val, setVal] = React.useState(0)
      return (
        <div className="p-4">
          <div
            className="rounded-full p-4 bg-jade-300 mb-4 px-6 inline-block"
            data-cy="counter"
          >
            {val}
          </div>
          <Button onClick={() => setVal(val + 1)}>increment</Button>
        </div>
      )
    }

    mount(<SUT />)
    cy.get('button').click().click().click().click()
    cy.get('[data-cy="counter"]').contains('4')
  })

  it('responsively handles `disabled` changes', () => {
    const SUT = () => {
      const [disabled, setDisabled] = React.useState(false)

      return (
        <div>
          <button data-cy="toggle" onClick={() => setDisabled(!disabled)}>
            Toggle
          </button>

          <Button data-cy="ds-button" disabled={disabled}>
            DS Button
          </Button>
          <button data-cy="html-button" disabled={disabled}>
            Base HTML Button
          </button>
        </div>
      )
    }

    mount(<SUT />)

    cy.findByTestId('html-button').should('not.be.disabled')
    cy.findByTestId('ds-button').should('not.be.disabled')

    // Click toggle button to update `ref` for `disabled` state
    cy.findByTestId('toggle').click()

    cy.findByTestId('html-button').should('be.disabled')
    cy.findByTestId('ds-button').should('be.disabled')
  })

  it('responsively handles attributes changes', () => {
    const SUT = () => {
      const [cyId, setCyId] = React.useState('ds-button')

      return (
        <div>
          <button data-cy="toggle" onClick={() => setCyId('ds-button-changed')}>
            Toggle
          </button>

          <Button data-cy={cyId}>DS Button</Button>
        </div>
      )
    }
    mount(<SUT />)

    // HTML & DS Buttons start off disabled
    cy.findByTestId('ds-button').should('have.text', 'DS Button')

    // Click toggle button to update `ref` for `disabled` state
    cy.findByTestId('toggle').click()

    // Base HTML button properly enables
    cy.findByTestId('ds-button-changed').should('have.text', 'DS Button')
  })

  it('responsively handles `href` changes', () => {
    const SUT = () => {
      const [cyHref, setCyHref] = React.useState('')

      return (
        <div className="p-4">
          <Button
            data-cy="toggle"
            className="mb-4"
            onClick={() => setCyHref('https://www.cypress.io')}
          >
            Toggle
          </Button>

          <Button href={cyHref}>DS Button</Button>
        </div>
      )
    }
    mount(<SUT />)

    cy.get('button').should('not.have.attr', 'href')

    cy.findByTestId('toggle').click()

    cy.get('a').should('have.attr', 'href', 'https://www.cypress.io')
  })

  it('uses the type as an attribute', () => {
    mount(<Button type="submit">Submit</Button>)

    cy.get('button').should('have.attr', 'type', 'submit')
  })

  describe('Disabled Variants', () => {
    it('should maintain dark-mode variants when disabled', () => {
      mount(
        <Button variant="red-dark-mode" disabled>
          Red Dark Mode
        </Button>,
      )

      // Check that the button maintains its variant
      cy.get('button').should('have.class', 'bg-red-500')
      cy.get('button').should('have.class', 'disabled:bg-gray-1000')
      cy.get('button').should('be.disabled')
    })

    it('should apply disabled variants for non-dark-mode buttons', () => {
      mount(
        <Button variant="white" disabled>
          White Button
        </Button>,
      )

      // Check that the button has the correct disabled variant
      cy.get('button').should('have.class', 'bg-white')
      cy.get('button').should('have.class', 'disabled:text-gray-500')
      cy.get('button').should('be.disabled')
    })

    it('should not modify special variants when disabled', () => {
      mount(
        <Button variant="outline-light" disabled>
          Outline Light
        </Button>,
      )

      // Check that the button has the correct disabled variant
      cy.get('button').should('have.class', 'text-indigo-500')
      cy.get('button').should('have.class', 'disabled:text-gray-500')
      cy.get('button').should('be.disabled')
    })
  })

  function mountStory(options: Parameters<typeof ButtonStory>[0] = {}) {
    mount(<ButtonStory {...options} />)
  }
  assertions(mountStory)
})
