/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
// import NavigationSideStory from './NavigationSide.rootstory'
import NavigationSide from './NavigationSide'
import { IconTechnologyCodeEditor } from '@cypress-design/react-icon'
// import assertions from '../assertions'

const items = [
  {
    active: true,
    href: '/specs',
    label: 'specs',
    icon: <IconTechnologyCodeEditor fillColor="transparent" />,
  },
  {
    href: '/debug',
    label: 'debug',
  },
  {
    href: '/runs',
    label: 'runs',
  },
  {
    href: '/settings',
    label: 'settings',
  },
]

describe('NavigationSide', () => {
  it('renders', () => {
    mount(<NavigationSide items={items} />)
    cy.get('nav').should('be.visible')
  })
  // function mountStory(options: Parameters<typeof NavigationSideStory>[0] = {}) {
  //   mount(<NavigationSideStory {...options} />)
  // }
  // assertions(mountStory)
})
