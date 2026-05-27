/// <reference types="cypress" />

import type { RunStatusProps } from '@cypress-design/constants-runstatus'

type MountFn = (props?: Partial<RunStatusProps>) => void

// Inject a focusable sentinel <button> before the mounted pill so we can
// keyboard-Tab INTO the component (rather than programmatically focusing the
// first link, which doesn't exercise tab order or activate :focus-visible).
function insertSentinel(): Cypress.Chainable {
  return cy.document().then((doc) => {
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

    it('focus-visible ring activates on keyboard focus of linked stats', () => {
      mountStory({
        passed: 22,
        failed: 0,
        skipped: 0,
        pending: 0,
        links: { passed: '#passed' },
      })
      // Programmatic .focus() does not trigger :focus-visible per the CSS
      // spec — only keyboard / "sticky" focus does. So we Tab in from a
      // sentinel and check the pseudo-class actually matches, plus that the
      // resulting computed outline is visible (non-zero width and not "none").
      insertSentinel()
      cy.get('[data-cy="sentinel-before-pill"]').focus()
      cy.realPress('Tab')
      cy.get('[data-cy="link-passed"]').then(($el) => {
        const el = $el[0]
        expect(el.matches(':focus-visible'), ':focus-visible matches').to.be
          .true
        const styles = el.ownerDocument.defaultView!.getComputedStyle(el)
        expect(styles.outlineStyle, 'outline-style').to.not.equal('none')
        expect(
          parseFloat(styles.outlineWidth),
          'outline-width (px)',
        ).to.be.greaterThan(0)
      })
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
