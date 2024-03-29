/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Menu from './Menu'

import {
  IconGeneralChatBubble,
  IconAnimatedGeneralChatBubble,
  IconTechnologyServerAlt,
  IconTechnologyGitBranches,
  IconViewPieChart,
  IconAnimatedTechnologyServer,
  IconAnimatedTechnologyGitBranches,
  IconAnimatedViewChart,
  IconObjectGear,
  IconAnimatedObjectGear,
  IconWindowCodeEditor,
} from '@cypress-design/react-icon'

describe('<Menu />', () => {
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
                items: [
                  'Run status',
                  'Run duration',
                  'Test suite size',
                  'Top failures',
                  'Slowest tests',
                  'Most common errors',
                  'Flaky tests',
                ].map((l) => ({
                  label: l,
                  href: `#${l.toLowerCase().replace(/ /g, '-')}`,
                })),
              },
              {
                label: 'Specs',
                icon: (props) => <IconWindowCodeEditor {...props} />,
                iconActive: IconWindowCodeEditor,
                href: '#specs',
              },

              {
                label: 'Settings',
                icon: (props) => <IconObjectGear {...props} />,
                iconActive: IconAnimatedObjectGear,
                href: '#settings',
              },
            ]}
            onMouseDown={(e: any) => {
              if (e.target.href) {
                e.preventDefault()
                setActivePath(`#${e.target.href.split('#')[1]}`)
              }
            }}
          />
        </>
      )
    }

    mount(<SUT />)
  })
})
