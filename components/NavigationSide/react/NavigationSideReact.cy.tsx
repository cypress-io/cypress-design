/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
// import NavigationSideStory from './NavigationSide.rootstory'
import NavigationSide from './NavigationSide'
import assertions from '../assertions'

const items = [
  {
    active: true,
    href: '/specs',
    text: 'specs',
  },
  {
    href: '/debug',
    text: 'debug',
  },
  {
    href: '/runs',
    text: 'runs',
  },
  {
    href: '/reviews',
    text: 'reviews',
  },
  {
    href: '/branches',
    text: 'branches',
  },
  {
    href: '/insights',
    text: 'insights',
  },
  {
    href: '/settings',
    text: 'settings',
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
