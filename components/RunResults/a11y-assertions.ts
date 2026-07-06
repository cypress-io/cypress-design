/// <reference types="cypress" />

import type { RunResultsProps } from '@cypress-design/constants-runresults'

type MountFn = (props?: Partial<RunResultsProps>) => void

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

export default function a11yAssertions(
  mountStory: MountFn,
  fw: 'vue' | 'react',
): void {
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
      cy.get(
        '[data-cy="run-results"] a, [data-cy="run-results"] button',
      ).should('not.exist')
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
      // Visual baseline for the focus / focus-visible state — locks in the
      // outline color, width, and offset so a Tailwind / token change that
      // breaks the focus ring would surface as a Percy diff.
      cy.percySnapshot(`RunResults focused linked stat - ${fw}`)
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

  // ---------------------------------------------------------------------------
  // Run-status pill
  // ---------------------------------------------------------------------------

  describe('run-status pill', () => {
    describe('keyboard navigation', () => {
      it('linked #N segment is reachable via Tab', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            href: '#run',
          },
        })
        insertSentinel()
        cy.get('[data-cy="sentinel-before-pill"]').focus()
        cy.realPress('Tab')
        cy.focused().should('have.attr', 'data-cy', 'run-status-build-number')
      })

      it('linked #N carries focus-visible outline classes', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            href: '#run',
          },
        })
        insertSentinel()
        cy.get('[data-cy="sentinel-before-pill"]').focus()
        cy.realPress('Tab')
        cy.focused().should('have.attr', 'data-cy', 'run-status-build-number')
        // Same rationale as the test-counts focus check above — assert the
        // Tailwind classes wired for focus-visible, not the computed
        // :focus-visible state (unreliable in headless Cypress).
        cy.get('[data-cy="run-status-build-number"]')
          .should('have.class', 'focus-visible:outline')
          .and('have.class', 'focus-visible:outline-2')
          .and('have.class', 'focus-visible:outline-indigo-500')
        cy.percySnapshot(`RunResults focused run-status - ${fw}`)
      })

      it('base variant with no href is not in the tab order', () => {
        // `variant: 'base'` without href → the pill is presentational.
        // Guard against a regression that accidentally emits an <a> when
        // href is absent.
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed', variant: 'base' },
        })
        cy.get('[data-cy="run-status"] a').should('not.exist')
      })

      it('branch segment is never focusable', () => {
        // Even with a linked `#N`, the branch segment is always plain text.
        // Regression guard for the `branchHref` removal in commit 8408c052.
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
            href: '#run',
          },
        })
        cy.get('[data-cy="run-status-branch"]').should('match', 'span')
      })
    })

    describe('aria labels', () => {
      it('linked #N announces both the run number and the readable status', () => {
        // Screen readers read `aria-label` in place of the visible text on
        // a link. The visible content is just `#468` — without the status
        // word, the reader never hears whether the run passed, failed, or
        // is still running.
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            href: '#run',
          },
        })
        cy.get('[data-cy="run-status-build-number"]').should(
          'have.attr',
          'aria-label',
          'View run #468 — Passed',
        )
      })

      // One `it()` per palette bucket. `mountStory` inside a forEach in a
      // single `it()` doesn't work — Cypress queues commands, so all mounts
      // fire synchronously and only the last DOM state gets queried.
      ;(
        [
          { status: 'passed', label: 'Passed' },
          { status: 'failed', label: 'Failed' },
          { status: 'running', label: 'Running' },
          { status: 'cancelled', label: 'Cancelled' },
          { status: 'errored', label: 'Errored' },
        ] as const
      ).forEach(({ status, label }) => {
        it(`aria-label for status="${status}" → "View run #468 — ${label}"`, () => {
          mountStory({
            runStatus: {
              buildNumber: 468,
              status,
              href: '#run',
            },
          })
          cy.get('[data-cy="run-status-build-number"]').should(
            'have.attr',
            'aria-label',
            `View run #468 — ${label}`,
          )
        })
      })

      it('unlinked #N has no aria-label (bare span is fine for AT)', () => {
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
        })
        cy.get('[data-cy="run-status-build-number"]').should(
          'not.have.attr',
          'aria-label',
        )
      })

      it('pill wrapper has a title attribute for hover / non-screen-reader users', () => {
        // `title` is a hover-tooltip fallback for users who don't have a
        // screen reader announcing the aria-label. Screen readers prefer
        // the aria-label on the inner <a> (test above), but for a base
        // variant with no <a>, `title` is the only status affordance.
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
        })
        cy.get('[data-cy="run-status"]').should('have.attr', 'title', 'Passed')
      })
    })
  })
}
