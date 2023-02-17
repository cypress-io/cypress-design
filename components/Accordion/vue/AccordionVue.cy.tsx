/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import AccordionStory from './Accordion.rootstory'
import Accordion from './Accordion.vue'
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'

describe('<Accordion/>', () => {
  function mountStory(options: Parameters<typeof AccordionStory>[0] = {}) {
    mount(() => <AccordionStory {...options} />)
  }
  assertions(mountStory)

  const slots = {
    default: () => 'Content',
    iconEl: () => (
      <IconActionQuestionMarkCircle
        data-cy="icon-element"
        strokeColor="red-600"
        fillColor="red-50"
      />
    ),
  }

  it('can be passed an icon as a prop', () => {
    mount(Accordion, {
      props: {
        title: 'hi',
        icon: IconActionQuestionMarkCircle,
      },
    }).get('summary svg')
  })

  it('can be passed an icon as an element', () => {
    mount(Accordion, {
      slots,
      props: {
        title: 'hi',
      },
    }).get('[data-cy=icon-element]')

    cy.percySnapshot()
  })

  it('when passed both icon and iconEl, iconEl overrides icon', () => {
    mount(Accordion, {
      icon: IconActionQuestionMarkCircle,
      slots,
      props: {
        title: 'hi',
      },
    }).get('[data-cy=icon-element]')

    cy.get('summary').find('svg').should('have.length', 2)
  })
})
