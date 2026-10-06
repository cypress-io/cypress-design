/// <reference types="cypress" />
import { ref } from 'vue'
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

  it('follows the open prop when it changes after mount', () => {
    const open = ref(false)
    mount(() => (
      <div>
        <button id="toggle" onClick={() => (open.value = !open.value)}>
          Toggle
        </button>
        <Accordion title="hi" open={open.value}>
          Content
        </Accordion>
      </div>
    ))

    cy.get('details').should('not.have.attr', 'open')
    cy.get('#toggle').click()
    cy.get('details').should('have.attr', 'open')
    cy.get('#toggle').click()
    cy.get('details').should('not.have.attr', 'open')
  })

  it('can be passed an icon as a prop', () => {
    mount(Accordion as any, {
      props: {
        title: 'hi',
        icon: IconActionQuestionMarkCircle,
      },
    }).get('summary svg')
  })

  it('can be passed an icon as an element', () => {
    mount(Accordion as any, {
      slots,
      props: {
        title: 'hi',
      },
    }).get('[data-cy=icon-element]')
  })

  it('when passed both icon and iconEl, iconEl overrides icon', () => {
    mount(Accordion as any, {
      icon: IconActionQuestionMarkCircle,
      slots,
      props: {
        title: 'hi',
      },
    }).get('[data-cy=icon-element]')

    cy.get('summary').find('svg').should('have.length', 2)
  })
})
