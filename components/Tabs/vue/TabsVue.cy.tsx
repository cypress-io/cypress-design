/// <reference types="cypress" />
import { ref } from 'vue'
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import type { Tab } from '../constants'
import Tabs from './Tabs.vue'

describe('<Tabs/>', () => {
  function mountStory(options: ComponentProps<typeof Tabs> = { tabs: [] }) {
    mount(() => (
      <div class="m-4">
        <Tabs {...options} />
      </div>
    ))
  }
  assertions(mountStory)

  describe('Vue specific', () => {
    it('updates the active tab', () => {
      const activeId = ref('ia')
      mount(() => (
        <div class="m-4">
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
            activeId={activeId.value}
          />
          <div>
            <button id="change" onClick={() => (activeId.value = 'fa')}>
              Change
            </button>
          </div>
        </div>
      ))

      cy.get('[aria-selected="true"]').should('contain.text', 'Initial Active')
      cy.get('[aria-selected="false"]').should('contain.text', 'Final Active')
      cy.findByRole('button', { name: 'Change' }).click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Final Active')
      cy.get('#ia').should('have.attr', 'aria-controls', 'tabpanel-id-1')
      cy.get('#fa').should('have.attr', 'aria-controls', 'tabpanel-id-2')
    })

    it('renders a custom tab', () => {
      mount(() => (
        <Tabs
          tabs={[
            {
              id: 'ia',
              label: 'Initial Active',
              ['aria-controls']: 'tabpanel-id-1',
            },
          ]}
        >
          {{
            tab: (tab: Tab) => <div>{tab.label} - Custom Tab</div>,
          }}
        </Tabs>
      ))

      cy.contains('Custom Tab').should('exist')
    })
  })
})
