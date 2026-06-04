/// <reference types="cypress" />

import type { RunResultsProps } from '@cypress-design/constants-runresults'

type MountFn = (props?: Partial<RunResultsProps>) => void

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
      cy.get('[data-cy="run-results"]').should('exist')
      cy.get('[data-cy="total-passed"]').should('exist')
      cy.get('[data-cy="total-failed"]').should('exist')
      cy.get('[data-cy="total-pending"]').should('exist')
      cy.get('[data-cy="total-skipped"]').should('not.exist')
      cy.percySnapshot(`RunResults default - ${fw}`)
    })

    it('returns nothing when all stats are zero', () => {
      mountStory({ passed: 0, failed: 0, skipped: 0, pending: 0 })
      cy.get('[data-cy="run-results"]').should('not.exist')
    })

    it('still renders the pill when all regular stats are zero but showSelfHealed is true', () => {
      // Guards hasAnyStat's `!!props.showSelfHealed` short-circuit: a
      // regression that ANDed the count against the flag (or dropped the
      // self-healed branch entirely) would return null here and CI would
      // stay green without this scenario.
      mountStory({
        passed: 0,
        failed: 0,
        skipped: 0,
        pending: 0,
        selfHealed: 2,
        showSelfHealed: true,
      })
      cy.get('[data-cy="run-results"]').should('exist')
      cy.get('[data-cy="total-self-healed"]')
        .should('exist')
        .and('contain', '2')
      // No regular stats render
      cy.get('[data-cy="total-passed"]').should('not.exist')
      cy.get('[data-cy="total-failed"]').should('not.exist')
      cy.get('[data-cy="total-skipped"]').should('not.exist')
      cy.get('[data-cy="total-pending"]').should('not.exist')
    })

    it('shows all regular stats when expanded (including zero counts)', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 0,
        expanded: true,
      })
      cy.get('[data-cy="total-passed"]').should('exist')
      cy.get('[data-cy="total-failed"]').should('exist')
      cy.get('[data-cy="total-skipped"]').should('exist').and('contain', '0')
      cy.get('[data-cy="total-pending"]').should('exist').and('contain', '0')
      // `expanded` is a regular-stats-only knob — flaky still requires
      // count > 0. Guard against a regression that treats flaky like a
      // regular stat and renders a zero-count row.
      cy.get('[data-cy="total-flaky"]').should('not.exist')
      cy.percySnapshot(`RunResults expanded - ${fw}`)
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
      mountStory({ passed: 22, failed: 4, skipped: 0, pending: 1, flaky: 3 })
      cy.get('[data-cy="total-flaky"]').should('exist').and('contain', '3')
      cy.percySnapshot(`RunResults with flaky - ${fw}`)
    })

    it('does not render flaky when count is 0', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 0 })
      cy.get('[data-cy="total-flaky"]').should('not.exist')
    })

    it('renders self-healed with its count when showSelfHealed is true', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        selfHealed: 2,
        showSelfHealed: true,
      })
      cy.get('[data-cy="total-self-healed"]')
        .should('exist')
        .and('contain', '2')
      cy.percySnapshot(`RunResults with self-healed - ${fw}`)
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

    it('renders self-healed with count 0 when showSelfHealed is true', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        selfHealed: 0,
        showSelfHealed: true,
      })
      cy.get('[data-cy="total-self-healed"]')
        .should('exist')
        .and('contain', '0')
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
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
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
      cy.percySnapshot(`RunResults flaky and self-healed - ${fw}`)
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
        flaky: 3,
        links: {
          passed: '#passed',
          failed: '#failed',
          pending: '#pending',
          flaky: '#flaky',
        },
      })
      cy.get('[data-cy="link-passed"]')
        .should('exist')
        .and('have.attr', 'href', '#passed')
      cy.get('[data-cy="link-failed"]')
        .should('exist')
        .and('have.attr', 'href', '#failed')
      cy.get('[data-cy="link-pending"]')
        .should('exist')
        .and('have.attr', 'href', '#pending')
      cy.get('[data-cy="link-flaky"]')
        .should('exist')
        .and('have.attr', 'href', '#flaky')
      cy.percySnapshot(`RunResults linked stats - ${fw}`)
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
      // Hover a stat to verify the opt-out works under interaction. Without
      // this, the assertion passes vacuously in React, whose Tooltip only
      // renders its [role="tooltip"] portal when its internal `open` state
      // flips to true (i.e. on hover/focus). With showTooltip: false the
      // component skips wrapping stats in <Tooltip> entirely, so hover
      // produces no popper.
      cy.get('[data-cy="total-passed"]').realHover()
      cy.get('[role="tooltip"]').should('not.exist')
    })
  })

  // ---------------------------------------------------------------------------
  // Flaky tooltip text
  // ---------------------------------------------------------------------------

  describe('flaky tooltip text', () => {
    // Vue mounts a [role="tooltip"] per stat (teleport v-if="!disabled"),
    // so the page can have multiple tooltips in the DOM at once.
    // `cy.contains('[role="tooltip"]', text)` scopes the assertion to the
    // single tooltip whose text matches — without this scoping, a swap
    // regression (passed tooltip showing flaky text, flaky tooltip showing
    // passed text) could still pass because the combined text would match.
    //
    // We assert `be.visible` (not just `exist`) so the test actually fails
    // if hover never opened the tooltip. The Vue role="tooltip" element is
    // present in the DOM even when hidden — `exist` alone would pass
    // vacuously, masking a regression where realHover doesn't fire the
    // open handler. React only portals on open, but be.visible gives both
    // frameworks the same rigor.

    it('shows singular text when flaky count is 1', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 1 })
      // Use realHover so Floating UI (React) and Vue's @mouseover both fire correctly.
      cy.get('[data-cy="total-flaky"] a, [data-cy="total-flaky"] span')
        .first()
        .realHover()
      cy.contains(
        '[role="tooltip"]',
        'This test both passed and failed when retried within a run',
      ).should('be.visible')
    })

    it('shows plural text when flaky count is > 1', () => {
      mountStory({ passed: 10, failed: 0, skipped: 0, pending: 0, flaky: 3 })
      cy.get('[data-cy="total-flaky"] a, [data-cy="total-flaky"] span')
        .first()
        .realHover()
      cy.contains(
        '[role="tooltip"]',
        '3 tests both passed and failed when retried within a run',
      ).should('be.visible')
      // Visual baseline for the opened tooltip — locks in the popper's
      // text size, color, padding, arrow placement, and background, so a
      // shared-Tooltip change or token shift that breaks the override
      // (see CssTooltipPopperDark/Light in constants) surfaces as a diff.
      cy.percySnapshot(`RunResults with flaky tooltip open - ${fw}`)
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

    it('treats selfHealed: null the same as selfHealed: 0 (renders "0" when showSelfHealed)', () => {
      mountStory({
        passed: 10,
        failed: 0,
        skipped: 0,
        pending: 0,
        selfHealed: null,
        showSelfHealed: true,
      })
      cy.get('[data-cy="total-self-healed"]')
        .should('exist')
        .and('contain', '0')
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
      cy.get('[data-cy="run-results"] ul')
        .children()
        .each(($child) => {
          expect($child.prop('tagName')).to.eq('LI')
        })
    })
  })

  // ---------------------------------------------------------------------------
  // Dark theme
  //
  // All other Percy snapshots are taken inline within the functional tests
  // above to avoid duplicating mount work — see e.g. 'renders only non-zero
  // regular stats', 'renders flaky when count > 0', etc. Dark theme has no
  // such pre-existing functional counterpart, so it lives here.
  // ---------------------------------------------------------------------------

  describe('dark theme', () => {
    it('applies the dark theme classes to the pill', () => {
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
      cy.get('[data-cy="run-results"] ul')
        .should('have.class', 'bg-gray-1000')
        .and('have.class', 'text-gray-400')
        .and('have.class', 'border-gray-800')
      cy.percySnapshot(`RunResults dark theme - ${fw}`)
    })
  })
}
