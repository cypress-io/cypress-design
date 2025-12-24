/// <reference types="cypress" />

export interface TextboxStoryOptions {
  disabled?: boolean
  darkMode?: boolean
  variant?: string
  size?: string
  rounded?: boolean
  labelLeft?: string
  labelRight?: string
}

export default function assertions(
  mountStory: (options?: TextboxStoryOptions) => void,
): void {
  it('renders textbox with placeholder', () => {
    mountStory()
    cy.get('input').first().as('firstInput')

    cy.get('@firstInput').should('have.attr', 'placeholder')
  })

  it('renders textbox with value', () => {
    mountStory({ variant: 'default' })
    cy.get('input').first().as('firstInput')

    cy.get('@firstInput').should('have.value')
  })

  it('renders disabled state', () => {
    mountStory({ disabled: true })
    cy.get('input').first().as('firstInput')

    cy.get('@firstInput').should('be.disabled')
  })

  it('renders with left label', () => {
    mountStory({ labelLeft: 'Label' })
    cy.contains('Label').should('exist')
  })

  it('renders with right label', () => {
    mountStory({ labelRight: 'Label' })
    cy.contains('Label').should('exist')
  })

  it('renders different sizes', () => {
    mountStory({ size: '32' })
    cy.get('input').first().should('have.class', 'h-[32px]')

    mountStory({ size: '40' })
    cy.get('input').first().should('have.class', 'h-[40px]')

    mountStory({ size: '48' })
    cy.get('input').first().should('have.class', 'h-[48px]')
  })

  it('renders rounded corners', () => {
    mountStory({ rounded: true })
    cy.get('input').first().parent().should('have.class', 'rounded-[28px]')
  })

  it('renders without rounded corners', () => {
    mountStory({ rounded: false })
    cy.get('input').first().parent().should('have.class', 'rounded-[4px]')
  })

  it('is focusable', () => {
    mountStory()
    cy.get('input').first().focus().should('be.focused')
  })

  it('accepts input', () => {
    mountStory()
    cy.get('input')
      .first()
      .type('test input')
      .should('have.value', 'test input')
  })

  it('renders dark mode', () => {
    mountStory({ darkMode: true })
    cy.get('input')
      .first()
      .parent()
      .parent()
      .parent()
      .should('have.class', 'bg-gray-1000')
  })
}
