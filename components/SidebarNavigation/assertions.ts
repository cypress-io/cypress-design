/// <reference types="cypress" />

import type { NavGroup, NavItemLink } from './constants'

const menuItems = [
  {
    text: 'Runs',
    href: '#',
  },
  {
    text: 'Reviews',
    href: '#',
  },
  {
    text: 'Branches',
    href: '#',
  },
  {
    text: 'Insights',
    items: [
      {
        text: 'Run status',
        href: '#',
      },
      {
        text: 'Run duration',
        href: '#',
      },
      {
        text: 'Test suite size',
        href: '#',
      },
      {
        text: 'Top failures',
        href: '#',
      },
      {
        text: 'Slowest tests',
        href: '#',
      },
      {
        text: 'Most common errors',
        href: '#',
      },
      {
        text: 'Flaky tests',
        href: '#',
      },
    ],
  },
  {
    text: 'Settings',
    href: '#',
  },
] satisfies (NavItemLink | NavGroup)[]

export default function assertions(
  mountStory: (options?: (NavItemLink | NavGroup)[]) => void,
): void {
  it('renders', () => {
    mountStory(menuItems)
  })

  // it('closes the menu', () => {
  //   mountStory(menuItems)

  //   cy.contains('Runs').should('be.visible')
  //   cy.contains('button', 'Overview').click()

  //   cy.contains('Overview Item 1').should('not.be.visible')
  // })
}
