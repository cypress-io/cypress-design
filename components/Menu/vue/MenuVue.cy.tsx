/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import { ref } from 'vue'
import Menu from './Menu.vue'

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
} from '@cypress-design/vue-icon'

describe('<Menu />', () => {
  it('renders', () => {
    const activePath = ref('#runs')

    mount(() => (
      <>
        <pre>URL: {activePath.value}</pre>
        <Menu
          activePath={activePath.value}
          items={[
            {
              key: 'runs',
              label: 'Runs',
              href: '#runs',
              icon: (props) => <IconTechnologyServerAlt {...props} />,
              iconActive: IconAnimatedTechnologyServer,
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
              href: '#insights',
              icon: (props) => <IconViewPieChart {...props} />,
              iconActive: IconAnimatedViewChart,
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
              iconActive: ({ animated: _, ...props }) => (
                <IconWindowCodeEditor {...props} />
              ),
              href: '#specs',
            },
            {
              label: 'Settings',
              icon: (props) => <IconObjectGear {...props} />,
              iconActive: IconAnimatedObjectGear,
              href: '#settings',
            },
          ]}
          onMousedown={(e: MouseEvent) => {
            if (e.target instanceof HTMLAnchorElement) {
              e.preventDefault()
              activePath.value = `#${e.target.href.split('#')[1]}`
            }
          }}
        />
      </>
    ))
  })
})
