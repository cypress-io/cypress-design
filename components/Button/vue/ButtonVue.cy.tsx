/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import Button from './Button'
import ButtonStory from './Button.rootstory'

describe('<Button />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  it('playground', () => {
    mount(() => (
      <div class="p-5">
        <Button variant="jade-dark">Check it</Button>
      </div>
    ))
  })

  it('renders variants disabled', () => {
    mount(() => ButtonStory({ disabled: true }))
    cy.get('button').first().as('firstButton')

    cy.log('disabled state should not have underline on hover')
    cy.get('@firstButton').should(
      'not.have.css',
      'text-decoration-line',
      'underline'
    )
    cy.get('@firstButton').realHover()
    cy.get('@firstButton').should(
      'not.have.css',
      'text-decoration-line',
      'underline'
    )
  })

  it('renders variants', () => {
    mount(ButtonStory)
    cy.get('button').first().as('firstButton')

    cy.log('should have underline on hover')
    cy.get('@firstButton').should(
      'not.have.css',
      'text-decoration-line',
      'underline'
    )
    cy.get('@firstButton').realHover()
    cy.get('@firstButton').should(
      'have.css',
      'text-decoration-line',
      'underline'
    )
  })

  it('is clickable', () => {
    const onClickSpy = cy.spy().as('onClickSpy')
    mount(() => <Button onClick={onClickSpy}>Hello</Button>)
    cy.get('button').click().get('@onClickSpy').should('have.been.calledOnce')
  })
})
