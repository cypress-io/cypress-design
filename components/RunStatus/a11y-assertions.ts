/// <reference types="cypress" />

import type { RunStatusProps } from '@cypress-design/constants-runstatus'

type MountFn = (props?: Partial<RunStatusProps>) => void

// Inject a focusable sentinel <button> before the mounted pill so we can
// keyboard-Tab INTO the component (rather than programmatically focusing the
// first link, which doesn't exercise tab order or activate :focus-visible).
//
// Cypress component-testing clears the mount root between tests but does NOT
// clear arbitrary nodes appended to `document.body`. We must remove any
// leftover sentinel from a prior `it` first, otherwise the second test in
// the same describe ends up with two matching elements and Tab navigation
// breaks.
function insertSentinel(): Cypress.Chainable {
  return cy.document().then((doc) => {
    doc
      .querySelectorAll('[data-cy="sentinel-before-pill"]')
      .forEach((n) => n.remove())
    const btn = doc.createElement('button')
    btn.setAttribute('data-cy', 'sentinel-before-pill')
    btn.textContent = 'sentinel'
    doc.body.insertBefore(btn, doc.body.firstChild)
  })
}

export default function a11yAssertions(mountStory: MountFn): void {
  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------

  describe('keyboard navigation', () => {
    it('linked stats are reachable via Tab', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        links: { passed: '#passed', failed: '#failed' },
      })
      // Focus a sentinel before the pill, then Tab IN — verifies the first
      // linked stat is actually in the tab order (a missing tabindex or a
      // non-focusable wrapper would surface here).
      insertSentinel()
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'link-passed')

      // Tab to the next linked stat
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'link-failed')
    })

    it('unlinked stats are not in the tab order', () => {
      mountStory({ passed: 22, failed: 4, skipped: 0, pending: 1 })
      // No focusable elements inside the pill
      cy.get('[data-cy="run-stats"] a, [data-cy="run-stats"] button').should(
        'not.exist',
      )
    })

    it('linked stats receive keyboard focus and carry focus-visible outline classes', () => {
      mountStory({
        passed: 22,
        failed: 0,
        skipped: 0,
        pending: 0,
        links: { passed: '#passed' },
      })
      // Tab in from a sentinel so we exercise real keyboard navigation
      // (programmatic .focus() would mask a regression in focusability).
      insertSentinel()
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab')
      // The link is actually reachable via keyboard…
      cy.focused().should('have.attr', 'data-cy', 'link-passed')
      // …and the link has the Tailwind focus-visible:* classes wired up so
      // the browser will paint the outline when :focus-visible activates.
      //
      // We intentionally do NOT assert el.matches(':focus-visible') or read
      // computed outline styles here: Chrome's :focus-visible heuristic is
      // unreliable inside Cypress's test iframe (even with CDP-dispatched
      // real key events from cypress-real-events), so a green/red signal on
      // those assertions doesn't track the real-world behaviour.
      cy.get('[data-cy="link-passed"]')
        .should('have.class', 'focus-visible:outline')
        .and('have.class', 'focus-visible:outline-2')
        .and('have.class', 'focus-visible:outline-indigo-500')
    })
  })

  // ---------------------------------------------------------------------------
  // ARIA labels
  // ---------------------------------------------------------------------------

  describe('aria labels', () => {
    it('linked stats carry descriptive aria-labels', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        flaky: 3,
        selfHealed: 2,
        showSelfHealed: true,
        links: {
          passed: '#passed',
          failed: '#failed',
          pending: '#pending',
          flaky: '#flaky',
          selfHealed: '#self-healed',
        },
      })
      cy.get('[data-cy="link-passed"]').should(
        'have.attr',
        'aria-label',
        'View passed tests',
      )
      cy.get('[data-cy="link-failed"]').should(
        'have.attr',
        'aria-label',
        'View failed tests',
      )
      cy.get('[data-cy="link-pending"]').should(
        'have.attr',
        'aria-label',
        'View pending tests',
      )
      cy.get('[data-cy="link-flaky"]').should(
        'have.attr',
        'aria-label',
        'View flaky tests',
      )
      cy.get('[data-cy="link-self-healed"]').should(
        'have.attr',
        'aria-label',
        'View self-healed tests',
      )
    })

    it('linked flaky stat always uses "View flaky tests" aria-label regardless of count', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        flaky: 1,
        links: { flaky: '#flaky' },
      })
      cy.get('[data-cy="link-flaky"]').should(
        'have.attr',
        'aria-label',
        'View flaky tests',
      )
    })
  })
}
