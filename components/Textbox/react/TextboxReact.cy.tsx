/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import Textbox from './Textbox'
import {
  type TextboxTheme,
  type TextboxVariant,
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
    mount(<Textbox value="Test change" onChange={onChange} />)
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
