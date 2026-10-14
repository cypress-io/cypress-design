import { SpecResults } from '@cypress-design/react-spec-results'

// Every spec has finished, but the project's completion delay holds the run
// open. Don't pass `onCancel` here.
export default function ScheduledToComplete() {
  return (
    <SpecResults
      results={{ failed: 1, passed: 28, skipped: 1, cancelled: 1 }}
      scheduledToComplete="60s"
    />
  )
}
