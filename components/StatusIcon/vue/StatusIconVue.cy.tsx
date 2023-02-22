/// <reference types="cypress" />
import { mount } from 'cypress/vue'

import { SimpleStatusIcon, StatusIcon } from '@cypress-design/vue-statusicon'
import StatusIconStory from './StatusIcon.rootstory'

describe('StatusIcon', () => {
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

  it('displays a placeholder icon if undefined status is passed', () => {
    mount(() => {
      return (
        <div>
          <StatusIcon variant="simple" size="16" status={undefined} />
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

  it('renders', () => {
    mount(StatusIconStory)
    cy.percySnapshot()
  })
})
