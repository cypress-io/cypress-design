/// <reference types="cypress" />

import type { ProgressBarProps } from '@cypress-design/constants-progressbar'

type MountFn = (props?: ProgressBarProps & { className?: string }) => void

const bar = '[data-cy="progress-bar"]'
const fill = '[data-cy="progress-bar-fill"]'

function fillWidths(): Cypress.Chainable<number[]> {
  return cy.get(bar).then(($bar) => {
    const trackWidth = $bar[0].getBoundingClientRect().width
    return Cypress.$.makeArray($bar.find(fill)).map((el) =>
      Math.round((el.getBoundingClientRect().width / trackWidth) * 100),
    )
  })
}

export default function assertions(mountStory: MountFn): void {
  describe('single value', () => {
    it('fills the share of the track given by value / max', () => {
      mountStory({ value: 30 })
      cy.get(fill).should('have.length', 1)
      fillWidths().should('deep.equal', [30])
      cy.get(fill).should('have.class', 'bg-indigo-500')
      cy.get(fill).should('have.class', 'rounded-r-full')
    })

    it('scales against a custom max', () => {
      mountStory({ value: 3600, max: 10000 })
      fillWidths().should('deep.equal', [36])
    })

    // One mount per test: Vue's mount doesn't unmount the previous
    // component until the test ends.
    it('caps values above max', () => {
      mountStory({ value: 140 })
      fillWidths().should('deep.equal', [100])
    })

    it('treats negative values as 0', () => {
      mountStory({ value: -10 })
      cy.get(fill).should('not.exist')
    })

    it('falls back to a max of 100 when max is not positive', () => {
      mountStory({ value: 40, max: 0 })
      cy.get(bar).should('have.attr', 'aria-valuemax', '100')
      fillWidths().should('deep.equal', [40])
    })

    it('renders an empty track at 0', () => {
      mountStory({ value: 0 })
      cy.get(bar).should('have.class', 'bg-gray-50')
      cy.get(fill).should('not.exist')
    })
  })

  describe('sizes', () => {
    ;(['6', '8', '12'] as const).forEach((size) => {
      it(`renders ${size}px tall`, () => {
        mountStory({ value: 50, size })
        cy.get(bar).invoke('outerHeight').should('equal', Number(size))
      })
    })

    it('defaults to 6px', () => {
      mountStory({ value: 50 })
      cy.get(bar).invoke('outerHeight').should('equal', 6)
    })
  })

  describe('colors', () => {
    it('applies a preset color', () => {
      mountStory({ value: 50, color: 'teal' })
      cy.get(fill).should('have.class', 'bg-teal-400')
    })

    it('uses the dark fills and track on the dark theme', () => {
      mountStory({ value: 50, theme: 'dark' })
      cy.get(bar).should('have.class', 'bg-gray-900')
      cy.get(fill).should('have.class', 'bg-indigo-400')
    })

    it('lets fillClassName override the preset color', () => {
      mountStory({ value: 50, fillClassName: 'bg-teal-600' })
      cy.get(fill)
        .should('have.class', 'bg-teal-600')
        .and('not.have.class', 'bg-indigo-500')
    })

    it('lets className override the track color', () => {
      mountStory({ value: 50, className: 'bg-white' })
      cy.get(bar)
        .should('have.class', 'bg-white')
        .and('not.have.class', 'bg-gray-50')
    })
  })

  describe('segments', () => {
    const segments = [
      { value: 233, label: 'Open mode' },
      { value: 179, label: 'Run mode', color: 'teal' as const },
    ]

    it('draws one fill per segment, in order', () => {
      mountStory({ segments, max: 412 })
      cy.get(fill).should('have.length', 2)
      cy.get(fill).eq(0).should('have.class', 'bg-indigo-500')
      cy.get(fill).eq(1).should('have.class', 'bg-teal-400')
      cy.get(fill).eq(0).should('not.have.class', 'rounded-r-full')
      cy.get(fill).eq(1).should('have.class', 'rounded-r-full')
    })

    it('ignores value when segments are given', () => {
      mountStory({ value: 90, segments: [{ value: 10 }] })
      cy.get(fill).should('have.length', 1)
      fillWidths().should('deep.equal', [10])
    })

    it('skips empty segments and stops filling at max', () => {
      mountStory({
        segments: [{ value: 60 }, { value: 0 }, { value: 70 }, { value: 5 }],
      })
      cy.get(fill).should('have.length', 2)
      cy.get(bar).should('have.attr', 'aria-valuenow', '100')
    })

    it('rounds aria-valuenow for fractional segments', () => {
      mountStory({ max: 1, segments: [{ value: 0.1 }, { value: 0.2 }] })
      cy.get(bar).should('have.attr', 'aria-valuenow', '0.3')
    })

    it('applies a per-segment className', () => {
      mountStory({ segments: [{ value: 50, className: 'bg-teal-600' }] })
      cy.get(fill).should('have.class', 'bg-teal-600')
    })
  })

  describe('active state', () => {
    it('animates the fill when active', () => {
      mountStory({ value: 40, active: true })
      cy.get(fill).should('have.class', 'cy-progress-bar-active')
      cy.get(fill)
        .should('have.css', 'animation-name')
        .and('equal', 'cy-progress-bar-shimmer')
      cy.get('style#cy-progress-bar-active-style').should('have.length', 1)
    })

    it('does not animate by default', () => {
      mountStory({ value: 40 })
      cy.get(fill).should('not.have.class', 'cy-progress-bar-active')
    })

    it('lets a segment opt in on its own', () => {
      mountStory({
        segments: [{ value: 40 }, { value: 20, active: true }],
      })
      cy.get(fill).eq(0).should('not.have.class', 'cy-progress-bar-active')
      cy.get(fill).eq(1).should('have.class', 'cy-progress-bar-active')
    })
  })
}
