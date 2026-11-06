import { useMemo, useState } from 'react'
import Table, { type TableSort, sortRows } from '@cypress-design/react-table'

type User = { id: string; name: string; calls: number }

const columns = [
  { key: 'name', label: 'User', sortable: true },
  {
    key: 'calls',
    label: 'Calls',
    align: 'right' as const,
    sortable: true,
    firstSortDirection: 'descending' as const,
  },
]

const users: User[] = [
  { id: 'sam', name: 'Sam Rivera', calls: 316 },
  { id: 'jordan', name: 'Jordan Lee', calls: 480 },
  { id: 'priya', name: 'Priya Shah', calls: 188 },
  { id: 'maya', name: 'Maya Patel', calls: 431 },
]

// With `manualSort` the table only shows the sort state. The page orders
// `rows` itself, for example from a server query or the URL. `sortRows` sorts
// exactly like the built-in sort; a server-sorted page doesn't need it.
export default function ManualSort() {
  const [sort, setSort] = useState<TableSort>({
    key: 'calls',
    direction: 'descending',
  })
  const rows = useMemo(() => sortRows(users, columns, sort), [sort])

  return (
    <Table
      aria-label="Usage"
      manualSort
      sort={sort}
      onSortChange={setSort}
      columns={columns}
      rows={rows}
    />
  )
}
