/// <reference types="cypress" />

import * as React from 'react'
import {
  IconGeneralChatBubble,
  IconTechnologyServerAlt,
  IconTechnologyGitBranches,
  IconViewPieChart,
} from '@cypress-design/react-icon'
import { mount } from 'cypress/react18'
import Menu from './Menu'
import IconChat from './_IconGeneralChatBubble'
import IconServer from './_IconTechServer'
import IconGitBranches from './_IconTechGitBranches'
import IconViewChart from './_IconViewChart'

describe('Menu', () => {
  it('renders', () => {
    const SUT = () => {
      const [activePath, setActivePath] = React.useState<string>('#runs')
      return (
        <>
          <pre>URL: {activePath}</pre>
          <Menu
            activePath={activePath}
            items={[
              {
                label: 'Runs',
                icon: (props) => <IconTechnologyServerAlt {...props} />,
                iconActive: IconServer,
                href: '#runs',
              },
              {
                label: 'Reviews',
                icon: (props) => <IconGeneralChatBubble {...props} />,
                iconActive: IconChat,
                href: '#reviews',
              },
              {
                label: 'Branches',
                icon: (props) => <IconTechnologyGitBranches {...props} />,
                iconActive: IconGitBranches,
                href: '#branches',
              },
              {
                label: 'Insights',
                icon: (props) => <IconViewPieChart {...props} />,
                iconActive: IconViewChart,
                href: '#insights',
              },
            ]}
            onMouseDown={(e: any) => {
              e.preventDefault()
              setActivePath(`#${e.target.href.split('#')[1]}`)
            }}
          />
        </>
      )
    }

    mount(<SUT />)
  })
})
