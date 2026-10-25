/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import SpecResults from './SpecResults/AllStates'

// SpecResults ships React only, so its gallery is mounted on its own. See
// AllStatesVue.cy.ts for why the galleries are snapshotted.
describe('All states galleries (React)', { viewportWidth: 1280 }, () => {
  it('SpecResults', () => {
    mount(React.createElement(SpecResults))
    cy.get('[data-cy="spec-results-bar"]').should('have.length.above', 0)
    cy.percySnapshot('SpecResults all states - react')
  })
})
