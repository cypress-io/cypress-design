import React from 'react'
import { SpecResults } from '@cypress-design/react-spec-results'
import type { SpecResultsProps } from '@cypress-design/react-spec-results'

// Astro's `client:only` islands serialize props to JSON before hydrating --
// a function prop passed from the .astro frontmatter comes through as
// `null`, so the Cancel button silently disappears. Defining the callback
// *inside* the hydrated component (not passed in from outside the island
// boundary) sidesteps that; this wrapper exists only for docs demos.
export default function SpecResultsCancelable(
  props: Omit<SpecResultsProps, 'onCancel'>,
) {
  return <SpecResults {...props} onCancel={() => {}} />
}
