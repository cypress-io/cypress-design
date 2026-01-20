/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import Textbox from './Textbox'
import {
  CssVariantClassesTable,
  type TextboxTheme,
  type TextboxVariant,
  type TextboxSize,
} from '@cypress-design/constants-textbox'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'
import assertions, { type TextboxStoryOptions } from '../assertions'

describe('<Textbox />', { viewportHeight: 800, viewportWidth: 1200 }, () => {
  it('should handle value changes', () => {
    const SUT = () => {
      const [value, setValue] = React.useState('')
      return (
        <div className="p-4">
          <Textbox
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type here..."
          />
          <div data-cy="value-display" className="mt-2">
            Value: {value}
          </div>
        </div>
      )
    }

    mount(<SUT />)
    cy.get('input').type('Hello')
    cy.get('[data-cy="value-display"]').should('contain', 'Hello')
  })

  it('should handle disabled state', () => {
    mount(<Textbox disabled placeholder="Disabled input" />)
    cy.get('input').should('be.disabled')
    cy.get('input').should('not.be.enabled')
  })

  it('should handle placeholder state', () => {
    mount(<Textbox placeholder="Enter text..." />)
    cy.get('input').should('have.attr', 'placeholder', 'Enter text...')
    cy.get('input').should('have.value', '')
  })

  it('should handle all variants', () => {
    const variants: TextboxVariant[] = [
      'default',
      'valid',
      'invalid',
      'warning',
    ]
    mount(
      <div className="flex flex-col gap-4 p-4">
        {variants.map((variant) => (
          <Textbox
            key={variant}
            variant={variant}
            placeholder={`${variant} variant`}
          />
        ))}
      </div>,
    )
    cy.get('input').should('have.length', 4)
    cy.percySnapshot()
  })

  it('should handle all sizes', () => {
    const sizes: TextboxSize[] = ['32', '40', '48']
    mount(
      <div className="flex flex-col gap-4 p-4">
        {sizes.map((size) => (
          <Textbox key={size} size={size} placeholder={`Size ${size}`} />
        ))}
      </div>,
    )
    cy.get('input').should('have.length', 3)
    cy.percySnapshot()
  })

  it('should handle all themes', () => {
    const themes: TextboxTheme[] = ['light', 'dark']
    mount(
      <div className="flex flex-col gap-4 p-4">
        {themes.map((theme) => (
          <Textbox key={theme} theme={theme} placeholder={`${theme} theme`} />
        ))}
      </div>,
    )
    cy.get('input').should('have.length', 2)
    cy.percySnapshot()
  })

  it('should handle rounded corners', () => {
    mount(
      <div className="flex flex-col gap-4 p-4">
        <Textbox rounded={false} placeholder="Square corners" />
        <Textbox rounded={true} placeholder="Rounded corners" />
      </div>,
    )
    cy.get('input').should('have.length', 2)
    cy.percySnapshot()
  })

  it('should handle labels', () => {
    mount(
      <div className="flex flex-col gap-4 p-4">
        <Textbox labelLeft="Left" placeholder="With left label" />
        <Textbox labelRight="Right" placeholder="With right label" />
        <Textbox
          labelLeft="Left"
          labelRight="Right"
          placeholder="With both labels"
        />
      </div>,
    )
    cy.get('input').should('have.length', 3)
    cy.percySnapshot()
  })

  it('should handle icons', () => {
    mount(
      <div className="flex flex-col gap-4 p-4">
        <Textbox
          iconLeft={IconShapeLightningBolt}
          placeholder="With left icon"
        />
        <Textbox
          iconRight={IconShapeLightningBolt}
          placeholder="With right icon"
        />
        <Textbox
          iconLeft={IconShapeLightningBolt}
          iconRight={IconShapeLightningBolt}
          placeholder="With both icons"
        />
      </div>,
    )
    cy.get('input').should('have.length', 3)
    cy.percySnapshot()
  })

  it('should handle divider', () => {
    mount(
      <Textbox
        iconLeft={IconShapeLightningBolt}
        divider
        placeholder="With divider"
      />,
    )
    cy.get('input').should('exist')
    cy.percySnapshot()
  })

  it('should handle complete example', () => {
    mount(
      <Textbox
        labelLeft="Search"
        iconLeft={IconShapeLightningBolt}
        divider
        placeholder="Search term"
        iconRight={IconShapeLightningBolt}
        labelRight="Results"
      />,
    )
    cy.get('input').should('exist')
    cy.percySnapshot()
  })

  it('should handle keyboard navigation', () => {
    mount(<Textbox placeholder="Focus me" />)
    cy.get('input').focus()
    cy.get('input').should('be.focused')
    cy.get('input').type('Test input')
    cy.get('input').should('have.value', 'Test input')
  })

  it('should handle focus and blur events', () => {
    const onFocus = cy.stub().as('onFocus')
    const onBlur = cy.stub().as('onBlur')
    mount(
      <Textbox placeholder="Test focus" onFocus={onFocus} onBlur={onBlur} />,
    )
    cy.get('input').focus()
    cy.get('@onFocus').should('have.been.calledOnce')
    cy.get('input').blur()
    cy.get('@onBlur').should('have.been.calledOnce')
  })

  it('should handle onChange event', () => {
    const onChange = cy.stub().as('onChange')
    mount(<Textbox placeholder="Test change" onChange={onChange} />)
    cy.get('input').type('a')
    cy.get('@onChange').should('have.been.called')
  })

  it('should apply aria-invalid for invalid variant', () => {
    mount(<Textbox variant="invalid" defaultValue="Invalid input" />)
    cy.get('input').should('have.attr', 'aria-invalid', 'true')
  })

  it('should handle aria attributes', () => {
    mount(
      <Textbox
        aria-label="Test input"
        aria-describedby="help-text"
        placeholder="Accessible input"
      />,
    )
    cy.get('input')
      .should('have.attr', 'aria-label', 'Test input')
      .should('have.attr', 'aria-describedby', 'help-text')
  })

  it('should handle disabled state with all variants', () => {
    const variants: TextboxVariant[] = [
      'default',
      'valid',
      'invalid',
      'warning',
    ]
    mount(
      <div className="flex flex-col gap-4 p-4">
        {variants.map((variant) => (
          <Textbox
            key={variant}
            variant={variant}
            disabled
            value={`Disabled ${variant}`}
          />
        ))}
      </div>,
    )
    cy.get('input').each(($input) => {
      cy.wrap($input).should('be.disabled')
    })
    cy.percySnapshot()
  })

  it('should handle placeholder vs value states', () => {
    mount(
      <div className="flex flex-col gap-4 p-4">
        <Textbox placeholder="Placeholder state" />
        <Textbox defaultValue="Value state" />
        <Textbox defaultValue="" placeholder="Empty value with placeholder" />
      </div>,
    )
    cy.get('input').should('have.length', 3)
    cy.percySnapshot()
  })

  function mountStory(options: TextboxStoryOptions = {}) {
    const {
      disabled = false,
      placeholder = 'Enter text...',
      value,
      variant = 'default',
      theme = 'light',
      size = '40',
      rounded = false,
    } = options

    mount(
      <div className="p-4">
        <Textbox
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={value}
          variant={variant}
          theme={theme}
          size={size}
          rounded={rounded}
        />
      </div>,
    )
  }

  assertions(mountStory)
})
