/// <reference types="cypress" />

export interface TextboxStoryOptions {
  disabled?: boolean
  placeholder?: string
  value?: string
  variant?: 'default' | 'valid' | 'invalid' | 'warning'
  theme?: 'light' | 'dark'
  size?: '32' | '40' | '48'
  rounded?: boolean
}

export default function assertions(
  mountStory: (options?: TextboxStoryOptions) => void,
): void {
  it('renders with value', () => {
    mountStory({ value: 'Test value' })
    cy.get('input').should('have.value', 'Test value')
    cy.percySnapshot()
  })

  it('handles input changes - uncontrolled component', () => {
    mountStory()
    cy.get('input').type('New text')
    cy.get('input').should('have.value', 'New text')
  })

  it('is keyboard accessible', () => {
    mountStory()
    cy.get('input').focus()
    cy.get('input').should('be.focused')
    cy.get('input').type('Test')
    cy.get('input').should('have.value', 'Test')
  })
}

export function visualAssertions(
  mountVisualStates: () => void,
  mountVisualOptions: () => void,
): void {
  it('Visual states', () => {
    mountVisualStates()
    cy.percySnapshot()
  })

  it('Visual options', () => {
    mountVisualOptions()
    cy.get('input').should('have.length', 9)
    cy.percySnapshot()
  })
}
