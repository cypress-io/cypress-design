/// <reference types="cypress" />

import type { NavGroup, NavItemLink } from './constants'

const menuItems = [
  {
    label: 'Get Started',
    href: '#',
  },
  {
    label: 'Overview',
    items: [
      {
        label: 'Overview Item 1',
        href: '#',
      },
      {
        label: 'Overview Item 2',
        href: '#',
      },
    ],
  },
  {
    label: 'Getting Started',
    items: [
      {
        label: 'Item 1',
        href: '#',
      },
      {
        label: 'Item 2',
        href: '#',
      },
    ],
  },
  {
    label: 'End-to-End Testing',
    items: [
      {
        label: 'Introduction to E2E Testing',
        items: [
          {
            label: 'Item 1',
            href: '#',
          },
          {
            label: 'sub menu',
            items: [
              {
                label: 'Item 1',
                href: '#',
                active: true,
              },
              {
                label: 'Item 2',
                href: '#',
              },
            ],
          },
          {
            label: 'Item 2',
            href: '#',
            active: true,
          },
        ],
      },
      {
        label: 'AWS Authentication',
        href: '#',
      },
      {
        active: true,
        label: 'Google Authentication',
        href: '#',
      },
      {
        label: 'Okta Authentication',
        href: '#',
      },
    ],
  },
] satisfies (NavItemLink | NavGroup)[]

export default function assertions(
  mountStory: (options?: (NavItemLink | NavGroup)[]) => void,
): void {
  it('renders', () => {
    mountStory(menuItems)
  })

  it('closes the menu', () => {
    mountStory(menuItems)

    cy.contains('Overview Item 1').should('be.visible')
    cy.contains('button', 'Overview').click()

    cy.contains('Overview Item 1').should('not.be.visible')
  })

  it('keeps track of active values', () => {
    mountStory(menuItems)

    cy.contains('Introduction').click()
    cy.contains('sub menu').click()

    cy.contains('Google Authentication').scrollIntoView()
  })
}
