import StatusIcon, { type StatusType } from '@cypress-design/react-statusicon'

const statuses: StatusType[] = [
  'running',
  'failing',
  'passed',
  'failed',
  'unclaimed',
  'placeholder',
  'cancelled',
  'noTests',
  'errored',
  'timedOut',
  'overLimit',
  'skipped',
]

export default function Statuses() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {statuses.map((status) => (
        <div key={status} className="flex items-center gap-2">
          <StatusIcon status={status} variant="outline" size="16" />
          {status}
        </div>
      ))}
    </div>
  )
}
