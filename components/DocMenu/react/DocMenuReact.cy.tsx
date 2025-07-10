/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import DocMenu from './index'
import assertions, { BIG_ITEMS_SET } from '../assertions'
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
            <DocMenu
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
              items={BIG_ITEMS_SET}
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

    cy.findByText('Foo + href: /foo', { selector: 'div' }).should('be.visible')
  })

  function mountStory(items: (NavItemLink | NavGroup)[] = [], activePath = '') {
    mount(
      <div className="p-4">
        <DocMenu items={items} activePath={activePath} />
      </div>,
    )
  }

  assertions(mountStory, () => {
    const SUT = () => {
      const [pathState, setPathState] = React.useState<string>('/foo')
      return (
        <>
          <button onClick={() => setPathState('/kephren')}>
            Set path to /kephren
          </button>
          <DocMenu
            items={[
              {
                label: 'Section 1',
                items: [
                  { href: '/foo', label: 'Foo' },
                  {
                    label: 'Subsection',
                    items: [{ href: '/sub', label: 'Sub' }],
                  },
                ],
              },
              {
                label: 'Pyramid',
                items: [{ href: '/kephren', label: 'Kephren' }],
                collapsed: true,
              },
            ]}
            LinkComponent={({ href, children, style, ...props }) => (
              <button
                onClick={() => setPathState(href)}
                {...props}
                style={{ ...style, textAlign: 'left' }}
              >
                {children}
              </button>
            )}
            activePath={pathState}
            collapsible
          />
        </>
      )
    }
    mount(<SUT />)
  })

  it('scrolls the active item into view', { viewportHeight: 200 }, () => {
    const SUT = () => {
      const [pathState, setPathState] = React.useState<string>('/foo')
      return (
        <div className="p-4">
          <button
            onClick={() => setPathState('/faa6')}
            className="p-2 m-2 rounded bg-gray-100 border border-gray-300"
          >
            Set path to <code>/faa6</code>
          </button>
          <DocMenu
            items={BIG_ITEMS_SET}
            LinkComponent={({ href, children, style, ...props }) => (
              <button
                onClick={() => setPathState(href)}
                {...props}
                style={{ ...style, textAlign: 'left' }}
              >
                {children}
              </button>
            )}
            activePath={pathState}
            collapsible
          />
        </div>
      )
    }
    mount(<SUT />)

    cy.findByText('Code').click()
    cy.contains('Set path to').click()
    cy.wait(200)
    cy.contains('Quisquam, quos').then(($el) => {
      const windowInnerHeight = Cypress.config(`viewportHeight`)

      const rect = ($el?.[0] as any).getBoundingClientRect()

      expect(windowInnerHeight).to.be.greaterThan(rect.top)
    })
  })
})
