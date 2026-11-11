import Table from '@cypress-design/react-table'

// Values show in full by default and the table scrolls sideways when it runs
// out of room. `truncate` cuts them off with an ellipsis instead; hover a
// view to see the full URL.
const columns = [
  { key: 'view', label: 'Views', truncate: true },
  { key: 'snapshots', label: 'Snapshots', align: 'right' as const },
]

const rows = [
  { id: 'home', view: 'localhost:3000/', snapshots: 5692 },
  {
    id: 'integrations',
    view: 'localhost:3000/projects/*/settings/integrations',
    snapshots: 3078,
  },
  {
    id: 'results',
    view: 'localhost:3000/projects/f1bf33a/runs/*/test-results/*',
    snapshots: 1959,
  },
]

export default function Truncation() {
  return (
    <div className="max-w-md">
      <Table aria-label="Views" columns={columns} rows={rows} />
    </div>
  )
}
