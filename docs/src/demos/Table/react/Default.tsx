import Table from '@cypress-design/react-table'

const columns = [
  { key: 'name', label: 'User' },
  { key: 'calls', label: 'Calls', align: 'right' as const },
  { key: 'lastActive', label: 'Last active' },
]

const rows = [
  { id: 'jordan', name: 'Jordan Lee', calls: 480, lastActive: '2h ago' },
  { id: 'maya', name: 'Maya Patel', calls: 431, lastActive: '3h ago' },
  { id: 'sam', name: 'Sam Rivera', calls: 316, lastActive: '1d ago' },
  { id: 'alex', name: 'Alex Kim', calls: 296, lastActive: '1d ago' },
  { id: 'priya', name: 'Priya Shah', calls: 188, lastActive: '2d ago' },
]

export default function Default() {
  return <Table aria-label="Usage" columns={columns} rows={rows} />
}
