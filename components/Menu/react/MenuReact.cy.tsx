/// <reference types="cypress" />

import * as React from 'react'
import {
  IconGeneralChatBubble,
  IconTechnologyServerAlt,
} from '@cypress-design/react-icon'
import { mount } from 'cypress/react18'
import Menu from './Menu'
import IconChat from './_IconGeneralChatBubble'
import IconServer from './_IconTechServer'

describe('Menu', () => {
  it('renders', () => {
    mount(
      <Menu
        items={[
          {
            label: 'Item 1',
            icon: IconGeneralChatBubble,
            iconActive: IconChat,
          }, //
          {
            label: 'Item 2',
            icon: IconTechnologyServerAlt,
            iconActive: IconServer,
          },
          // { label: 'Item 3', iconActive: IconServer },
        ]}
      />,
    )
  })
})
