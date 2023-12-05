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
            items: [
              {
                label: 'Bar',
                items: [{ href: '/foo', label: 'Foo', active: true }],
              },
            ],
          },
        ]}
      />,
    )
  })

  it(
    'wraps items correctly',
    { viewportHeight: 950, viewportWidth: 350 },
    () => {
      const Sut = () => {
        const [activeHref, setActiveHref] = React.useState<string | undefined>()

        return (
          <div className="w-[200px] mt-[60px] absolute">
            <DocMenu
              LinkComponent={({ href, className, children }) => (
                <div className={className} onClick={() => setActiveHref(href)}>
                  {children}
                </div>
              )}
              items={[
                {
                  href: '/foo',
                  label: 'Foo',
                  active: activeHref === '/foo',
                },
                {
                  href: '/test',
                  label: 'Getting started',
                  active: activeHref === '/test',
                },
                {
                  href: '/faaz',
                  label:
                    'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,',
                  active: activeHref === '/faaz',
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
                          active: activeHref === '/foo',
                        },
                        {
                          href: '/test',
                          label: 'Getting started',
                          active: activeHref === '/test',
                        },
                      ],
                    },
                    {
                      label: 'Code',
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
                          active: activeHref === '/faa4',
                        },
                        {
                          href: '/faa5',
                          label: 'sasassa5',
                        },
                        {
                          href: '/faa',
                          label:
                            'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos',
                          active: activeHref === '/faa',
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
      cy.findByText('Code').click()
      cy.findByText(
        'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos',
      ).click()
    },
  )

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

// pseudo text
// lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos
