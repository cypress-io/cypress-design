/// <reference types="cypress" />

import * as React from 'react'
import {
  IconGeneralChatBubble,
  IconAnimatedGeneralChatBubble,
  IconTechnologyServerAlt,
  IconTechnologyGitBranches,
  IconViewPieChart,
  IconAnimatedTechnologyServer,
  IconAnimatedTechnologyGitBranches,
  IconAnimatedViewChart,
} from '@cypress-design/react-icon'
import { mount } from 'cypress/react18'
import Menu from './Menu'

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
                iconActive: IconAnimatedTechnologyServer,
                href: '#runs',
              },
              {
                label: 'Reviews',
                icon: (props) => <IconGeneralChatBubble {...props} />,
                iconActive: IconAnimatedGeneralChatBubble,
                href: '#reviews',
              },
              {
                label: 'Branches',
                icon: (props) => <IconTechnologyGitBranches {...props} />,
                iconActive: IconAnimatedTechnologyGitBranches,
                href: '#branches',
              },
              {
                label: 'Insights',
                icon: (props) => <IconViewPieChart {...props} />,
                iconActive: IconAnimatedViewChart,
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
