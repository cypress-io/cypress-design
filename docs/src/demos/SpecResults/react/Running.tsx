import { SpecResults } from '@cypress-design/react-spec-results'

// `onCancel` renders the Cancel run button while specs are still to come.
export default function Running() {
  return (
    <SpecResults
      results={{ failed: 1, passed: 18, skipped: 1, running: 2, queued: 3 }}
      onCancel={() => {}}
    />
  )
}
