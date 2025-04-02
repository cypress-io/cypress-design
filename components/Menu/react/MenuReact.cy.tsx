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
                key: 'runs',
                label: 'Runs',
                icon: (props) => <IconTechnologyServerAlt {...props} />,
                iconActive: IconAnimatedTechnologyServer,
                href: '#runs',
                className: 'runs-li',
                anchorClassName: 'runs-anchor',
                labelClassName: 'runs-label',
                interactiveColorsOnGroup: true,
                anchorAttributes: {
                  'data-testid': 'runs-anchor',
                  title: 'Runs link',
                },
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
                submenuClassName: 'submenu-insights',
                items: [
                  'Run status',
                  'Run duration',
                  'Test suite size',
                  'Top failures',
                  'Slowest tests',
                  'Most common errors',
                  'Flaky tests',
                ].map((label, index) => ({
                  key: `insight-${index}`,
                  label,
                  href: `#${label.toLowerCase().replace(/ /g, '-')}`,
                  ...(label === 'Top failures' && {
                    className: 'failures-li',
                    anchorClassName: 'failures-anchor',
                    labelClassName: 'failures-label',
                    interactiveColorsOnGroup: false,
                    anchorAttributes: {
                      'data-testid': 'failures-anchor',
                    },
                  }),
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
