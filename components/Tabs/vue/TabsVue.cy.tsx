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
              { id: 'ia', label: 'Initial Active' },
              { id: 'fa', label: 'Final Active' },
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
      cy.findByRole('button', { name: 'Change' }).click()
      cy.get('[aria-selected="true"]').should('contain.text', 'Final Active')
    })

    it('renders a custom tab', () => {
      mount(() => (
        <Tabs tabs={[{ id: 'ia', label: 'Initial Active' }]}>
          {{
            tab: (tab: Tab) => <div>{tab.label} - Custom Tab</div>,
          }}
        </Tabs>
      ))

      cy.contains('Custom Tab').should('exist')
    })
  })
})
