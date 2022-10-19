/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import StatusIcon from './StatusIcon'
import StatusIconStory from './StatusIcon.rootstory'

describe('StatusIcon', () => {
  it('renders', () => {
    mount(<StatusIconStory />)
  })

  it('defaults to a variant that exists if the one provided does not exist', () => {
    mount(
      <div>
        <StatusIcon variant="simple" size="16" status="placeholder" />
        <StatusIcon variant="solid" size="16" status="placeholder" />
      </div>
    )

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  it('displays a placeholder icon if no status is passed', () => {
    mount(
      <div>
        <StatusIcon variant="simple" size="16" />
        <StatusIcon variant="solid" size="16" status="placeholder" />
      </div>
    )

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  it('displays a placeholder icon if null status is passed', () => {
    mount(
      <div>
        <StatusIcon variant="simple" size="16" status={null} />
        <StatusIcon variant="simple" size="16" status="placeholder" />
      </div>
    )

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })
})
