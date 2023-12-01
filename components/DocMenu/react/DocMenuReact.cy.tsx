/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import DocMenu from './index'
import assertions from '../assertions'
import { NavGroup, NavItemLink } from '../constants'

describe('<DocMenu/>', () => {
  it('works with 1 level of items', () => {
    mount(<DocMenu items={[{ href: '/foo', label: 'Foo' }]} />)
  })

  it('works with 2 level of items', () => {
    mount(
      <DocMenu
        items={[{ label: 'Bar', items: [{ href: '/foo', label: 'Foo' }] }]}
      />,
    )
  })

  it('works with 3 level of items', () => {
    mount(
      <DocMenu
        items={[
          {
            label: 'Baaaaaaz',
            items: [{ label: 'Bar', items: [{ href: '/foo', label: 'Foo' }] }],
          },
        ]}
      />,
    )
  })

  it('renders the custom link components', () => {
    mount(
      <DocMenu
        items={[
          {
            label: 'Baaaaaaz',
            items: [{ label: 'Bar', items: [{ href: '/foo', label: 'Foo' }] }],
          },
        ]}
        LinkComponent={({ href, className, children }) => (
          <div className={className}>
            {children} + href: {href}
          </div>
        )}
      />,
    )
    cy.findByText('Bar').click()
    cy.findByText('Foo + href: /foo', { selector: 'div' }).should('be.visible')
  })

  function mountStory(items: (NavItemLink | NavGroup)[] = []) {
    mount(<DocMenu items={items} />)
  }
  assertions(mountStory)
})
