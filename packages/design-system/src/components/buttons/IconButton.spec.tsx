import React from 'react'
import { mount } from '@cypress/react'
import { IconButton } from './IconButton'
import { default as palette } from '../../styles/exports.scss'

it('renders regular icon button', () => {
  mount(<IconButton icon="close" />)

  cy.get('.cy-icon-button div')
    .should('have.css', 'border-radius')
    .and('eq', '2px')
})

it('renders round icon button', () => {
  mount(<IconButton icon="close" isCircle />)

  cy.get('.cy-icon-button div')
    .should('have.css', 'border-radius')
    .and('eq', '18px')
})

it('has disabled variant', () => {
  mount(<IconButton icon="close" disabled />)

  cy.get('.cy-icon-button').should('have.color', palette.gray400)
})
