/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { SpecResults } from './SpecResults'
import type { SpecResultsProps } from './SpecResults'

function mountStory(props: SpecResultsProps) {
  mount(
    <div className="p-8">
      <SpecResults {...props} />
    </div>,
  )
}

describe('<SpecResults /> React', () => {
  it('indeterminate: renders a single "Testing in progress" pill with no counts known', () => {
    mountStory({ results: {} })
    cy.get('[data-cy="spec-results-pill-running"]').should(
      'contain.text',
      'Testing in progress',
    )
    cy.get('[data-cy^="spec-results-pill-"]').should('have.length', 1)
  })

  it('running: nothing finished yet shows only the remaining pill', () => {
    mountStory({ results: { running: 4, queued: 20 } })
    cy.get('[data-cy="spec-results-pill-running"]').should(
      'contain.text',
      '24 specs remaining',
    )
    cy.get('[data-cy^="spec-results-pill-"]').should('have.length', 1)
  })

  it('running: partial results renders every non-zero pill in fixed order', () => {
    mountStory({
      results: { failed: 1, passed: 18, skipped: 1, running: 2, queued: 3 },
    })
    cy.get('[data-cy^="spec-results-pill-"]').then(($pills) => {
      const order = [...$pills].map((el) => el.getAttribute('data-cy'))
      expect(order).to.deep.equal([
        'spec-results-pill-failed',
        'spec-results-pill-passed',
        'spec-results-pill-skipped',
        'spec-results-pill-running',
      ])
    })
    cy.get('[data-cy="spec-results-pill-failed"]').should(
      'contain.text',
      '1 failed spec',
    )
    cy.get('[data-cy="spec-results-pill-passed"]').should(
      'contain.text',
      '18 passed specs',
    )
    cy.get('[data-cy="spec-results-pill-skipped"]').should(
      'contain.text',
      '1 skipped spec',
    )
    cy.get('[data-cy="spec-results-pill-running"]').should(
      'contain.text',
      '5 specs remaining',
    )
  })

  it('running: all passing so far', () => {
    mountStory({ results: { passed: 22, running: 2 } })
    cy.get('[data-cy="spec-results-pill-passed"]').should(
      'contain.text',
      '22 passed specs',
    )
    cy.get('[data-cy="spec-results-pill-running"]').should(
      'contain.text',
      '2 specs remaining',
    )
  })

  it('running: shows the Cancel run button only when onCancel is passed', () => {
    mountStory({ results: { passed: 1, running: 1 }, onCancel: () => {} })
    cy.get('[data-cy="spec-results-cancel"]').should('exist')
  })

  it('scheduled to complete: swaps the remaining pill for a countdown and links to settings', () => {
    mountStory({
      results: { failed: 1, passed: 28, skipped: 2 },
      scheduledToComplete: '60s',
    })
    cy.get('[data-cy="spec-results-pill-running"]')
      .should('contain.text', '60s remaining')
      .should('have.attr', 'href', '../../settings/general')
    cy.get('[data-cy="spec-results-cancel"]').should('not.exist')
  })

  it('complete: all specs passed has no remaining pill or Cancel button', () => {
    mountStory({ results: { passed: 31 } })
    cy.get('[data-cy="spec-results-pill-passed"]').should(
      'contain.text',
      '31 passed specs',
    )
    cy.get('[data-cy="spec-results-pill-running"]').should('not.exist')
    cy.get('[data-cy="spec-results-cancel"]').should('not.exist')
  })

  it('complete: with failed specs', () => {
    mountStory({ results: { failed: 1, passed: 28, skipped: 2 } })
    cy.get('[data-cy="spec-results-pill-failed"]').should(
      'contain.text',
      '1 failed spec',
    )
  })

  it('complete: with errored specs', () => {
    mountStory({
      results: { failed: 2, errored: 3, passed: 15, skipped: 1 },
    })
    cy.get('[data-cy="spec-results-pill-errored"]').should(
      'contain.text',
      '3 errored specs',
    )
  })

  it('label="" drops the trailing noun from every pill', () => {
    mountStory({ results: { failed: 1, passed: 28, skipped: 2 }, label: '' })
    cy.get('[data-cy="spec-results-pill-failed"]').should(
      'contain.text',
      '1 failed',
    )
    cy.get('[data-cy="spec-results-pill-passed"]').should(
      'contain.text',
      '28 passed',
    )
    cy.get('[data-cy="spec-results-pill-failed"]').should(
      'not.contain.text',
      'spec',
    )
  })

  it('pills link to the Specs tab filtered to the right status(es)', () => {
    mountStory({
      results: { failed: 1, errored: 1, skipped: 1, passed: 1 },
    })
    cy.get('[data-cy="spec-results-pill-failed"]').should(
      'have.attr',
      'href',
      '../specs?specStatus=' + encodeURIComponent('["FAILED"]'),
    )
    cy.get('[data-cy="spec-results-pill-errored"]').should(
      'have.attr',
      'href',
      '../specs?specStatus=' + encodeURIComponent('["ERRORED","TIMEDOUT"]'),
    )
    cy.get('[data-cy="spec-results-pill-skipped"]').should(
      'have.attr',
      'href',
      '../specs?specStatus=' + encodeURIComponent('["NOTESTS","CANCELLED"]'),
    )
  })
})
