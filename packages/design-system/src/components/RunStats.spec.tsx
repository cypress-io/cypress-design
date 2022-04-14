import React from 'react'
import { mount } from '@cypress/react'
import { RunStats } from './RunStats'

describe('RunStats', () => {
  it('should display all stats when values are non-zero', () => {
    mount(
      <RunStats skipped={7} pending={10} passed={22} failed={1} flaky={4} />
    )
    cy.getCy('run-stats').get('li').should('have.length', 4)
  })

  it('should hide stats that are zero', () => {
    mount(<RunStats skipped={0} pending={0} passed={1} failed={0} />)
    cy.getCy('run-stats').get('li').should('have.length', 1)
  })

  it('should show stats that are zero when "expanded" prop is used', () => {
    mount(<RunStats skipped={0} pending={0} passed={1} failed={0} expanded />)
    cy.getCy('run-stats').get('li').should('have.length', 4)
  })
})
