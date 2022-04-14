import React from 'react'
import { mount } from '@cypress/react'
import { CustomIcon } from './CustomIcon'
import '../../../cypress/spec-styles.css'

it('displays', () => {
  mount(<CustomIcon name="security-lock-locked" size="x16" />)

  cy.get('.cy-icon').should('exist')
})

it('can have its color changed by using classes', () => {
  mount(
    <div className="testing">
      <CustomIcon name="security-lock-locked" size="x16" />
    </div>
  )

  cy.get('.cy-icon .icon-dark')
    .should('have.css', 'stroke')
    .and('eq', 'rgb(255, 0, 0)')
})

it('can display at sizes other than its designed size', () => {
  mount(
    <CustomIcon name="security-lock-locked" size="x16" width={48} height={48} />
  )

  cy.get('.cy-icon').invoke('outerWidth').should('be.eq', 48)
})

it('can spin', () => {
  mount(<CustomIcon name="security-lock-locked" size="x16" spin />)

  cy.get('.cy-icon').invoke('css', 'animation').should('contain', 'infinite')
})
