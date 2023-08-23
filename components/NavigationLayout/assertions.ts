/// <reference types="cypress" />

import type { NavigationLayoutInterface } from '@cypress-design/constants-navigationlayout'
import type {
  NavGroup,
  NavItemLink,
  IconInterface,
} from '@cypress-design/constants-SidebarNavigation'

import { IconGeneralPlaceholder } from '@cypress-design/react-icon'

// TODO: consider how to remove this interface, it seems probably unnecessary
interface IconGeneralPlaceholderProps extends IconInterface {}

// Data for SidebarNavigation
const menuItems: (NavItemLink | NavGroup)[] = [
  {
    text: 'Foo navigation item',
    href: '#',
    icon: IconGeneralPlaceholder as React.FC<IconGeneralPlaceholderProps>,
    active: false,
  },
  {
    text: 'Bar navigation item',
    icon: IconGeneralPlaceholder,
    items: [
      {
        text: 'Sub-item',
        href: '#',
        active: false,
      },
      {
        text: 'Sub-item',
        href: '#',
        active: true,
      },
      {
        text: 'Sub-item',
        href: '#',
        active: false,
      },
    ],
  },
  {
    text: 'Baz navigation item',
    href: '#',
    icon: IconGeneralPlaceholder,
  },
]

// Data for NavigationLayout
const navigationLayoutStoryData = {
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
  navigation: [
    {
      name: 'Cypress',
      href: '#',
      icon: IconGeneralPlaceholder,
      current: true,
    },
  ],
}

export default function assertions(
  mountStory: (args: NavigationLayoutInterface) => void,
): void {
  context('at 1280x720 resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('renders', () => {
      mountStory(navigationLayoutStoryData)

      cy.get('nav').should('be.visible')
    })
  })

  context('at iphone-5 resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-5')
    })

    it('displays mobile menu on click', () => {
      mountStory(navigationLayoutStoryData)
      // cy.get('nav .desktop-menu').should('not.be.visible')
      // cy.get('nav .mobile-menu')
      //   .should('be.visible')
      //   .find('i.hamburger')
      //   .click()

      // cy.get('ul.slideout-menu').should('be.visible')
    })
  })
}
