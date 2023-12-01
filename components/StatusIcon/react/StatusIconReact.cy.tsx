/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import StatusIcon from './StatusIcon'
import { Story as StatusIconStory } from './StatusIcon.rootstory'

describe('StatusIcon', () => {
  it('defaults to a variant that exists if the one provided does not exist', () => {
    mount(
      <div>
        <StatusIcon
          key="simple"
          variant="simple"
          size="16"
          status="placeholder"
        />
        <StatusIcon
          key="solid"
          variant="solid"
          size="16"
          status="placeholder"
        />
      </div>,
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
        <StatusIcon key="simple" variant="simple" size="16" />
        <StatusIcon
          key="solid"
          variant="solid"
          size="16"
          status="placeholder"
        />
      </div>,
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
        <StatusIcon key="simple-1" variant="simple" size="16" status={null} />
        <StatusIcon
          key="simple-2"
          variant="simple"
          size="16"
          status="placeholder"
        />
      </div>,
    )

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  it('renders', () => {
    mount(<StatusIconStory />)
    cy.percySnapshot()
  })
})
