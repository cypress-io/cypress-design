/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import Spinner from './Spinner.vue'

describe('<Spinner />', () => {
  it('renders', () => {
    mount(() => <Spinner />)
    cy.get('svg').should('be.visible')
    cy.percySnapshot()
  })

  it('renders dark', () => {
    mount(() => (
      <div class="bg-gray-1000 p-6">
        <Spinner variant="dark" />
      </div>
    ))
    cy.get('svg').should('be.visible')
    cy.percySnapshot()
  })
})
