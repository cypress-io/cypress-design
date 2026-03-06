/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import Textbox from './Textbox'
import {
  type TextboxTheme,
  type TextboxVariant,
} from '@cypress-design/constants-textbox'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'
import assertions, {
  type TextboxStoryOptions,
  visualAssertions,
} from '../assertions'

describe('Shared', { viewportHeight: 800, viewportWidth: 1200 }, () => {
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

  visualAssertions(
    () => {
      const themes: TextboxTheme[] = ['light', 'dark']
      const variants: TextboxVariant[] = [
        'default',
        'valid',
        'invalid',
        'warning',
      ]
      mount(
        <div className="flex flex-col gap-4 p-4">
          Default state with all variants
          {variants.map((variant) => (
            <Textbox
              key={variant}
              variant={variant}
              defaultValue={`${variant}`}
              aria-label={`Default ${variant}`}
            />
          ))}
          Disabled state with all variants
          {variants.map((variant) => (
            <Textbox
              key={variant}
              variant={variant}
              disabled
              defaultValue={`Disabled ${variant}`}
              aria-label={`Disabled ${variant}`}
            />
          ))}
          Placeholder
          <Textbox
            placeholder="Placeholder state"
            aria-label="Placeholder state"
          />
          Themes
          {themes.map((theme) => (
            <Textbox
              key={theme}
              theme={theme}
              defaultValue={`${theme} theme`}
              aria-label={`${theme} theme`}
            />
          ))}
        </div>,
      )
    },
    () => {
      mount(
        <div className="flex flex-col gap-4 p-4">
          Labels
          <Textbox
            labelLeft="Left"
            defaultValue="With left label"
            aria-label="With left label"
          />
          <Textbox
            labelRight="Right"
            defaultValue="With right label"
            aria-label="With right label"
          />
          <Textbox
            labelLeft="Left"
            labelRight="Right"
            defaultValue="With both labels"
            aria-label="With both labels"
          />
          Icons
          <Textbox
            iconLeft={IconShapeLightningBolt}
            defaultValue="With left icon"
            aria-label="With left icon"
          />
          <Textbox
            iconRight={IconShapeLightningBolt}
            defaultValue="With right icon"
            aria-label="With right icon"
          />
          <Textbox
            iconLeft={IconShapeLightningBolt}
            iconRight={IconShapeLightningBolt}
            defaultValue="With both icons"
            aria-label="With both icons"
          />
          Divider
          <Textbox
            iconLeft={IconShapeLightningBolt}
            divider
            defaultValue="With divider"
            aria-label="With divider"
          />
          Rounded corners
          <Textbox
            rounded
            defaultValue="Rounded corners"
            aria-label="Rounded corners"
          />
          Complete example
          <Textbox
            labelLeft="Search"
            iconLeft={IconShapeLightningBolt}
            divider
            defaultValue="Search term"
            iconRight={IconShapeLightningBolt}
            labelRight="Results"
            aria-label="Complete example"
          />
        </div>,
      )
    },
  )

  assertions(mountStory)
})

describe('Function', () => {
  it('should handle value changes - controlled component', () => {
    const SUT = () => {
      const [value, setValue] = React.useState('')
      return (
        <div className="p-4">
          <Textbox
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
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

  it('should apply aria-invalid for invalid variant', () => {
    mount(
      <Textbox
        variant="invalid"
        defaultValue="Invalid input"
        aria-label="Invalid input"
      />,
    )
    cy.get('input').should('have.attr', 'aria-invalid', 'true')
  })

  it('should handle aria attributes', () => {
    mount(
      <div>
        <Textbox
          aria-label="Test input"
          aria-describedby="help-text"
          placeholder="Accessible input"
        />
        <span id="help-text">Help text for the input.</span>
      </div>,
    )
    cy.get('input')
      .should('have.attr', 'aria-label', 'Test input')
      .should('have.attr', 'aria-describedby', 'help-text')
  })
})

describe('Ref Forwarding', () => {
  it('should forward ref to input element', () => {
    const inputRef = React.createRef<HTMLInputElement>()

    mount(
      <div>
        <Textbox ref={inputRef} placeholder="Test input" />
      </div>,
    )

    cy.then(() => {
      expect(inputRef.current).to.exist
      expect(inputRef.current?.tagName).to.equal('INPUT')
      expect(inputRef.current?.placeholder).to.equal('Test input')
    })
  })

  it('should allow programmatic focus via ref', () => {
    const inputRef = React.createRef<HTMLInputElement>()

    mount(
      <div>
        <Textbox ref={inputRef} placeholder="Test input" />
        <button
          onClick={() => {
            inputRef.current?.focus()
          }}
        >
          Focus
        </button>
      </div>,
    )

    cy.get('input').should('not.be.focused')
    cy.get('button').click()
    cy.get('input').should('be.focused')
  })

  it('should allow programmatic value manipulation via ref', () => {
    const inputRef = React.createRef<HTMLInputElement>()

    mount(
      <div>
        <Textbox ref={inputRef} />
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = 'Programmatic value'
            }
          }}
        >
          Set Value
        </button>
      </div>,
    )

    cy.get('input').should('have.value', '')
    cy.get('button').click()
    cy.get('input').should('have.value', 'Programmatic value')
  })
})

describe('Keyboard Event Handlers', () => {
  it('should call onKeyDown handler', () => {
    const onKeyDown = cy.stub().as('onKeyDown')

    mount(<Textbox placeholder="Test" onKeyDown={onKeyDown} />)

    cy.get('input').type('a')
    cy.get('@onKeyDown').should('have.been.called')
    cy.get('@onKeyDown').should('have.been.calledWithMatch', {
      key: 'a',
    })
  })

  it('should call onKeyUp handler', () => {
    const onKeyUp = cy.stub().as('onKeyUp')

    mount(<Textbox placeholder="Test" onKeyUp={onKeyUp} />)

    cy.get('input').type('b')
    cy.get('@onKeyUp').should('have.been.called')
  })

  it('should handle Enter key press', () => {
    const onKeyDown = cy.stub().as('onKeyDown')

    mount(<Textbox placeholder="Test" onKeyDown={onKeyDown} />)

    cy.get('input').type('{enter}')
    cy.get('@onKeyDown').should('have.been.calledWithMatch', {
      key: 'Enter',
    })
  })

  it('should handle Escape key press', () => {
    const onKeyDown = cy.stub().as('onKeyDown')

    mount(<Textbox placeholder="Test" onKeyDown={onKeyDown} />)

    cy.get('input').type('{esc}')
    cy.get('@onKeyDown').should('have.been.calledWithMatch', {
      key: 'Escape',
    })
  })

  it('should handle Tab key navigation', () => {
    const onKeyDown = cy.stub().as('onKeyDown')

    mount(
      <div>
        <Textbox placeholder="First" onKeyDown={onKeyDown} />
        <Textbox placeholder="Second" />
      </div>,
    )

    cy.get('input[placeholder="First"]').focus()
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.get('input[placeholder="Second"]').should('have.focus')
  })
})
