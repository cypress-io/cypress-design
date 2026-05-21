/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { RunStatus } from './RunStatus'
import a11yAssertions from '../a11y-assertions'
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
        links={props.links}
        showTooltip={false}
      />
    </div>,
  )
}

describe('<RunStatus /> React — Accessibility', () => {
  a11yAssertions(mountStory)
})
