import React from 'react'
import { mount } from '@cypress/react'
import { Avatar } from './Avatar'

it('displays src', () => {
  mount(<Avatar entity={{ avatar: 'http://placekitten.com/200/400' }} />)

  cy.get('img')
    .should('have.attr', 'src')
    .should('include', 'http://placekitten.com/200/400')
})

it('displays gravatar from email', () => {
  mount(<Avatar entity={{ email: 'beau@automattic.com' }} />)

  cy.get('img').should('have.attr', 'src').should('include', 'gravatar')
})

it('prioritizes src over email if both are provided', () => {
  mount(
    <Avatar
      entity={{
        avatar: 'http://placekitten.com/200/400',
        email: 'beau@automattic.com',
      }}
    />
  )

  cy.get('img')
    .should('have.attr', 'src')
    .should('include', 'http://placekitten.com/200/400')
})

it('displays gravatar from email', () => {
  mount(<Avatar entity={{ email: 'beau@automattic.com' }} />)

  cy.get('img').should('have.attr', 'src').should('include', 'gravatar')
})

it('can have a border', () => {
  mount(
    <Avatar entity={{ avatar: 'http://placekitten.com/200/400' }} hasBorder />
  )

  cy.get('img').should(
    'have.css',
    'box-shadow',
    'rgb(255, 255, 255) 0px 0px 0px 2px'
  )
})

it('should not have a border unless specified', () => {
  mount(<Avatar entity={{ avatar: 'http://placekitten.com/200/400' }} />)

  cy.get('img').should(
    'not.have.css',
    'box-shadow',
    'rgb(255, 255, 255) 0px 0px 0px 2px'
  )
})

it('displays a default icon if no avatar or email is provided', () => {
  mount(<Avatar entity={{}} />)

  cy.get('.cy-user-general-icon')
})

it('displays a default icon if no avatar or email is provided', () => {
  mount(<Avatar entity={{ email: 'noavatarexists@cypress.io' }} />)

  // gravatar should return a 404, which gets replaced by our own icon
  cy.get('img').should('have.attr', 'src').should('include', '404')
  cy.get('img').should('have.attr', 'src').should('include', 'cypress')
})

describe('alt text', () => {
  it('should use alt text if passed in as a prop', () => {
    mount(
      <Avatar
        alt="hello"
        entity={{
          avatar: 'http://placekitten.com/200/400',
        }}
      />
    )

    cy.get('img').should('have.attr', 'alt').should('include', 'hello')
  })

  it('should prioritize alt prop over others', () => {
    mount(
      <Avatar
        alt="hello"
        entity={{
          email: 'beau@automattic.com',
          name: 'Beau',
        }}
      />
    )

    cy.get('img').should('have.attr', 'alt').should('include', 'hello')
  })

  it('should use name for alt text if alt prop is not provided', () => {
    mount(
      <Avatar
        entity={{
          email: 'beau@automattic.com',
          name: 'Beau',
        }}
      />
    )

    cy.get('img').should('have.attr', 'alt').should('include', 'Beau')
  })

  it('should use email for alt text if alt prop and name are not provided', () => {
    mount(
      <Avatar
        entity={{
          email: 'beau@automattic.com',
        }}
      />
    )

    cy.get('img').should('have.attr', 'alt').should('include', 'automattic')
  })

  it('should provide generic alt text if nothing useful is provided', () => {
    mount(<Avatar entity={{ avatar: 'http://placekitten.com/200/400' }} />)

    cy.get('img').should('have.attr', 'alt').should('eq', 'avatar')
  })
})
