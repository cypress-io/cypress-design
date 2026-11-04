/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { ProgressBar, type ProgressBarProps } from './ProgressBar'
import a11yAssertions from '../a11y-assertions'

function mountStory(props: ProgressBarProps = {}) {
  mount(
    <div className="w-96 p-8">
      <ProgressBar {...props} />
    </div>,
  )
}

describe('<ProgressBar /> React — Accessibility', () => {
  a11yAssertions(mountStory)
})
