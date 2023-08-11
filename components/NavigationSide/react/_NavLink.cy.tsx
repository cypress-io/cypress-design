/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import { NavLink, NavLinkProps } from './_NavLink'

describe('NavLink', () => {
  it('renders', () => {
    const props: NavLinkProps = {
      item: {
        label: 'NavLink Label',
        href: '/navlink',
      },
      expanded: false,
    }

    mount(<NavLink {...props} />)

    cy.get('a')
      .should('be.visible')
      .and('have.attr', 'href', props.item.href)
      .and('contain', props.item.label)
  })
})
