import React from 'react'
import { take } from 'lodash'
import { mount } from '@cypress/react'
import { AvatarList } from './AvatarList'

const entities = [
  { avatar: 'http://placekitten.com/200/400' },
  { avatar: 'http://placekitten.com/200/300' },
  { avatar: 'http://placekitten.com/200/300' },
  { avatar: 'http://placekitten.com/200/300' },
  { avatar: 'http://placekitten.com/200/200' },
]

export const mixed = [
  { avatar: 'http://placekitten.com/200/400' },
  { email: 'beau@automattic.com' },
  { avatar: 'http://placekitten.com/200/200' },
]

it('displays all if no `maxShown`', () => {
  mount(<AvatarList entities={entities} />)

  cy.get('li').should('have.length', 5)
})

it('limits to `maxShown`', () => {
  mount(<AvatarList entities={entities} maxShown={2} />)

  cy.get('li').should('have.length', 3)
  cy.get('li')
    .last()
    .within(() => {
      cy.get('svg')
    })
})

it('shows a "+" if total is more than `maxShown`, even if no extra urls are provided', () => {
  mount(<AvatarList entities={take(entities, 2)} maxShown={2} total={3} />)

  cy.get('li').should('have.length', 3)
  cy.get('li')
    .last()
    .within(() => {
      cy.get('svg')
    })
})

it('doesn\'t show a "+" if maxShown is larger than number of urls provided', () => {
  mount(<AvatarList maxShown={4} entities={take(entities, 2)} />)

  cy.get('li').should('have.length', 2)
  cy.get('li svg').should('not.exist')
})

it('works as expected with a mix of emails and avatars', () => {
  mount(<AvatarList entities={mixed} />)

  cy.get('li').should('have.length', 3)
})
