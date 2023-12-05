/// <reference types="cypress" />

import type { NavGroup, NavItemLink } from './constants'

const menuItems = [
  {
    label: 'Get Started',
    href: 'one',
  },
  {
    label: 'Overview',
    items: [
      {
        label: 'Overview Item 1',
        href: 'two',
      },
      {
        label: 'Overview Item 2',
        href: 'three',
      },
    ],
  },
  {
    label: 'Getting Started',
    items: [
      {
        label: 'Item 1',
        href: 'four',
      },
      {
        label: 'Item 2',
        href: 'five',
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
            href: 'six',
          },
          {
            label: 'sub menu',
            items: [
              {
                label: 'Item 1',
                href: 'seven',
              },
              {
                label: 'Item 2',
                href: 'eight',
              },
            ],
          },
          {
            label: 'Item 2',
            href: 'nine',
          },
        ],
      },
      {
        label: 'AWS Authentication',
        href: 'aws',
      },
      {
        label: 'Google Authentication',
        href: 'google',
      },
      {
        label: 'Okta Authentication',
        href: 'okta',
      },
    ],
  },
] satisfies (NavItemLink | NavGroup)[]

export default function assertions(
  mountStory: (
    options?: (NavItemLink | NavGroup)[],
    activePath?: string,
  ) => void,
): void {
  it('renders', () => {
    mountStory(menuItems, 'eight')
  })

  it('closes the menu', () => {
    mountStory(menuItems, 'eight')

    cy.contains('Overview Item 1').should('be.visible')
    cy.contains('button', 'Overview').click()

    cy.contains('Overview Item 1').should('not.be.visible')
  })

  it('keeps track of active values', () => {
    mountStory(menuItems, 'eight')

    cy.contains('Introduction').click()
    cy.contains('sub menu').click()

    cy.contains('Google Authentication').scrollIntoView()
  })
}
