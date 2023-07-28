/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Tabs from './Tabs'
import type { Tab, variants } from '../constants'
import assertions from '../assertions'

describe('Tabs', () => {
  function mountStory(
    options: {
      tabs: Tab[]
      activeId?: string
      variant?: keyof typeof variants
      [key: `data-${string}`]: any
    } = { tabs: [] },
  ) {
    mount(
      <div className="m-4">
        <Tabs {...options} />
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
                { id: 'ia', label: 'Initial Active' },
                { id: 'fa', label: 'Final Active' },
              ]}
              activeId={activeId}
            />
            <div>
              <button id="change" onClick={() => setActiveId('fa')}>
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
        <Tabs
          tabs={[{ id: 'ia', label: 'Initial Active' }]}
          renderTab={(tab) => <div role="tab">{tab.label} - Custom Tab</div>}
        />,
      )

      cy.contains('Custom Tab').should('exist')
    })
  })
})
