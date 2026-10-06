import { SpecResults } from '@cypress-design/react-spec-results'

// Nothing running or queued: the remaining pill and Cancel run drop away,
// and `onArchive` renders the Archive run button.
export default function Completed() {
  return (
    <SpecResults
      results={{ failed: 1, passed: 28, skipped: 1, cancelled: 1 }}
      onArchive={() => {}}
    />
  )
}
