/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import AccordionStory from './Accordion.rootstory'
import assertions from '../assertions'
import Accordion from './Accordion'
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'

describe('Accordion', () => {
  function mountStory(options: Parameters<typeof AccordionStory>[0] = {}) {
    mount(<AccordionStory {...options} />)
  }

  assertions(mountStory)

  it('can be passed an icon as a prop', () => {
    mount(
      <Accordion title="hi" icon={IconActionQuestionMarkCircle}></Accordion>
    ).get('summary svg')
  })

  it('can be passed an icon as an element', () => {
    mount(
      <Accordion
        title="hi"
        iconEl={
          <IconActionQuestionMarkCircle
            data-cy="icon-element"
            strokeColor="red-600"
            fillColor="red-50"
          />
        }
      ></Accordion>
    ).get('[data-cy=icon-element]')

    cy.percySnapshot()
  })

  it('when passed both icon and iconEl, iconEl overrides icon', () => {
    mount(
      <Accordion
        title="hi"
        icon={IconActionQuestionMarkCircle}
        iconEl={
          <IconActionQuestionMarkCircle
            data-cy="icon-element"
            strokeColor="red-600"
            fillColor="red-50"
          />
        }
      ></Accordion>
    ).get('[data-cy=icon-element]')

    cy.get('summary').find('svg').should('have.length', 2)
  })
})
