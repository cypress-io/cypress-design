/// <reference types="cypress" />
import type {
  NavGroup,
  NavItemLink,
  SidebarNavigationInterface,
} from '@cypress-design/constants-SidebarNavigation'
import {
  IconGeneralPlaceholder,
  // TODO: replace these with correct new icons
  // IconTechnologyServer,
  // IconGeneralChatBubble,
  // IconTechnologyBranchH,
  // IconViewPieChart,
  // IconObjectGear
} from '@cypress-design/react-icon'

const menuItems: (NavItemLink | NavGroup)[] = [
  {
    text: 'Runs',
    href: '#',
    icon: IconGeneralPlaceholder,
    active: true,
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
        active: true,
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
      currentProject: 'Design System',
      currentOrganization: {
        name: 'Gatsby',
        icon: IconGeneralPlaceholder,
      },
      projects: [
        { id: '1', label: 'project1' },
        { id: '2', label: 'project2' },
      ],
    })
  })
}