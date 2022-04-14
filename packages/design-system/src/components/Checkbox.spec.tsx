import { getCssColor } from '@frontend/dashboard/cypress/util/get_css_color'

import React from 'react'
import { mount } from '@cypress/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('has checked state', () => {
    mount(<Checkbox isChecked label="Foo" onClick={() => {}} />)
    cy.getCy('cy-checkbox')
      .get('label')
      .before('background-color')
      .should('eq', getCssColor('indigo400'))
    cy.getCy('cy-checkbox')
      .get('label')
      .before('background-image')
      .should('include', 'url')
  })

  it('has unchecked state', () => {
    mount(<Checkbox label="Foo" onClick={() => {}} />)
    cy.getCy('cy-checkbox')
      .get('label')
      .before('background-color')
      .should('eq', 'rgb(255, 255, 255)')
    cy.getCy('cy-checkbox')
      .get('label')
      .before('background-image')
      .should('eq', 'none')
  })

  it('has disabled state', () => {
    mount(<Checkbox isDisabled label="Foo" onClick={() => {}} />)
    cy.getCy('cy-checkbox')
      .get('label')
      .before('background-color')
      .should('eq', getCssColor('gray50'))
    cy.getCy('cy-checkbox')
      .get('label')
      .should('have.css', 'cursor')
      .and('eq', 'not-allowed')
  })

  it('has checked & disabled state', () => {
    mount(<Checkbox isChecked isDisabled label="Foo" onClick={() => {}} />)
    cy.getCy('cy-checkbox')
      .get('label')
      .before('background-color')
      .should('eq', getCssColor('gray50'))
    cy.getCy('cy-checkbox')
      .get('label')
      .should('have.css', 'cursor')
      .and('eq', 'not-allowed')
    cy.getCy('cy-checkbox')
      .get('label')
      .before('background-image')
      .should('include', 'url')
    cy.getCy('cy-checkbox')
      .get('label')
      .should('have.css', 'color')
      .and('eq', getCssColor('gray500'))
  })
})
