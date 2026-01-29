/// <reference types="cypress" />

import { ref } from 'vue'
import { mount } from 'cypress/vue'
import Textbox from './Textbox.vue'
import {
  type TextboxTheme,
  type TextboxVariant,
} from '@cypress-design/constants-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
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

    mount(() => (
      <div class="p-4">
        <Textbox
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          variant={variant}
          theme={theme}
          size={size}
          rounded={rounded}
        />
      </div>
    ))
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
      mount(() => (
        <div class="flex flex-col gap-4 p-4">
          Default state with all variants
          {variants.map((variant) => (
            <Textbox key={variant} variant={variant} value={`${variant}`} />
          ))}
          Disabled state with all variants
          {variants.map((variant) => (
            <Textbox
              key={variant}
              variant={variant}
              disabled
              value={`Disabled ${variant}`}
            />
          ))}
          Placeholder
          <Textbox placeholder="Placeholder state" />
          Themes
          {themes.map((theme) => (
            <Textbox key={theme} theme={theme} placeholder={`${theme} theme`} />
          ))}
        </div>
      ))
    },
    () => {
      mount(() => (
        <div class="flex flex-col gap-4 p-4">
          Labels
          <Textbox labelLeft="Left" value="With left label" />
          <Textbox labelRight="Right" value="With right label" />
          <Textbox
            labelLeft="Left"
            labelRight="Right"
            value="With both labels"
          />
          Icons
          <Textbox iconLeft={IconShapeLightningBolt} value="With left icon" />
          <Textbox iconRight={IconShapeLightningBolt} value="With right icon" />
          <Textbox
            iconLeft={IconShapeLightningBolt}
            iconRight={IconShapeLightningBolt}
            value="With both icons"
          />
          Divider
          <Textbox
            iconLeft={IconShapeLightningBolt}
            divider
            value="With divider"
          />
          Rounded corners
          <Textbox rounded value="Rounded corners" />
          Complete example
          <Textbox
            labelLeft="Search"
            iconLeft={IconShapeLightningBolt}
            divider
            value="Search term"
            iconRight={IconShapeLightningBolt}
            labelRight="Results"
          />
        </div>
      ))
    },
  )

  assertions(mountStory)
})

describe('Function', () => {
  it('should handle value changes', () => {
    const value = ref('')
    mount(() => (
      <div class="p-4">
        <Textbox v-model={value.value} placeholder="Type here..." />
        <div data-cy="value-display" class="mt-2">
          Value: {value.value}
        </div>
      </div>
    ))
    cy.get('input').type('Hello')
    cy.get('[data-cy="value-display"]').should('contain', 'Hello')
  })

  it('should handle focus and blur events', () => {
    const onFocus = cy.stub().as('onFocus')
    const onBlur = cy.stub().as('onBlur')
    mount(() => (
      <Textbox placeholder="Test focus" onFocus={onFocus} onBlur={onBlur} />
    ))
    cy.get('input').focus()
    cy.get('@onFocus').should('have.been.calledOnce')
    cy.get('input').blur()
    cy.get('@onBlur').should('have.been.calledOnce')
  })

  it('should apply aria-invalid for invalid variant', () => {
    mount(() => <Textbox variant="invalid" value="Invalid input" />)
    cy.get('input').should('have.attr', 'aria-invalid', 'true')
  })

  it('should handle aria attributes', () => {
    mount(() => (
      <Textbox
        aria-label="Test input"
        aria-describedby="help-text"
        placeholder="Accessible input"
      />
    ))
    cy.get('input')
      .should('have.attr', 'aria-label', 'Test input')
      .should('have.attr', 'aria-describedby', 'help-text')
  })
})

describe('Keyboard Event Handlers', () => {
  it('should call onKeydown handler', () => {
    const onKeydown = cy.stub().as('onKeydown')

    mount(() => <Textbox placeholder="Test" onKeydown={onKeydown} />)

    cy.get('input').type('a')
    cy.get('@onKeydown').should('have.been.called')
    cy.get('@onKeydown').should('have.been.calledWithMatch', {
      key: 'a',
    })
  })

  it('should call onKeyup handler', () => {
    const onKeyup = cy.stub().as('onKeyup')

    mount(() => <Textbox placeholder="Test" onKeyup={onKeyup} />)

    cy.get('input').type('b')
    cy.get('@onKeyup').should('have.been.called')
  })

  it('should handle Enter key press', () => {
    const onKeydown = cy.stub().as('onKeydown')

    mount(() => <Textbox placeholder="Test" onKeydown={onKeydown} />)

    cy.get('input').type('{enter}')
    cy.get('@onKeydown').should('have.been.calledWithMatch', {
      key: 'Enter',
    })
  })

  it('should handle Escape key press', () => {
    const onKeydown = cy.stub().as('onKeydown')

    mount(() => <Textbox placeholder="Test" onKeydown={onKeydown} />)

    cy.get('input').type('{esc}')
    cy.get('@onKeydown').should('have.been.calledWithMatch', {
      key: 'Escape',
    })
  })

  it('should handle Tab key navigation', () => {
    const onKeydown = cy.stub().as('onKeydown')

    mount(() => (
      <div>
        <Textbox placeholder="First" onKeydown={onKeydown} />
        <Textbox placeholder="Second" />
      </div>
    ))

    cy.get('input[placeholder="First"]').focus()
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.get('input[placeholder="Second"]').should('have.focus')
  })
})
