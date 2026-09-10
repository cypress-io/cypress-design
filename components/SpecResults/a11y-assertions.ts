/// <reference types="cypress" />

import type { SpecResultsProps } from './react/SpecResults'

type MountFn = (props: SpecResultsProps) => void

// Inject a focusable sentinel <button> before the mounted component so we
// can keyboard-Tab INTO it (rather than programmatically focusing the first
// pill, which doesn't exercise real tab order or activate :focus-visible).
//
// Cypress component-testing clears the mount root between tests but does NOT
// clear arbitrary nodes appended to `document.body`. Remove any leftover
// sentinel from a prior `it` first, otherwise the second test in the same
// describe ends up with two matching elements and Tab navigation breaks.
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

export default function a11yAssertions(mountStory: MountFn, fw: 'react'): void {
  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------

  describe('keyboard navigation', () => {
    it('pills are reachable via Tab, in fixed order', () => {
      mountStory({
        results: { failed: 1, passed: 18, skipped: 1, running: 2, queued: 3 },
      })
      insertSentinel()
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'spec-results-pill-failed')

      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'spec-results-pill-passed')

      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'spec-results-pill-skipped')

      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'spec-results-pill-running')
    })

    it('the tick-bar has no focusable elements', () => {
      mountStory({
        results: { failed: 1, passed: 18, skipped: 1, running: 2, queued: 3 },
      })
      cy.get(
        '[data-cy="spec-results-bar"] a, [data-cy="spec-results-bar"] button',
      ).should('not.exist')
    })

    it('the non-interactive "0 specs found" pill is not in the tab order', () => {
      mountStory({ results: {}, isComplete: true })
      insertSentinel()
      // A trailing sentinel too: Tab off the very last focusable element on
      // a page has no "next" target `cy.focused()` can observe, so proving
      // the span is skipped needs something real on the other side of it.
      cy.document().then((doc) => {
        doc
          .querySelectorAll('[data-cy="sentinel-after-pill"]')
          .forEach((n) => n.remove())
        const btn = doc.createElement('button')
        btn.setAttribute('data-cy', 'sentinel-after-pill')
        btn.textContent = 'sentinel-after'
        doc.body.appendChild(btn)
      })
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab')
      // Skips straight to the trailing sentinel -- the span in between
      // isn't in the tab order at all.
      cy.focused().should('have.attr', 'data-cy', 'sentinel-after-pill')
      // A plain, non-interactive <span> -- not an <a> with no href, which
      // would still (incorrectly) carry link semantics.
      cy.get('[data-cy="spec-results-pill-errored"]').should(($el) => {
        expect($el.prop('tagName')).to.equal('SPAN')
        expect($el.attr('href')).to.be.undefined
      })
    })

    it('Cancel and Archive buttons are reachable via Tab when present', () => {
      mountStory({
        results: { passed: 1 },
        isComplete: true,
        onArchive: () => {},
      })
      insertSentinel()
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab') // -> passed pill
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'spec-results-archive')
    })

    it('pills receive keyboard focus and carry focus-visible outline classes', () => {
      mountStory({ results: { passed: 18 } })
      insertSentinel()
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'spec-results-pill-passed')
      // The link is actually reachable via keyboard, and carries the
      // Tailwind focus-visible:* classes wired up so the browser paints the
      // outline once :focus-visible activates.
      //
      // We intentionally do NOT assert el.matches(':focus-visible') or read
      // computed outline styles here -- Chrome's :focus-visible heuristic is
      // unreliable inside Cypress's test iframe (even with CDP-dispatched
      // real key events from cypress-real-events), so a green/red signal on
      // those assertions doesn't track real-world behavior.
      cy.get('[data-cy="spec-results-pill-passed"]')
        .should('have.class', 'focus-visible:outline')
        .and('have.class', 'focus-visible:outline-2')
        .and('have.class', 'focus-visible:outline-indigo-500')
    })

    // The interactive tooltip's nested link opens on the pill's keyboard
    // focus (Tooltip's useFocus), but Tooltip's popper renders through a
    // React portal straight to document.body (Tooltip.tsx, createPortal) --
    // not as a DOM descendant of the pill. The *next* Tab therefore follows
    // the portal's real position at the end of <body>, not the pill's
    // visual position, and Tooltip's useDismiss closes the tooltip the
    // moment focus lands outside the reference/floating pair. A
    // keyboard-only user can open the scheduled-to-complete tooltip but can
    // never actually Tab into its "Update setting" link.
    //
    // This is a Tooltip-level limitation (affects any consumer pairing
    // `interactive` with a real focusable child in the popper), not
    // something fixable from inside SpecResults -- tracked here as a known,
    // explicitly-skipped gap rather than silently dropped from coverage.
    it.skip('the scheduled-to-complete tooltip carries a keyboard-reachable "Update setting" link', () => {
      mountStory({
        results: { failed: 1, passed: 28, skipped: 2 },
        scheduledToComplete: '60s',
      })
      insertSentinel()
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'spec-results-pill-running')
      cy.realPress('Tab')
      cy.focused().should('contain.text', 'Update setting')
    })
  })
}
