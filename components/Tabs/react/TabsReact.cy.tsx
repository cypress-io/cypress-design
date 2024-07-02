/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Tabs from './Tabs'
import type { SwitchEvent, Tab, CssVariants } from '../constants'
import assertions from '../assertions'

describe('Tabs', () => {
  function mountStory(
    options: {
      tabs: Tab[]
      activeId?: string
      variant?: keyof typeof CssVariants
      onSwitch?: (tab: Tab, event: SwitchEvent) => void
      [key: `data-${string}`]: any
    } = { tabs: [] },
  ) {
    mount(
      <div className="m-4">
        <Tabs {...options} />
        {options.tabs.map((tab, i) => (
          <div
            key={i}
            role="tabpanel"
            id={`tabpanel-id-${i + 1}`}
            style={{ display: options.activeId === tab.id ? 'block' : 'none' }}
          >
            Tab Panel {i + 1}
          </div>
        ))}
      </div>,
    )
  }
  assertions(mountStory)

  describe('React specific', () => {
    it('updates the active tab', () => {
      const ComponentTested = () => {
        const [activeId, setActiveId] = React.useState('ia')
        return (
          <div className="m-4">
            <Tabs
              tabs={[
                {
                  id: 'ia',
                  label: 'Initial Active',
                  ['aria-controls']: 'tabpanel-id-1',
                },
                {
                  id: 'fa',
                  label: 'Final Active',
                  ['aria-controls']: 'tabpanel-id-2',
                },
              ]}
              activeId={activeId}
            />
            <div
              role="tabpanel"
              id="tabpanel-id-1"
              style={{ display: activeId === 'ia' ? 'block' : 'none' }}
            >
              <button id="change" onClick={() => setActiveId('fa')}>
                Change
              </button>
            </div>
            <div
              role="tabpanel"
              id="tabpanel-id-2"
              style={{ display: activeId === 'fa' ? 'block' : 'none' }}
            >
              <button id="change" onClick={() => setActiveId('ia')}>
                Change
              </button>
            </div>
          </div>
        )
      }

      mount(<ComponentTested />)

      cy.get('[aria-selected="true"]').should('contain.text', 'Initial Active')
      cy.findByRole('button', { name: 'Change' }).click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Final Active')
    })

    it('renders a custom tab', () => {
      mount(
        <div>
          <Tabs
            tabs={[
              {
                id: 'ia',
                label: 'Initial Active',
                ['aria-controls']: 'tabpanel-id-1',
              },
            ]}
            renderTab={(tab) => <div>{tab.label} - Custom Tab</div>}
          />
          <div role="tabpanel" id="tabpanel-id-1">
            Tab Panel 1
          </div>
        </div>,
      )

      cy.contains('Custom Tab').should('exist')
    })
  })
})
