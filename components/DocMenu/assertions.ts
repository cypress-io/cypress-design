/// <reference types="cypress" />

import type { NavGroup } from './constants'

const menuItems = [
  {
    text: 'Overview',
    items: [
      {
        text: 'Overview Item 1',
        href: 'https://example.com',
      },
      {
        text: 'Overview Item 2',
        href: 'https://example.com',
      },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Item 1',
        href: 'https://example.com',
      },
      {
        text: 'Item 2',
        href: 'https://example.com',
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
            href: 'https://example.com',
          },
          {
            text: 'Item 2',
            href: 'https://example.com',
          },
        ],
      },
      {
        text: 'AWS Authentication',
        href: 'https://example.com',
      },
      {
        active: true,
        text: 'Google Authentication',
        href: 'https://example.com',
      },
      {
        text: 'Okta Authentication',
        href: 'https://example.com',
      },
    ],
  },
]

export default function assertions(
  mountStory: (options?: NavGroup[]) => void
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
}
