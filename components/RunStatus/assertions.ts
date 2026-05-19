/// <reference types="cypress" />

import type { RunStatusProps } from '@cypress-design/constants-runstatus'

type MountFn = (props?: Partial<RunStatusProps>) => void

export default function assertions(
  mountStory: MountFn,
  fw: 'vue' | 'react',
): void {
  // ---------------------------------------------------------------------------
  // Rendering — which stats show up
  // ---------------------------------------------------------------------------

  describe('default rendering', () => {
    it('renders only non-zero regular stats', () => {
      mountStory({ passed: 22, failed: 4, skipped: 0, pending: 1 })
      cy.get('[data-cy="run-stats"]').should('exist')
      cy.get('[data-cy="total-passed"]').should('exist')
      cy.get('[data-cy="total-failed"]').should('exist')
      cy.get('[data-cy="total-pending"]').should('exist')
      cy.get('[data-cy="total-skipped"]').should('not.exist')
    })

    it('returns nothing when all stats are zero', () => {
      mountStory({ passed: 0, failed: 0, skipped: 0, pending: 0 })
      cy.get('[data-cy="run-stats"]').should('not.exist')
    })

    it('shows zeros for all regular stats when expanded', () => {
      mountStory({
        passed: 0,
        failed: 0,
        skipped: 0,
        pending: 0,
        expanded: true,
      })
      cy.get('[data-cy="total-passed"]').should('exist')
      cy.get('[data-cy="total-failed"]').should('exist')
      cy.get('[data-cy="total-skipped"]').should('exist')
      cy.get('[data-cy="total-pending"]').should('exist')
    })

    it('shows correct counts', () => {
      mountStory({ passed: 22, failed: 4, skipped: 0, pending: 1 })
      cy.get('[data-cy="total-passed"]').should('contain', '22')
      cy.get('[data-cy="total-failed"]').should('contain', '4')
      cy.get('[data-cy="total-pending"]').should('contain', '1')
    })
  })

  // ---------------------------------------------------------------------------
  // Leading stats (flaky + self-healed)
  // ---------------------------------------------------------------------------

  describe('leading stats', () => {
    it('renders flaky when count > 0', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 3 })
      cy.get('[data-cy="total-flaky"]').should('exist').and('contain', '3')
    })

    it('does not render flaky when count is 0', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 0 })
      cy.get('[data-cy="total-flaky"]').should('not.exist')
    })

    it('renders self-healed when showSelfHealed and count > 0', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        selfHealed: 2,
        showSelfHealed: true,
      })
      cy.get('[data-cy="total-self-healed"]')
        .should('exist')
        .and('contain', '2')
    })

    it('does not render self-healed when showSelfHealed is false', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        selfHealed: 2,
        showSelfHealed: false,
      })
      cy.get('[data-cy="total-self-healed"]').should('not.exist')
    })

    it('does not render self-healed when count is 0 even if showSelfHealed', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        selfHealed: 0,
        showSelfHealed: true,
      })
      cy.get('[data-cy="total-self-healed"]').should('not.exist')
    })
  })

  // ---------------------------------------------------------------------------
  // Separator logic
  // ---------------------------------------------------------------------------

  describe('separator', () => {
    it('shows separator after flaky when only flaky leads and regular stats follow', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 3 })
      cy.get('[data-cy="total-flaky"]').should(
        'have.class',
        "after:content-['']",
      )
    })

    it('shows separator after self-healed (not flaky) when both lead', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        flaky: 3,
        selfHealed: 2,
        showSelfHealed: true,
      })
      cy.get('[data-cy="total-self-healed"]').should(
        'have.class',
        "after:content-['']",
      )
      cy.get('[data-cy="total-flaky"]').should(
        'not.have.class',
        "after:content-['']",
      )
    })

    it('omits separator when no regular stats follow leading stats', () => {
      mountStory({ passed: 0, failed: 0, skipped: 0, pending: 0, flaky: 3 })
      cy.get('[data-cy="total-flaky"]').should(
        'not.have.class',
        "after:content-['']",
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Link rendering
  // ---------------------------------------------------------------------------

  describe('links', () => {
    it('renders an <a> when a link is provided', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        links: { passed: '#passed', failed: '#failed' },
      })
      cy.get('[data-cy="link-passed"]')
        .should('exist')
        .and('have.attr', 'href', '#passed')
      cy.get('[data-cy="link-failed"]')
        .should('exist')
        .and('have.attr', 'href', '#failed')
    })

    it('renders a <span> (no link) when no link is provided', () => {
      mountStory({ passed: 22, failed: 4, skipped: 0, pending: 1 })
      cy.get('[data-cy="link-passed"]').should('not.exist')
      cy.get('[data-cy="total-passed"] span').should('exist')
    })

    it('sets aria-label on linked stats', () => {
      mountStory({
        passed: 22,
        failed: 0,
        skipped: 0,
        pending: 0,
        links: { passed: '#passed' },
      })
      cy.get('[data-cy="link-passed"]').should(
        'have.attr',
        'aria-label',
        'View passed tests',
      )
    })

    it('links flaky stat', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        flaky: 3,
        links: { flaky: '#flaky' },
      })
      cy.get('[data-cy="link-flaky"]')
        .should('exist')
        .and('have.attr', 'href', '#flaky')
    })
  })

  // ---------------------------------------------------------------------------
  // showTooltip
  // ---------------------------------------------------------------------------

  describe('showTooltip', () => {
    it('hides tooltips when showTooltip is false', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        showTooltip: false,
      })
      cy.get('[role="tooltip"]').should('not.exist')
    })
  })

  // ---------------------------------------------------------------------------
  // Flaky tooltip text
  // ---------------------------------------------------------------------------

  describe('flaky tooltip text', () => {
    it('shows singular text when flaky count is 1', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 1 })
      cy.get('[data-cy="total-flaky"] a, [data-cy="total-flaky"] span')
        .first()
        .trigger('mouseover')
      cy.get('[role="tooltip"]').should(
        'contain',
        'This test both passed and failed when retried within a run',
      )
    })

    it('shows plural text when flaky count is > 1', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 3 })
      cy.get('[data-cy="total-flaky"] a, [data-cy="total-flaky"] span')
        .first()
        .trigger('mouseover')
      cy.get('[role="tooltip"]').should(
        'contain',
        '3 tests both passed and failed when retried within a run',
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Null prop handling
  // ---------------------------------------------------------------------------

  describe('null props', () => {
    it('treats flaky: null the same as flaky: 0 (no flaky stat rendered)', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: null })
      cy.get('[data-cy="total-flaky"]').should('not.exist')
    })

    it('treats selfHealed: null the same as selfHealed: 0', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        selfHealed: null,
        showSelfHealed: true,
      })
      cy.get('[data-cy="total-self-healed"]').should('not.exist')
    })
  })

  // ---------------------------------------------------------------------------
  // DOM validity — <ul> children must be <li> only
  // ---------------------------------------------------------------------------

  describe('DOM structure', () => {
    it('renders only <li> as direct children of <ul>', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        flaky: 3,
        selfHealed: 2,
        showSelfHealed: true,
      })
      cy.get('[data-cy="run-stats"] ul')
        .children()
        .each(($child) => {
          expect($child.prop('tagName')).to.eq('LI')
        })
    })
  })

  // ---------------------------------------------------------------------------
  // Percy snapshots
  // ---------------------------------------------------------------------------

  describe('visual snapshots', () => {
    it('default — non-zero stats', () => {
      mountStory({ passed: 22, failed: 4, skipped: 0, pending: 1 })
      cy.percySnapshot(`RunStatus default - ${fw}`)
    })

    it('expanded — zeros shown', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 0,
        expanded: true,
      })
      cy.percySnapshot(`RunStatus expanded - ${fw}`)
    })

    it('with flaky', () => {
      mountStory({ passed: 22, failed: 4, skipped: 0, pending: 1, flaky: 3 })
      cy.percySnapshot(`RunStatus with flaky - ${fw}`)
    })

    it('with self-healed', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        selfHealed: 2,
        showSelfHealed: true,
      })
      cy.percySnapshot(`RunStatus with self-healed - ${fw}`)
    })

    it('flaky and self-healed', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        flaky: 3,
        selfHealed: 2,
        showSelfHealed: true,
      })
      cy.percySnapshot(`RunStatus flaky and self-healed - ${fw}`)
    })

    it('linked stats', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        flaky: 3,
        links: {
          passed: '#passed',
          failed: '#failed',
          pending: '#pending',
          flaky: '#flaky',
        },
      })
      cy.percySnapshot(`RunStatus linked stats - ${fw}`)
    })

    it('dark theme', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        flaky: 3,
        theme: 'dark',
        links: {
          passed: '#passed',
          failed: '#failed',
          pending: '#pending',
          flaky: '#flaky',
        },
      })
      cy.percySnapshot(`RunStatus dark theme - ${fw}`)
    })
  })
}
