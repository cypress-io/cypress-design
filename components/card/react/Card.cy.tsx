/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'

describe('Card', () => {
  it('renders', () => {
    mount(<div className="card">hello</div>)
    cy.get('.card').should('have.css', 'box-shadow', 'none')
  })

  it('renders with shadow', () => {
    mount(<div className="card shadow-marketing-card">hello</div>)
    cy.get('.card').should('have.css', 'box-shadow').and('not.eq', 'none')
  })
})
