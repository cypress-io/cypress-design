/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { SpecResults } from './SpecResults'
import type { SpecResultsProps } from './SpecResults'
import a11yAssertions from '../a11y-assertions'

function mountStory(props: SpecResultsProps) {
  mount(
    <div className="p-8">
      <SpecResults {...props} />
    </div>,
  )
}

describe('<SpecResults /> React — Accessibility', () => {
  a11yAssertions(mountStory, 'react')
})
