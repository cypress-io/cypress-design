/// <reference types="cypress" />

import type { NavGroup, NavItemLink } from './constants'

const menuItems = [
  {
    label: 'Get Started',
    href: 'one',
  },
  {
    label: 'Overview',
    items: [
      {
        label: 'Overview Item 1',
        href: 'two',
      },
      {
        label: 'Overview Item 2',
        href: 'three',
      },
    ],
  },
  {
    label: 'Getting Started',
    items: [
      {
        label: 'Item 1',
        href: 'four',
      },
      {
        label: 'Item 2',
        href: 'five',
      },
    ],
  },
  {
    label: 'End-to-End Testing',
    items: [
      {
        label: 'Introduction to E2E Testing',
        items: [
          {
            label: 'Item 1',
            href: 'six',
          },
          {
            label: 'sub menu',
            items: [
              {
                label: 'Item 1',
                href: 'seven',
              },
              {
                label: 'Item 2',
                href: 'eight',
              },
            ],
          },
          {
            label: 'Item 2',
            href: 'nine',
          },
        ],
      },
      {
        label: 'AWS Authentication',
        href: 'aws',
      },
      {
        label: 'Google Authentication',
        href: 'google',
      },
      {
        label: 'Okta Authentication',
        href: 'okta',
      },
    ],
  },
] satisfies (NavItemLink | NavGroup)[]

export default function assertions(
  mountStory: (
    options?: (NavItemLink | NavGroup)[],
    activePath?: string,
  ) => void,
  mountCustomLinkStory: () => void,
): void {
  it('renders', () => {
    mountStory(menuItems, 'eight')
  })

  it('closes the menu', () => {
    mountStory(menuItems, 'eight')

    cy.contains('Overview Item 1').should('be.visible')
    cy.contains('button', 'Overview').click()

    cy.contains('Overview Item 1').should('not.be.visible')
  })

  it('keeps track of active values', { viewportHeight: 800 }, () => {
    mountStory(menuItems, 'google')

    cy.contains('sub menu').click()

    cy.contains('Google Authentication').scrollIntoView()
    cy.wait(300)
    cy.contains('li', 'Google Authentication').then(($el) => {
      const top = $el[0].getBoundingClientRect().top
      cy.get('[data-cy="doc-menu-active-marker"]').then(($marker) => {
        expect(Math.abs($marker[0].getBoundingClientRect().top - top)).to.below(
          10,
          `marker should be close to the active item`,
        )
      })
    })
  })

  it('expands a section where an element is activated', () => {
    mountCustomLinkStory()
    cy.findByText('Foo', { selector: 'button' }).should(
      'have.class',
      'text-indigo-500',
    )

    cy.findByText('Set path to /kephren', { selector: 'button' }).click()

    cy.findByText('Kephren', { selector: 'button' })
      .should('be.visible')
      .should('have.class', 'text-indigo-500')

    cy.findByTestId('doc-menu-active-marker').should('have.css', 'top', '220px')
  })
}

export const BIG_ITEMS_SET = [
  {
    href: '/fooTop',
    label: 'Foo Top',
  },
  {
    href: '/test',
    label: 'Getting started',
  },
  {
    href: '/faaz',
    label: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,',
  },
  {
    label: 'Baaaaaaz',
    items: [
      {
        label: 'Bar',
        items: [
          {
            href: '/foo',
            label: 'Foo',
          },
          {
            href: '/test',
            label: 'Getting started',
          },
        ],
      },
      {
        label: 'Code',
        collapsed: true,
        items: [
          {
            href: '/faa',
            label: 'sasassa',
          },
          {
            href: '/faa1',
            label: 'sasassa2',
          },
          {
            href: '/faa2',
            label: 'sasassa3',
          },
          {
            href: '/faa3',
            label: 'sasassa4',
          },
          {
            href: '/faa4',
            label: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
          },
          {
            href: '/faa5',
            label: 'sasassa5',
          },
          {
            href: '/faa6',
            label:
              'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos',
          },
        ],
      },
    ],
  },
]
