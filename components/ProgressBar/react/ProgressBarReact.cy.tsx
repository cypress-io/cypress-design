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
  assertions(mountStory)

  it('forwards a ref to the track', () => {
    const ref = React.createRef<HTMLDivElement>()
    mount(<ProgressBar ref={ref} value={50} aria-label="Progress" />)
    cy.get('[data-cy="progress-bar"]').then(($bar) => {
      expect(ref.current).to.equal($bar[0])
    })
  })
})

// One snapshot of every resting state, mirroring the Vue docs gallery
// (docs/src/demos/ProgressBar/AllStates.vue), instead of one per test. It
// lives here rather than as a docs AllStates.tsx so the docs page keeps a
// single gallery.
const sizes = ['6', '8', '12'] as const
const colors = [
  'indigo',
  'indigo-light',
  'purple',
  'teal',
  'jade',
  'red',
  'orange',
  'gray',
] as const
const segments = [
  { value: 233, label: 'Open mode' },
  { value: 179, label: 'Run mode', color: 'teal' as const },
]

describe('<ProgressBar /> React — all states', { viewportWidth: 1280 }, () => {
  it('renders every size, color, state, and theme', () => {
    mount(
      <div className="flex w-96 flex-col gap-4 p-8">
        {sizes.map((size) => (
          <ProgressBar key={size} size={size} value={36} aria-label={size} />
        ))}
        {colors.map((color) => (
          <ProgressBar
            key={color}
            color={color}
            value={60}
            aria-label={color}
          />
        ))}
        <ProgressBar value={36} active aria-label="Active" />
        <ProgressBar max={412} segments={segments} aria-label="Segments" />
        <div className="flex flex-col gap-4 rounded bg-gray-1000 p-4">
          {colors.map((color) => (
            <ProgressBar
              key={color}
              theme="dark"
              color={color}
              value={60}
              aria-label={`${color}, dark`}
            />
          ))}
          <ProgressBar
            theme="dark"
            max={412}
            segments={segments}
            aria-label="Segments, dark"
          />
        </div>
      </div>,
    )
    cy.get('[data-cy="progress-bar"]').should('have.length', 22)
    cy.percySnapshot('ProgressBar all states - react')
  })
})
