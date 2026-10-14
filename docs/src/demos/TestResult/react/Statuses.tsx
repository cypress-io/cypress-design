import TestResult from '@cypress-design/react-testresult'

const statuses = [
  'passed',
  'failed',
  'errored',
  'skipped',
  'pending',
  'cancelled',
  'unclaimed',
  'placeholder',
  'running',
] as const

export default function Statuses() {
  return (
    <div className="bg-white p-4">
      {statuses.map((status) => (
        <TestResult
          key={status}
          status={status}
          names={['TestResult', 'StatusIcon', `should render as ${status}`]}
        />
      ))}
    </div>
  )
}
