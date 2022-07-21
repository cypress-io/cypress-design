/// <reference types="cypress" />
import { mount } from 'cypress/vue'

import { SimpleStatusIcon, StatusIcon } from '@cypress-design/vue-statusicon'
import StatusIconStory from './StatusIcon.rootstory'

describe('StatusIcon', () => {
  it('renders', () => {
    mount(StatusIconStory)
  })

  it('running icon spins', () => {
    mount(() => {
      return <SimpleStatusIcon size="16" status="running" />
    })

    cy.get('svg').should('have.class', 'animate-spin')
  })

  it('small running icon does not spin', () => {
    mount(() => {
      return <StatusIcon variant="simple" size="4" status="running" />
    })

    cy.get('svg').should('not.have.class', 'animate-spin')
  })

  it('other icons do not spin', () => {
    mount(() => {
      return <StatusIcon variant="simple" size="16" status="passed" />
    })

    cy.get('svg').should('not.have.class', 'animate-spin')
  })

  it('defaults to a variant that exists if the one provided does not exist', () => {
    mount(() => {
      return (
        <div>
          <StatusIcon variant="simple" size="16" status="placeholder" />
          <StatusIcon variant="solid" size="16" status="placeholder" />
        </div>
      )
    })

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  it('displays a placeholder icon if no status is passed', () => {
    mount(() => {
      return (
        <div>
          <StatusIcon variant="simple" size="16" />
          <StatusIcon variant="solid" size="16" status="placeholder" />
        </div>
      )
    })

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  it('displays a placeholder icon if null status is passed', () => {
    mount(() => {
      return (
        <div>
          <StatusIcon variant="simple" size="16" status={null} />
          <StatusIcon variant="simple" size="16" status="placeholder" />
        </div>
      )
    })

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })
})
