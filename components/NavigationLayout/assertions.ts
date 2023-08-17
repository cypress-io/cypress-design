/// <reference types="cypress" />

//   TMP: How to share types?
// TODO: Remove relative paths
import type { NavigationLayoutInterface } from './constants/dist'
import type {
  NavGroup,
  NavItemLink,
} from '@cypress-design/constants-SidebarNavigation'

import { IconGeneralPlaceholder } from '@cypress-design/react-icon'

const menuItems: (NavItemLink | NavGroup)[] = [
  {
    text: 'Foo navigation item',
    href: '#',
    icon: IconGeneralPlaceholder,
    active: true,
  },
  {
    text: 'Bar navigation item',
    icon: IconGeneralPlaceholder,
    items: [
      {
        text: 'Example sub-navigation item',
        href: '#',
        active: true,
      },
    ],
  },
  {
    text: 'Baz navigation item',
    href: '#',
    icon: IconGeneralPlaceholder,
  },
]

export default function assertions(
  mountStory: (args: NavigationLayoutInterface) => void,
): void {
  context('at 1280x720 resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

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
        navigation: [
          {
            name: 'Cypress',
            href: '#',
            icon: IconGeneralPlaceholder,
            current: true,
          },
        ],
      })

      cy.get('nav').should('be.visible')
    })
  })

  // context('at iphone-5 resolution', () => {
  //   beforeEach(() => {
  //     cy.viewport('iphone-5')
  //   })

  //   it('displays mobile menu on click', () => {
  //     cy.get('nav .desktop-menu').should('not.be.visible')
  //     cy.get('nav .mobile-menu')
  //       .should('be.visible')
  //       .find('i.hamburger')
  //       .click()

  //     cy.get('ul.slideout-menu').should('be.visible')
  //   })
  // })
}
