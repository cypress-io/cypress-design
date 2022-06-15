/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import Button from './Button.vue'
import ButtonStory from './Button.rootstory'

describe('<Button />', { viewportHeight: 600, viewportWidth: 1000 }, () => {
  it('renders variants disabled', () => {
    mount(() => ButtonStory({ disabled: true }))
  })

  it('renders variants', () => {
    mount(ButtonStory)
  })

  it('is clickable', () => {
    const onClickSpy = cy.spy().as('onClickSpy')
    mount(() => <Button onClick={onClickSpy}>Hello</Button>)
    cy.get('button').click().get('@onClickSpy').should('have.been.calledOnce')
  })
})
