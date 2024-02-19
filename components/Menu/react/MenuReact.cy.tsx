/// <reference types="cypress" />

import * as React from 'react'
import {
  IconGeneralChatBubble,
  IconTechnologyServerAlt,
  IconTechnologyGitBranches,
} from '@cypress-design/react-icon'
import { mount } from 'cypress/react18'
import Menu from './Menu'
import IconChat from './_IconGeneralChatBubble'
import IconServer from './_IconTechServer'
import IconGitBranches from './_IconTechGitBranches'

describe('Menu', () => {
  it('renders', () => {
    mount(
      <Menu
        items={[
          {
            label: 'Runs',
            icon: IconTechnologyServerAlt,
            iconActive: IconServer,
          },
          {
            label: 'Reviews',
            icon: (props) => <IconGeneralChatBubble {...props} />,
            iconActive: IconChat,
          },
          {
            label: 'Branches',
            icon: (props) => <IconTechnologyGitBranches {...props} />,
            iconActive: IconGitBranches,
          },
        ]}
      />,
    )
  })
})
