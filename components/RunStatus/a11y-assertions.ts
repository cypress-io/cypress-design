/// <reference types="cypress" />

import type { RunStatusProps } from '@cypress-design/constants-runstatus'

type MountFn = (props?: Partial<RunStatusProps>) => void

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
      // Tab into the component — first linked stat should receive focus
      cy.get('[data-cy="link-passed"]').focus()
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

    it('focus-visible ring is present on linked stats', () => {
      mountStory({
        passed: 22,
        failed: 0,
        skipped: 0,
        pending: 0,
        links: { passed: '#passed' },
      })
      cy.get('[data-cy="link-passed"]').focus()
      cy.get('[data-cy="link-passed"]').should(
        'have.class',
        'focus-visible:outline',
      )
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

    it('flaky aria-label is singular when count is 1', () => {
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
        'This test both passed and failed when retried within a run',
      )
    })
  })
}
