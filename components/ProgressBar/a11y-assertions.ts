/// <reference types="cypress" />

import type { ProgressBarProps } from '@cypress-design/constants-progressbar'

type MountFn = (
  props?: ProgressBarProps & {
    'aria-label'?: string
    'aria-labelledby'?: string
    'aria-valuetext'?: string
  },
) => void

const bar = '[data-cy="progress-bar"]'

export default function a11yAssertions(mountStory: MountFn): void {
  it('exposes the value as a progressbar', () => {
    mountStory({ value: 3600, max: 10000, 'aria-label': 'Included tests' })
    cy.get(bar)
      .should('have.attr', 'role', 'progressbar')
      .and('have.attr', 'aria-valuemin', '0')
      .and('have.attr', 'aria-valuemax', '10000')
      .and('have.attr', 'aria-valuenow', '3600')
      .and('have.attr', 'aria-label', 'Included tests')
      .and('not.have.attr', 'aria-valuetext')
  })

  describe('with a labelling heading', () => {
    // The heading lives outside the mount root, which Cypress clears between
    // tests but `document.body` keeps, so remove it once the test is done.
    afterEach(() => {
      cy.document().then((doc) => doc.getElementById('usage-heading')?.remove())
    })

    it('forwards aria-labelledby', () => {
      cy.document().then((doc) => {
        const heading = doc.createElement('h2')
        heading.id = 'usage-heading'
        heading.textContent = 'Included tests'
        doc.body.insertBefore(heading, doc.body.firstChild)
      })
      mountStory({ value: 50, 'aria-labelledby': 'usage-heading' })
      cy.get(bar).should('have.attr', 'aria-labelledby', 'usage-heading')
      cy.get('#usage-heading').should('have.text', 'Included tests')
    })
  })

  it('reports the clamped total as aria-valuenow', () => {
    mountStory({ value: 140, 'aria-label': 'Upload' })
    cy.get(bar).should('have.attr', 'aria-valuenow', '100')
  })

  it('reads labelled segments out as aria-valuetext', () => {
    mountStory({
      max: 412,
      'aria-label': 'Test runs by mode',
      segments: [
        { value: 233, label: 'Open mode' },
        { value: 179, label: 'Run mode', color: 'teal' },
      ],
    })
    cy.get(bar)
      .should('have.attr', 'aria-valuenow', '412')
      .and('have.attr', 'aria-valuetext', 'Open mode 233, Run mode 179')
  })

  it('announces the clamped amounts the bar draws', () => {
    mountStory({
      'aria-label': 'Usage',
      segments: [
        { value: 80, label: 'Included' },
        { value: 60, label: 'On-demand' },
      ],
    })
    cy.get(bar)
      .should('have.attr', 'aria-valuenow', '100')
      .and('have.attr', 'aria-valuetext', 'Included 80, On-demand 20')
  })

  it('formats announced amounts for the locale', () => {
    mountStory({
      max: 10000,
      'aria-label': 'Usage',
      segments: [
        { value: 3600, label: 'Included' },
        { value: 1200, label: 'On-demand' },
      ],
    })
    // Built from the browser's own locale, so the test holds outside en-US.
    cy.get(bar).should(
      'have.attr',
      'aria-valuetext',
      `Included ${(3600).toLocaleString()}, On-demand ${(1200).toLocaleString()}`,
    )
  })

  it('leaves aria-valuetext off when a segment has no label', () => {
    mountStory({
      max: 412,
      'aria-label': 'Test runs by mode',
      segments: [{ value: 233, label: 'Open mode' }, { value: 179 }],
    })
    cy.get(bar).should('not.have.attr', 'aria-valuetext')
  })

  it('keeps an aria-valuetext passed as an attribute', () => {
    mountStory({
      value: 64,
      'aria-label': 'Included tests',
      'aria-valuetext': '64% left',
    })
    cy.get(bar).should('have.attr', 'aria-valuetext', '64% left')
  })

  it('lets valueText override the announcement', () => {
    mountStory({
      value: 64,
      'aria-label': 'Included tests',
      valueText: '64% left',
    })
    cy.get(bar).should('have.attr', 'aria-valuetext', '64% left')
  })

  it('stops the shimmer for reduced motion', () => {
    mountStory({ value: 40, active: true, 'aria-label': 'Uploading' })
    cy.get('style#cy-progress-bar-active-style')
      .invoke('text')
      .should('contain', 'prefers-reduced-motion: reduce')
  })
}
