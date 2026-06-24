/// <reference types="cypress" />
import { ref } from 'vue'
import { mount } from 'cypress/vue'
import type { SelectItem } from '@cypress-design/constants-select'
import { IconArrowLeft } from '@cypress-design/vue-icon'
import assertions from '../assertions'
import type { SelectMountOptions } from '../assertions'
import Select from './Select.vue'

describe('<Select/>', () => {
  function mountStory(options: SelectMountOptions) {
    const { defaultValue, onChange, onOpenChange, onHeaderTabChange, ...rest } =
      options
    // Default the popover min-width to 180px so the panel has a consistent
    // shape across tests; individual tests can override via SelectMountOptions.
    const merged = { minWidth: '180' as const, ...rest }
    mount(() => (
      <div class="m-4">
        <Select
          {...merged}
          modelValue={options.value ?? defaultValue}
          {...({
            // Only bridge through `change` (carries value + item). The
            // `update:modelValue` event fires alongside it, so binding both
            // would double-fire stubs in the assertions.
            onChange: (v: string | undefined, item: SelectItem) =>
              onChange?.(v, item),
            'onUpdate:open': (o: boolean) => onOpenChange?.(o),
            'onHeader-tab-change': (id: string) => onHeaderTabChange?.(id),
          } as Record<string, unknown>)}
        />
      </div>
    ))
  }

  assertions(mountStory, { iconArrowLeft: IconArrowLeft })

  describe('Vue specific', () => {
    it('round-trips selection through v-model', () => {
      const value = ref<string | undefined>('alpha')
      mount(() => (
        <div class="m-4">
          <Select
            items={[
              { label: 'Alpha', value: 'alpha' },
              { label: 'Beta', value: 'beta' },
            ]}
            modelValue={value.value}
            {...({
              'onUpdate:modelValue': (v: string | undefined) =>
                (value.value = v),
            } as Record<string, unknown>)}
          />
        </div>
      ))
      cy.findByRole('button').should('contain.text', 'Alpha')
      cy.findByRole('button').click()
      cy.findByRole('option', { name: 'Beta' }).click()
      cy.findByRole('button').should('contain.text', 'Beta')
    })

    it('controlled clear (modelValue=undefined) shows the placeholder', () => {
      const value = ref<string | undefined>('alpha')
      mount(() => (
        <div class="m-4">
          <Select
            items={[
              { label: 'Alpha', value: 'alpha' },
              { label: 'Beta', value: 'beta' },
            ]}
            modelValue={value.value}
            placeholder="Pick one"
            {...({
              'onUpdate:modelValue': (v: string | undefined) =>
                (value.value = v),
            } as Record<string, unknown>)}
          />
          <button id="clear" onClick={() => (value.value = undefined)}>
            Clear
          </button>
        </div>
      ))
      cy.findByRole('button', { name: 'Alpha' }).should('exist')
      cy.get('#clear').click()
      cy.findByRole('button', { name: 'Pick one' }).should('exist')
    })

    it('renders a custom trigger via the trigger slot', () => {
      mount(() => (
        <Select items={[{ label: 'Alpha', value: 'alpha' }]}>
          {{
            trigger: ({ toggle }: { toggle: () => void }) => (
              <button id="custom-trigger" onClick={toggle}>
                Custom
              </button>
            ),
          }}
        </Select>
      ))
      cy.get('#custom-trigger').should('contain.text', 'Custom').click()
      cy.findByRole('listbox').should('be.visible')
    })

    it('renders the footer slot when provided', () => {
      mount(() => (
        <Select items={[{ label: 'Alpha', value: 'alpha' }]} defaultOpen={true}>
          {{
            footer: () => <span id="custom-footer">Custom footer</span>,
          }}
        </Select>
      ))
      cy.get('#custom-footer').should('contain.text', 'Custom footer')
    })
  })
})
