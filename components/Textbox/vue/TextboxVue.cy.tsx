/// <reference types="cypress" />

import { ref } from 'vue'
import { mount } from 'cypress/vue'
import Textbox from './Textbox.vue'
import {
  type TextboxTheme,
  type TextboxVariant,
} from '@cypress-design/constants-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
import assertions, { type TextboxStoryOptions } from '../shared-assertions'

describe('<Textbox />', { viewportHeight: 800, viewportWidth: 1200 }, () => {
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

  it('should handle all themes', () => {
    const themes: TextboxTheme[] = ['light', 'dark']
    mount(() => (
      <div class="flex flex-col gap-4 p-4">
        {themes.map((theme) => (
          <Textbox key={theme} theme={theme} placeholder={`${theme} theme`} />
        ))}
      </div>
    ))
    cy.get('input').should('have.length', 2)
    cy.percySnapshot()
  })

  it('should handle labels', () => {
    mount(() => (
      <div class="flex flex-col gap-4 p-4">
        <Textbox labelLeft="Left" placeholder="With left label" />
        <Textbox labelRight="Right" placeholder="With right label" />
        <Textbox
          labelLeft="Left"
          labelRight="Right"
          placeholder="With both labels"
        />
      </div>
    ))
    cy.get('input').should('have.length', 3)
    cy.percySnapshot()
  })

  it('should handle icons', () => {
    mount(() => (
      <div class="flex flex-col gap-4 p-4">
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
      </div>
    ))
    cy.get('input').should('have.length', 3)
    cy.percySnapshot()
  })

  it('should handle divider', () => {
    mount(() => (
      <Textbox
        iconLeft={IconShapeLightningBolt}
        divider
        placeholder="With divider"
      />
    ))
    cy.get('input').should('exist')
    cy.percySnapshot()
  })

  it('should handle complete example', () => {
    mount(() => (
      <Textbox
        labelLeft="Search"
        iconLeft={IconShapeLightningBolt}
        divider
        placeholder="Search term"
        iconRight={IconShapeLightningBolt}
        labelRight="Results"
      />
    ))
    cy.get('input').should('exist')
    cy.percySnapshot()
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

  it('should handle disabled state with all variants', () => {
    const variants: TextboxVariant[] = [
      'default',
      'valid',
      'invalid',
      'warning',
    ]
    mount(() => (
      <div class="flex flex-col gap-4 p-4">
        {variants.map((variant) => (
          <Textbox
            key={variant}
            variant={variant}
            disabled
            value={`Disabled ${variant}`}
          />
        ))}
      </div>
    ))
    cy.get('input').each(($input) => {
      cy.wrap($input).should('be.disabled')
    })
    cy.percySnapshot()
  })

  it('should handle placeholder vs value states', () => {
    mount(() => (
      <div class="flex flex-col gap-4 p-4">
        <Textbox placeholder="Placeholder state" />
        <Textbox value="Value state" />
        <Textbox value="" placeholder="Empty value with placeholder" />
      </div>
    ))
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

  function mountAllSizes() {
    mount(() => (
      <div class="flex flex-col gap-4 p-4">
        <Textbox size="32" placeholder="Size 32" />
        <Textbox size="40" placeholder="Size 40" />
        <Textbox size="48" placeholder="Size 48" />
      </div>
    ))
  }

  function mountAllVariants() {
    mount(() => (
      <div class="flex flex-col gap-4 p-4">
        <Textbox variant="default" placeholder="Default variant" />
        <Textbox variant="valid" placeholder="Valid variant" />
        <Textbox variant="invalid" placeholder="Invalid variant" />
        <Textbox variant="warning" placeholder="Warning variant" />
      </div>
    ))
  }

  assertions(mountStory, mountAllSizes, mountAllVariants)
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
