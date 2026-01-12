/// <reference types="cypress" />

export interface TextboxStoryOptions {
  disabled?: boolean
  placeholder?: string
  value?: string
  variant?: 'default' | 'valid' | 'invalid' | 'warning'
  theme?: 'auto' | 'light' | 'dark'
  size?: '32' | '40' | '48'
  rounded?: boolean
}

export default function assertions(
  mountStory: (options?: TextboxStoryOptions) => void,
): void {
  it('renders all variants', () => {
    mountStory()
    cy.get('input').should('exist')
    cy.percySnapshot()
  })

  it('renders disabled state', () => {
    mountStory({ disabled: true })
    cy.get('input').should('be.disabled')
    cy.percySnapshot()
  })

  it('renders placeholder state', () => {
    mountStory({ placeholder: 'Enter text...' })
    cy.get('input').should('have.attr', 'placeholder', 'Enter text...')
    cy.percySnapshot()
  })

  it('renders with value', () => {
    mountStory({ value: 'Test value' })
    cy.get('input').should('have.value', 'Test value')
    cy.percySnapshot()
  })

  it('handles input changes', () => {
    mountStory()
    cy.get('input').type('New text')
    cy.get('input').should('have.value', 'New text')
  })

  it('renders all sizes', () => {
    mountStory({ size: '32' })
    cy.get('input').should('exist')
    mountStory({ size: '40' })
    cy.get('input').should('exist')
    mountStory({ size: '48' })
    cy.get('input').should('exist')
    cy.percySnapshot()
  })

  it('renders all variants', () => {
    mountStory({ variant: 'default' })
    cy.get('input').should('exist')
    mountStory({ variant: 'valid' })
    cy.get('input').should('exist')
    mountStory({ variant: 'invalid' })
    cy.get('input').should('exist')
    mountStory({ variant: 'warning' })
    cy.get('input').should('exist')
    cy.percySnapshot()
  })

  it('renders rounded corners', () => {
    mountStory({ rounded: true })
    cy.get('input').should('exist')
    cy.percySnapshot()
  })

  it('is keyboard accessible', () => {
    mountStory()
    cy.get('input').focus()
    cy.get('input').should('be.focused')
    cy.get('input').type('Test')
    cy.get('input').should('have.value', 'Test')
  })
}
