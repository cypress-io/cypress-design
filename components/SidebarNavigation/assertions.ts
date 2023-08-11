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
  mountStory: (
    items?: (NavItemLink | NavGroup)[],
    currentTeam?: string,
    currentProject?: string,
    projects?: string[],
  ) => void,
): void {
  it('renders', () => {
    mountStory(menuItems, 'Gatsby', 'Design System', ['project1', 'project2'])
  })
}
