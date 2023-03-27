/// <reference types="cypress" />

import type { NavGroup, NavItemLink } from './constants'

const menuItems = [
  {
    text: 'Get Started',
    href: '#',
  },
  {
    text: 'Overview',
    items: [
      {
        text: 'Overview Item 1',
        href: '#',
      },
      {
        text: 'Overview Item 2',
        href: '#',
      },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Item 1',
        href: '#',
      },
      {
        text: 'Item 2',
        href: '#',
      },
    ],
  },
  {
    text: 'End-to-End Testing',
    items: [
      {
        text: 'Introduction to E2E Testing',
        items: [
          {
            text: 'Item 1',
            href: '#',
          },
          {
            text: 'partition under the quick brown fox jumps over the lazy dog',
            items: [
              {
                text: 'Item 1',
                href: '#',
                active: true,
              },
              {
                text: 'Item 2',
                href: '#',
              },
            ],
          },
          {
            text: 'Item 2',
            href: '#',
            active: true,
          },
        ],
      },
      {
        text: 'AWS Authentication',
        href: '#',
      },
      {
        active: true,
        text: 'Google Authentication',
        href: '#',
      },
      {
        text: 'Okta Authentication',
        href: '#',
      },
    ],
  },
] satisfies (NavItemLink | NavGroup)[]

export default function assertions(
  mountStory: (options?: (NavItemLink | NavGroup)[]) => void
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
    cy.contains('over the lazy').click()

    cy.contains('Google Authentication').scrollIntoView()
  })
}
