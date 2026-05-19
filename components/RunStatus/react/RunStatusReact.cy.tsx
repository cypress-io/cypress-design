/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { RunStatus } from './RunStatus'
import assertions from '../assertions'
import type { RunStatusProps } from '@cypress-design/constants-runstatus'

function mountStory(props: Partial<RunStatusProps> = {}) {
  mount(
    <div className="p-8">
      <RunStatus
        passed={props.passed ?? 0}
        failed={props.failed ?? 0}
        skipped={props.skipped ?? 0}
        pending={props.pending ?? 0}
        flaky={props.flaky}
        selfHealed={props.selfHealed}
        showSelfHealed={props.showSelfHealed}
        theme={props.theme}
        expanded={props.expanded}
        fullWidth={props.fullWidth}
        links={props.links}
        renderLink={props.renderLink}
        showTooltip={props.showTooltip}
      />
    </div>,
  )
}

describe('<RunStatus /> React', () => {
  assertions(mountStory)

  it('renders a custom link via renderLink', () => {
    mountStory({
      passed: 22,
      failed: 0,
      skipped: 0,
      pending: 0,
      links: { passed: '#passed' },
      renderLink: (href, children) => (
        <button data-href={href}>{children as React.ReactNode}</button>
      ),
    })
    cy.get('button[data-href="#passed"]').should('exist')
  })

  it('stretches to full width when fullWidth is true', () => {
    mountStory({
      passed: 22,
      failed: 4,
      skipped: 0,
      pending: 1,
      fullWidth: true,
    })
    cy.get('[data-cy="run-stats"]').should('have.class', 'w-full')
    cy.get('[data-cy="run-stats"] ul').should('have.class', 'w-full')
  })
})
