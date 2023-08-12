/// <reference types="cypress" />
import React from 'react'
import type { NavGroup, NavItemLink } from './constants/dist'
import {
  IconGeneralPlaceholder,
  IconTechnologyDebugger,
} from '@cypress-design/react-icon'
import type { SidebarNavigationInterface } from './constants/dist'
import { IconStatusPlaceholderSimple } from '@cypress-design/vue-icon'

const menuItems: (NavItemLink | NavGroup)[] = [
  {
    text: 'Runs',
    href: '#',
    icon: IconGeneralPlaceholder,
  },
  {
    text: 'Reviews',
    href: '#',
    icon: IconGeneralPlaceholder,
  },
  {
    text: 'Branches',
    href: '#',
    icon: IconGeneralPlaceholder,
  },
  {
    text: 'Insights',
    icon: IconGeneralPlaceholder,
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
    icon: IconGeneralPlaceholder,
  },
]

export default function assertions(
  mountStory: (args: SidebarNavigationInterface) => void,
): void {
  it('renders', () => {
    mountStory({
      items: menuItems,
      currentTeam: 'Gatsby',
      currentProject: 'Design System',
      projects: [
        { id: '1', label: 'project1' },
        { id: '2', label: 'project2' },
      ],
    })
  })
}
