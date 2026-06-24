/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import { IconArrowLeft } from '@cypress-design/react-icon'
import Select from './Select'
import assertions from '../assertions'
import type { SelectMountOptions } from '../assertions'

describe('Select', () => {
  function mountStory(options: SelectMountOptions) {
    // Default popover min-width to 180px so the panel has a consistent shape
    // across tests; individual tests can override via SelectMountOptions.
    const merged = { minWidth: '180', ...options }
    mount(
      <div className="m-4">
        <Select {...(merged as React.ComponentProps<typeof Select>)} />
      </div>,
    )
  }

  assertions(mountStory, { iconArrowLeft: IconArrowLeft })

  describe('React specific', () => {
    it('controlled (value + onChange) round-trips', () => {
      const Wrapper = () => {
        const [value, setValue] = React.useState<string | undefined>('alpha')
        return (
          <div className="m-4">
            <Select
              items={[
                { label: 'Alpha', value: 'alpha' },
                { label: 'Beta', value: 'beta' },
              ]}
              value={value}
              onChange={(v) => setValue(v)}
            />
          </div>
        )
      }
      mount(<Wrapper />)
      cy.findByRole('button').should('contain.text', 'Alpha')
      cy.findByRole('button').click()
      cy.findByRole('option', { name: 'Beta' }).click()
      cy.findByRole('button').should('contain.text', 'Beta')
    })

    it('controlled clear (value=undefined) shows the placeholder', () => {
      const Wrapper = () => {
        const [value, setValue] = React.useState<string | undefined>('alpha')
        return (
          <div className="m-4">
            <Select
              items={[
                { label: 'Alpha', value: 'alpha' },
                { label: 'Beta', value: 'beta' },
              ]}
              value={value}
              placeholder="Pick one"
              onChange={(v) => setValue(v)}
            />
            <button id="clear" onClick={() => setValue(undefined)}>
              Clear
            </button>
          </div>
        )
      }
      mount(<Wrapper />)
      cy.findByRole('button', { name: 'Alpha' }).should('exist')
      cy.get('#clear').click()
      cy.findByRole('button', { name: 'Pick one' }).should('exist')
    })

    it('defaultValue seeds the uncontrolled initial selection', () => {
      mount(
        <Select
          items={[
            { label: 'Alpha', value: 'alpha' },
            { label: 'Beta', value: 'beta' },
          ]}
          defaultValue="beta"
        />,
      )
      cy.findByRole('button').should('contain.text', 'Beta')
    })

    it('renders a custom trigger via the render-prop', () => {
      mount(
        <Select
          items={[{ label: 'Alpha', value: 'alpha' }]}
          trigger={({ toggle }) => (
            <button id="custom-trigger" onClick={toggle}>
              Custom
            </button>
          )}
        />,
      )
      cy.get('#custom-trigger').should('contain.text', 'Custom').click()
      cy.findByRole('listbox').should('be.visible')
    })

    it('renders the footer node when provided', () => {
      mount(
        <Select
          items={[{ label: 'Alpha', value: 'alpha' }]}
          defaultOpen={true}
          footer={<span id="custom-footer">Custom footer</span>}
        />,
      )
      cy.get('#custom-footer').should('contain.text', 'Custom footer')
    })
  })
})
