/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import RunResults from './RunResults.vue'
import a11yAssertions from '../a11y-assertions'
import type { RunResultsProps } from '@cypress-design/constants-runresults'

function mountStory(props: Partial<RunResultsProps> = {}) {
  mount(() => (
    <div class="p-8">
      <RunResults
        runStatus={props.runStatus}
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
        showTooltip={false}
      />
    </div>
  ))
}

describe('<RunResults /> Vue — Accessibility', () => {
  a11yAssertions(mountStory, 'vue')
})
