/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import DocMenuStory from './DocMenu.rootstory'
import DocMenu from './index'
import assertions from '../assertions'
import { NavGroup, NavItemLink } from '../constants'

describe('<DocMenu/>', () => {
  it('works with 1 level of items', () => {
    mount(<DocMenu items={[{ href: '/foo', label: 'Foo' }]} />)
  })

  it('works with 2 level of items', () => {
    mount(
      <DocMenu
        items={[{ label: 'Bar', items: [{ href: '/foo', label: 'Foo' }] }]}
      />,
    )
  })

  it('works with 3 level of items', () => {
    mount(
      <DocMenu
        items={[
          {
            label: 'Baaaaaaz',
            items: [{ label: 'Bar', items: [{ href: '/foo', label: 'Foo' }] }],
          },
        ]}
      />,
    )
  })

  function mountStory(items: (NavItemLink | NavGroup)[] = []) {
    mount(<DocMenuStory items={items} />)
  }
  assertions(mountStory)
})
