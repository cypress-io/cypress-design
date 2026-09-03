import React from 'react'
import { SpecResults } from '@cypress-design/react-spec-results'
import type { SpecResultsProps } from '@cypress-design/react-spec-results'

// Same island-boundary constraint as SpecResultsCancelable.tsx: a function
// prop passed from the .astro frontmatter comes through as `null` once
// client:only serializes it, so onArchive has to be defined inside the
// hydrated component instead.
export default function SpecResultsArchivable(
  props: Omit<SpecResultsProps, 'onArchive'>,
) {
  return <SpecResults {...props} onArchive={() => {}} />
}
