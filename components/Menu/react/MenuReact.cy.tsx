/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Menu from './index'
import assertions from '../assertions'
import { NavGroup, NavItemLink } from '../constants'

describe('<DocMenu/>', () => {
  it('works with 1 level of items', () => {
    mount(<Menu items={[{ href: '/foo', label: 'Foo' }]} />)
  })

  it('works with 2 level of items', () => {
    mount(
      <Menu
        items={[{ label: 'Bar', items: [{ href: '/foo', label: 'Foo' }] }]}
      />,
    )
  })

  it('works with 3 level of items', () => {
    mount(
      <Menu
        items={[
          {
            label: 'Baaaaaaz',
            items: [
              {
                label: 'Bar',
                items: [{ href: '/foo', label: 'Foo' }],
              },
            ],
          },
        ]}
      />,
    )
  })

  it(
    'wraps items correctly',
    { viewportHeight: 950, viewportWidth: 550 },
    () => {
      const Sut = () => {
        const [activeHref, setActiveHref] = React.useState<string | undefined>()

        return (
          <div className="w-[400px] mt-[60px] mx-[24px] absolute">
            <Menu
              activePath={activeHref}
              LinkComponent={({ href, className, children, style }) => (
                <div
                  style={style}
                  className={className}
                  onClick={() => setActiveHref(href)}
                >
                  {children}
                </div>
              )}
              items={[
                {
                  href: '/fooTop',
                  label: 'Foo Top',
                },
                {
                  href: '/test',
                  label: 'Getting started',
                },
                {
                  href: '/faaz',
                  label:
                    'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,',
                },
                {
                  label: 'Baaaaaaz',
                  items: [
                    {
                      label: 'Bar',
                      items: [
                        {
                          href: '/foo',
                          label: 'Foo',
                        },
                        {
                          href: '/test',
                          label: 'Getting started',
                        },
                      ],
                    },
                    {
                      label: 'Code',
                      collapsed: true,
                      items: [
                        {
                          href: '/faa',
                          label: 'sasassa',
                        },
                        {
                          href: '/faa1',
                          label: 'sasassa2',
                        },
                        {
                          href: '/faa2',
                          label: 'sasassa3',
                        },
                        {
                          href: '/faa3',
                          label: 'sasassa4',
                        },
                        {
                          href: '/faa4',
                          label:
                            'lorem ipsum dolor sit amet consectetur adipisicing elit',
                        },
                        {
                          href: '/faa5',
                          label: 'sasassa5',
                        },
                        {
                          href: '/faa6',
                          label:
                            'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos',
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
        )
      }
      mount(<Sut />)

      cy.findByText('Bar').click()
      cy.findByText('Code').click().click()
      cy.findByText(
        'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos',
      ).click()
      cy.findByText('Code').click()
      cy.get('[data-cy=doc-menu-active-marker]').should('not.exist')
    },
  )

  it('renders the custom link components', () => {
    mount(
      <Menu
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

    cy.findByText('Foo + href: /foo', { selector: 'div' }).should('be.visible')
  })

  function mountStory(items: (NavItemLink | NavGroup)[] = [], activePath = '') {
    mount(<Menu items={items} activePath={activePath} />)
  }
  assertions(mountStory)
})

// pseudo text
// lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos