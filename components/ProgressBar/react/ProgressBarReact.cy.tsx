/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { ProgressBar, type ProgressBarProps } from './ProgressBar'
import assertions from '../assertions'

function mountStory(props: ProgressBarProps = {}) {
  mount(
    <div className="w-96 p-8">
      <ProgressBar aria-label="Progress" {...props} />
    </div>,
  )
}

describe('<ProgressBar /> React', () => {
  assertions(mountStory, 'react')
})
