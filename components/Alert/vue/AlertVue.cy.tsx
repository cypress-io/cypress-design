/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import AlertStory from './Alert.rootstory'

describe('<Alert />', { viewportHeight: 800 }, () => {
  it('renders', () => {
    mount(() => <AlertStory />)
    cy.get('[data-cy="alert-3"]').should('be.visible')
    cy.percySnapshot()
  })
})
