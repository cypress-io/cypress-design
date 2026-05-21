/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import RunStatus from './RunStatus.vue'
import a11yAssertions from '../a11y-assertions'
import type { RunStatusProps } from '@cypress-design/constants-runstatus'

function mountStory(props: Partial<RunStatusProps> = {}) {
  mount(() => (
    <div class="p-8">
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
        links={props.links}
        showTooltip={false}
      />
    </div>
  ))
}

describe('<RunStatus /> Vue — Accessibility', () => {
  a11yAssertions(mountStory)
})
