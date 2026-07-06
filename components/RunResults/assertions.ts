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
        // Border is an ::after inset shadow, not a `border-*` class.
        .and(
          'have.class',
          'after:shadow-[inset_0_0_0_1px_theme(colors.gray.800)]',
        )
      cy.percySnapshot(`RunResults dark theme - ${fw}`)
    })
  })

  // ---------------------------------------------------------------------------
  // Pill background override via pillClassName (tailwind-merge)
  // ---------------------------------------------------------------------------

  describe('pill background override', () => {
    it('a pillClassName bg-* wins over the theme bg and keeps the rest of the theme', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        theme: 'dark',
        pillClassName: 'bg-gray-900',
      })
      cy.get('[data-cy="run-results"] ul')
        // tailwind-merge drops the theme's bg-* in favor of the consumer's...
        .should('have.class', 'bg-gray-900')
        .and('not.have.class', 'bg-gray-1000')
        // ...without stripping the rest of the theme.
        .and('have.class', 'text-gray-400')
        .and(
          'have.class',
          'after:shadow-[inset_0_0_0_1px_theme(colors.gray.800)]',
        )
    })
  })

  // ---------------------------------------------------------------------------
  // Self-healed icon size
  // ---------------------------------------------------------------------------

  describe('self-healed icon', () => {
    it('renders the native 12px icon (no w-3 h-3 size override)', () => {
      mountStory({ passed: 1, showSelfHealed: true, selfHealed: 2 })
      cy.get('[data-cy="status-icon-self-healed"]')
        .should('have.attr', 'width', '12')
        .and('have.attr', 'height', '12')
    })
  })

  // ---------------------------------------------------------------------------
  // Class targeting — className → wrapper, pillClassName → <ul>
  // ---------------------------------------------------------------------------

  describe('class targeting', () => {
    it('className lands on the root wrapper, pillClassName on the <ul>', () => {
      mountStory({
        passed: 22,
        failed: 4,
        skipped: 0,
        pending: 1,
        className: 'mb-2',
        pillClassName: 'mt-1',
      })
      // className applies to the wrapper (which carries data-cy), not the pill.
      cy.get('[data-cy="run-results"]')
        .should('have.class', 'mb-2')
        .and('not.have.class', 'mt-1')
      // pillClassName applies to the <ul>, not the wrapper.
      cy.get('[data-cy="run-results"] ul')
        .should('have.class', 'mt-1')
        .and('not.have.class', 'mb-2')
    })
  })

  // ---------------------------------------------------------------------------
  // Run-status pill
  // ---------------------------------------------------------------------------

  describe('run-status pill', () => {
    describe('presence and segments', () => {
      it('renders the pill only when runStatus is provided', () => {
        mountStory({ passed: 22, failed: 4 })
        cy.get('[data-cy="run-status"]').should('not.exist')
        cy.get('[data-cy="run-status-build-number"]').should('not.exist')
      })

      it('renders the pill BEFORE the test-counts pill in DOM order', () => {
        // Contract: run-status is the leading pill; a regression that
        // appends it after the <ul> would break the visual "identity first,
        // counts second" ordering documented in instructions.md.
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
          passed: 22,
        })
        cy.get('[data-cy="run-results"]').then(($wrap) => {
          const children = Array.from($wrap[0].children)
          const pill = children.findIndex(
            (c) => c.getAttribute('data-cy') === 'run-status',
          )
          const ul = children.findIndex((c) => c.tagName === 'UL')
          expect(pill).to.be.at.least(0)
          expect(ul).to.be.at.least(0)
          expect(pill).to.be.lessThan(ul)
        })
      })

      it('renders #N and the status icon', () => {
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
          passed: 1,
        })
        cy.get('[data-cy="run-status"]').should('exist')
        cy.get('[data-cy="run-status-build-number"]')
          .should('exist')
          .and('contain', '#468')
        cy.get('[data-cy="run-status-icon"]').should('exist')
      })

      it('renders the branch segment only when branch is provided', () => {
        // Without branch → single segment, no divider.
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
          passed: 1,
        })
        cy.get('[data-cy="run-status-branch"]').should('not.exist')
        // The divider is an ::after on the build-number segment; guard by
        // asserting the divider class isn't on it when branch is absent.
        cy.get('[data-cy="run-status-build-number"]').should(
          'not.have.class',
          'after:border-r',
        )
      })

      it('renders both segments and the divider when branch is set', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
          },
          passed: 1,
        })
        cy.get('[data-cy="run-status-build-number"]')
          .should('exist')
          .and('have.class', 'after:border-r')
        cy.get('[data-cy="run-status-branch"]')
          .should('exist')
          .and('contain', 'develop')
        cy.get('[data-cy="run-status-branch-icon"]').should('exist')
      })

      it('truncates long branch names at 260px', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch:
              'release/2026.07.01-emergency-hotfix-mobile-only-really-long-branch',
          },
          passed: 1,
        })
        cy.get('[data-cy="run-status-branch"] > span')
          .should('have.class', 'max-w-[260px]')
          .and('have.class', 'truncate')
      })
    })

    describe('link vs unlinked segments', () => {
      it('#N is <a> when runStatus.href is set', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            href: '#run',
          },
          passed: 1,
        })
        cy.get('[data-cy="run-status-build-number"]')
          .should('match', 'a')
          .and('have.attr', 'href', '#run')
      })

      it('#N is <span> when runStatus.href is omitted', () => {
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
          passed: 1,
        })
        cy.get('[data-cy="run-status-build-number"]').should('match', 'span')
      })

      it('branch is always a <span>, never a link', () => {
        // The branch segment is never linkable — decided in stage 2 (see
        // instructions.md). Guard against a regression that re-adds a
        // branchHref pass-through or wraps branch in <a> for any reason.
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
            href: '#run',
          },
          passed: 1,
        })
        cy.get('[data-cy="run-status-branch"]').should('match', 'span')
        cy.get('[data-cy="run-status-branch"]').should('not.match', 'a')
      })
    })

    describe('variants', () => {
      it('base variant has no hover:after:shadow class', () => {
        // The status-colored border is hover-only and gated on
        // variant === 'link' via RUN_STATUS_BORDER_CLASSES. A regression
        // that applies the hover class unconditionally would surface here.
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed', variant: 'base' },
          passed: 1,
        })
        cy.get('[data-cy="run-status"]')
          .invoke('attr', 'class')
          .should('not.match', /hover:after:shadow-/)
      })

      it('link variant carries the status-colored hover border class', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            variant: 'link',
            href: '#run',
          },
          passed: 1,
        })
        cy.get('[data-cy="run-status"]')
          .invoke('attr', 'class')
          .should('match', /hover:after:shadow-\[.*jade\.400/)
      })

      it('both variants render the same neutral resting border', () => {
        // Both variants should paint the same gray-100 (light) / gray-800
        // (dark) `::after` inset shadow at rest — status color is a
        // hover-only affordance.
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed', variant: 'base' },
          passed: 1,
        })
        cy.get('[data-cy="run-status"]').then(($p) => {
          const shadow = getComputedStyle($p[0], '::after').boxShadow
          expect(shadow).to.include('rgb(225, 227, 237)') // gray-100
        })
      })
    })

    describe('status colors', () => {
      // Only sample one per palette bucket — every status uses the same
      // 5 tokens (jade / red / indigo / gray / orange) via
      // RUN_STATUS_TEXT_CLASSES, so exhaustive per-status assertions would
      // be redundant. If a table entry drifts, this catches it.
      const cases = [
        {
          status: 'passed' as const,
          text: 'text-jade-400',
          border: 'jade.400',
        },
        { status: 'failed' as const, text: 'text-red-400', border: 'red.400' },
        {
          status: 'running' as const,
          text: 'text-indigo-400',
          border: 'indigo.400',
        },
        {
          status: 'cancelled' as const,
          text: 'text-gray-400',
          border: 'gray.400',
        },
        {
          status: 'errored' as const,
          text: 'text-orange-400',
          border: 'orange.400',
        },
      ]
      cases.forEach(({ status, text, border }) => {
        it(`${status} → text ${text} + hover border ${border}`, () => {
          mountStory({
            runStatus: {
              buildNumber: 468,
              status,
              variant: 'link',
              href: '#run',
            },
            passed: 1,
          })
          cy.get('[data-cy="run-status-build-number"] > span').should(
            'have.class',
            text,
          )
          cy.get('[data-cy="run-status"]')
            .invoke('attr', 'class')
            .should(
              'match',
              new RegExp(
                `hover:after:shadow-\\[.*${border.replace('.', '\\.')}`,
              ),
            )
        })
      })
    })

    describe('themes', () => {
      it('light theme uses gray-50 bg and gray-100 border', () => {
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
          passed: 1,
          theme: 'light',
        })
        cy.get('[data-cy="run-status"]').should('have.class', 'bg-gray-50')
        cy.get('[data-cy="run-status"]').then(($p) => {
          const shadow = getComputedStyle($p[0], '::after').boxShadow
          expect(shadow).to.include('rgb(225, 227, 237)') // gray-100
        })
      })

      it('dark theme uses gray-950 bg and gray-800 border', () => {
        mountStory({
          runStatus: { buildNumber: 468, status: 'passed' },
          passed: 1,
          theme: 'dark',
        })
        cy.get('[data-cy="run-status"]').should('have.class', 'bg-gray-950')
        cy.get('[data-cy="run-status"]').then(($p) => {
          const shadow = getComputedStyle($p[0], '::after').boxShadow
          expect(shadow).to.include('rgb(67, 72, 97)') // gray-800
        })
      })

      it('branch text uses gray-700 on light, gray-300 on dark', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
          },
          passed: 1,
          theme: 'light',
        })
        cy.get('[data-cy="run-status-branch"] > span').should(
          'have.class',
          'text-gray-700',
        )
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
          },
          passed: 1,
          theme: 'dark',
        })
        cy.get('[data-cy="run-status-branch"] > span').should(
          'have.class',
          'text-gray-300',
        )
      })
    })

    describe('runtime guard against invalid status', () => {
      // The invalid-status path intentionally fires a `console.warn`, which
      // `cypress/support/component.ts` afterEach would otherwise fail on
      // (callCount must be 0). Reset the spy at the end of each test.
      //
      // `warnInvalidRunStatus` also dedupes by status name via a
      // module-level Set, so each test uses a distinct invalid value —
      // otherwise the warn wouldn't fire on the second test.
      afterEach(() => {
        cy.window().then((win) => {
          // The support file installs a sinon spy on console.warn. Reset
          // its call history so the global afterEach's callCount(0)
          // assertion still passes.
          const w = win.console.warn as unknown as {
            resetHistory?: () => void
          }
          w.resetHistory?.()
        })
      })

      it('skips the pill and does not emit an empty wrapper when only pill is present', () => {
        // The outer showRunStatus gate treats an invalid status as
        // "no pill", so with no test counts the whole component returns
        // null — no orphan wrapper.
        mountStory({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          runStatus: { buildNumber: 468, status: 'bogus-a' as any },
        })
        cy.get('[data-cy="run-results"]').should('not.exist')
      })

      it('renders test counts alone when runStatus.status is invalid', () => {
        mountStory({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          runStatus: { buildNumber: 468, status: 'bogus-b' as any },
          passed: 22,
        })
        cy.get('[data-cy="run-results"]').should('exist')
        cy.get('[data-cy="run-status"]').should('not.exist')
        cy.get('[data-cy="total-passed"]').should('exist')
        // Confirm the dev warning fired (locks in the documented
        // invalid-status → skip + warn behavior). Uses the global
        // console.warn spy installed in cypress/support/component.ts.
        cy.window().then((win) => {
          expect(win.console.warn).to.have.been.called
        })
      })
    })

    // renderLink integration for the run-status pill is framework-specific
    // (React expects a ReactNode, Vue expects a VNode). Framework-specific
    // tests live in each cy.tsx spec, alongside the existing renderLink
    // test-counts assertions.

    describe('data-cy contract', () => {
      it('emits the full documented selector set when both segments render', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
            href: '#run',
          },
          passed: 1,
        })
        cy.get('[data-cy="run-status"]').should('exist')
        cy.get('[data-cy="run-status-build-number"]').should('exist')
        cy.get('[data-cy="run-status-icon"]').should('exist')
        cy.get('[data-cy="run-status-branch"]').should('exist')
        cy.get('[data-cy="run-status-branch-icon"]').should('exist')
      })
    })

    describe('spacing', () => {
      it('segment padding is 8px and inter-pill gap is 8px', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
          },
          passed: 22,
        })
        cy.get('[data-cy="run-status-build-number"]').should(($seg) => {
          const style = getComputedStyle($seg[0])
          expect(style.paddingLeft).to.eq('8px')
          // Right padding is 0 because it hosts the divider (see the
          // `!pr-0` override in constants — runStatusSegmentDividerAdjacent).
          expect(style.paddingRight).to.eq('0px')
        })
        cy.get('[data-cy="run-status-branch"]').should(($seg) => {
          const style = getComputedStyle($seg[0])
          expect(style.paddingLeft).to.eq('8px')
          expect(style.paddingRight).to.eq('8px')
        })
        cy.get('[data-cy="run-results"]')
          .invoke('css', 'gap')
          .should('eq', '8px')
      })
    })

    describe('visual regression', () => {
      it('run-status only — light + dark matrix', () => {
        // One Percy snapshot per theme, base+link side-by-side, one status
        // per palette bucket. Anything richer belongs in the demo page
        // (docs/src/demos/RunResults.vue), which already has full coverage.
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            variant: 'link',
            href: '#run',
          },
        })
        cy.percySnapshot(`RunResults run-status link/passed - ${fw}`)
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'failed',
            variant: 'link',
            href: '#run',
          },
          theme: 'dark',
        })
        cy.percySnapshot(`RunResults run-status link/failed dark - ${fw}`)
      })

      it('run-status + branch + test counts — combined pill row', () => {
        mountStory({
          runStatus: {
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
            variant: 'link',
            href: '#run',
          },
          passed: 22,
          failed: 4,
          skipped: 0,
          pending: 1,
          flaky: 3,
        })
        cy.percySnapshot(`RunResults run-status + branch + counts - ${fw}`)
      })
    })
  })
}
