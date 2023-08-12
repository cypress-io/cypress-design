/// <reference types="cypress" />
import React from 'react'
import type { NavGroup, NavItemLink } from './constants/dist'
import { IconTechnologyDebugger } from '@cypress-design/react-icon'

const menuItems = [
  {
    text: 'Runs',
    href: '#',
    icon: () => (
      <IconTechnologyDebugger strokeColor="indigo-600" fillColor="red-200" />
    ),
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
    projects?: Array<{ id: string; label: string }>,
  ) => void,
): void {
  it('renders', () => {
    mountStory(menuItems, 'Gatsby', 'Design System', [
      { id: '1', label: 'project1' },
      { id: '2', label: 'project2' },
    ])
  })
}
