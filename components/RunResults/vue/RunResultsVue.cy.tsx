/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import RunResults from './RunResults.vue'
import assertions from '../assertions'
import type { RunResultsProps } from '@cypress-design/constants-runresults'

function mountStory(props: Partial<RunResultsProps> = {}) {
  mount(() => (
    <div class="p-8">
      <RunResults
        passed={props.passed ?? 0}
        failed={props.failed ?? 0}
        skipped={props.skipped ?? 0}
        pending={props.pending ?? 0}
        flaky={props.flaky}
        selfHealed={props.selfHealed}
        showSelfHealed={props.showSelfHealed}
        theme={props.theme}
        expanded={props.expanded}
        links={props.links}
        renderLink={props.renderLink}
        showTooltip={props.showTooltip}
      />
    </div>
  ))
}

describe('<RunResults /> Vue', () => {
  assertions(mountStory, 'vue')

  it('renders a custom link via renderLink', () => {
    mountStory({
      passed: 22,
      failed: 0,
      skipped: 0,
      pending: 0,
      links: { passed: '#passed' },
      renderLink: (href, children) => (
        <button data-href={href}>{children}</button>
      ),
    })
    cy.get('button[data-href="#passed"]').should('exist')
  })
})
