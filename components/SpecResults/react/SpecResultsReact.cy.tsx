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

  it('running: queued only (nothing claimed yet) still shows the remaining pill', () => {
    mountStory({ results: { queued: 20 } })
    cy.get('[data-cy="spec-results-pill-running"]').should(
      'contain.text',
      '20 specs remaining',
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
      const order = $pills.toArray().map((el) => el.getAttribute('data-cy'))
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

  it('scheduled to complete: hides Archive even though nothing is running or queued', () => {
    mountStory({
      results: { failed: 1, passed: 28, skipped: 2 },
      scheduledToComplete: '60s',
      onArchive: () => {},
    })
    cy.get('[data-cy="spec-results-archive"]').should('not.exist')
  })

  it('scheduled to complete: explains the delay on hover', () => {
    mountStory({
      results: { failed: 1, passed: 28, skipped: 2 },
      scheduledToComplete: '60s',
    })
    cy.get('[data-cy="spec-results-pill-running"]').realHover()
    cy.get('[data-cy="spec-results-pill-running-tooltip"]')
      .should('be.visible')
      .should('contain.text', 'Run Completion Delay')
      .should('contain.text', 'new groups to join')
    // The tooltip carries its own clickable CTA (same href as the pill
    // itself) rather than relying on the reader knowing to click through
    // the tooltip to the pill underneath.
    cy.get('[data-cy="spec-results-pill-running-tooltip"] a')
      .should('contain.text', 'Update setting')
      .should('have.attr', 'href', '../../settings/general')
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

  it('isComplete overrides a still-queued run to show the Archive button', () => {
    mountStory({
      results: { passed: 3, errored: 2, queued: 20 },
      onArchive: () => {},
      isComplete: true,
    })
    cy.get('[data-cy="spec-results-archive"]').should('exist')
  })

  it('without the isComplete override, a still-queued run hides Archive', () => {
    mountStory({
      results: { passed: 3, errored: 2, queued: 20 },
      onArchive: () => {},
    })
    cy.get('[data-cy="spec-results-archive"]').should('not.exist')
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

  it('skipped and cancelled are separate inputs that combine into one pill and link', () => {
    mountStory({
      results: { passed: 20, skipped: 1, cancelled: 2 },
    })
    cy.get('[data-cy="spec-results-pill-skipped"]')
      .should('contain.text', '3 skipped specs')
      .should(
        'have.attr',
        'href',
        'specs?specStatus=' + encodeURIComponent('["NOTESTS","CANCELLED"]'),
      )
  })

  it('skipped pill shows a no-tests/auto-cancellation breakdown on hover when both are nonzero', () => {
    mountStory({
      results: { passed: 20, skipped: 2, cancelled: 1 },
    })
    // Use realHover so Floating UI's hover interaction fires correctly.
    cy.get('[data-cy="spec-results-pill-skipped"]').realHover()
    cy.get('[data-cy="spec-results-pill-skipped-tooltip"]')
      .should('be.visible')
      .should('contain.text', '2 specs skipped with no tests')
      .should('contain.text', '1 spec skipped via Auto Cancellation')
    // The Auto Cancellation row borrows the DS's lightning-bolt icon
    // (indigo, "time saved") rather than reusing the plain skipped icon.
    cy.contains(
      '[data-cy="spec-results-pill-skipped-tooltip"] div',
      'Auto Cancellation',
    )
      .find('svg')
      .should('have.class', 'icon-dark-indigo-300')
  })

  it('skipped pill shows Manual Cancellation instead of Auto when cancelledReason is manual', () => {
    mountStory({
      results: {
        passed: 20,
        skipped: 2,
        cancelled: 1,
        cancelledReason: 'manual',
      },
    })
    cy.get('[data-cy="spec-results-pill-skipped"]').realHover()
    cy.get('[data-cy="spec-results-pill-skipped-tooltip"]')
      .should('be.visible')
      .should('contain.text', '1 spec skipped via Manual Cancellation')
      .should('not.contain.text', 'Auto Cancellation')
    // Manual Cancellation reuses the plain skipped/ban icon, not the
    // lightning bolt -- nothing was "saved" by automation here.
    cy.contains(
      '[data-cy="spec-results-pill-skipped-tooltip"] div',
      'Manual Cancellation',
    )
      .find('svg')
      .should('not.have.class', 'icon-dark-indigo-300')
  })

  it('skipped pill still shows the reason on hover even with only one cause', () => {
    mountStory({ results: { passed: 20, skipped: 3 } })
    cy.get('[data-cy="spec-results-pill-skipped"]').realHover()
    cy.get('[data-cy="spec-results-pill-skipped-tooltip"]')
      .should('be.visible')
      .should('contain.text', '3 specs skipped with no tests')
      .should('not.contain.text', 'Auto Cancellation')
  })

  it('remaining pill shows a running/queued breakdown on hover when both are nonzero', () => {
    mountStory({ results: { passed: 10, running: 2, queued: 5 } })
    cy.get('[data-cy="spec-results-pill-running"]').realHover()
    cy.get('[data-cy="spec-results-pill-running-tooltip"]')
      .should('be.visible')
      .should('contain.text', '2 specs running')
      .should('contain.text', '5 specs queued')
  })

  it('remaining pill still shows a tooltip naming the cause when only queued specs exist', () => {
    mountStory({ results: { queued: 20 } })
    cy.get('[data-cy="spec-results-pill-running"]').realHover()
    cy.get('[data-cy="spec-results-pill-running-tooltip"]')
      .should('be.visible')
      .should('contain.text', '20 specs queued')
      .should('not.contain.text', 'running')
  })

  it('remaining pill still shows a tooltip naming the cause when only running specs exist', () => {
    mountStory({ results: { passed: 1, running: 3 } })
    cy.get('[data-cy="spec-results-pill-running"]').realHover()
    cy.get('[data-cy="spec-results-pill-running-tooltip"]')
      .should('be.visible')
      .should('contain.text', '3 specs running')
      .should('not.contain.text', 'queued')
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

  it('stacks based on its own container width, not the viewport', () => {
    // The viewport stays at Cypress's default (>640px) -- only the wrapper
    // narrows. If this were still a viewport sm: media query, it would stay
    // row-direction here; a @container query correctly stacks it instead.
    mount(
      <div className="p-8" style={{ width: 300 }}>
        <SpecResults
          results={{ failed: 1, passed: 18, skipped: 1, running: 2, queued: 3 }}
        />
      </div>,
    )
    cy.get('[data-cy="spec-results-pill-failed"]')
      .parent()
      .should('have.css', 'flex-direction', 'column')
  })

  it('pills link to the Specs tab filtered to the right status(es)', () => {
    mountStory({
      results: { failed: 1, errored: 1, skipped: 1, passed: 1 },
    })
    cy.get('[data-cy="spec-results-pill-failed"]').should(
      'have.attr',
      'href',
      'specs?specStatus=' + encodeURIComponent('["FAILED"]'),
    )
    cy.get('[data-cy="spec-results-pill-errored"]').should(
      'have.attr',
      'href',
      'specs?specStatus=' + encodeURIComponent('["ERRORED","TIMEDOUT"]'),
    )
    cy.get('[data-cy="spec-results-pill-skipped"]').should(
      'have.attr',
      'href',
      'specs?specStatus=' + encodeURIComponent('["NOTESTS","CANCELLED"]'),
    )
  })
})
