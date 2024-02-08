/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Menu from './Menu'

describe('Menu', () => {
  it('renders', () => {
    mount(
      <Menu
        items={[
          { label: 'Item 1' }, //
          { label: 'Item 2' },
          { label: 'Item 3' },
        ]}
      />,
    )
  })
})
