import Table, { type TableColumn } from '@cypress-design/react-table'
import ProgressBar from '@cypress-design/react-progressbar'

type User = {
  id: string
  name: string
  initials: string
  calls: number
  lastActive: string
  lastActiveMinutes: number
}

// Each bar shows the user's share of every call in the org.
const TotalCalls = 3000

const users: User[] = [
  {
    id: 'ava',
    name: 'Ava Thompson',
    initials: 'AT',
    calls: 480,
    lastActive: '2h ago',
    lastActiveMinutes: 120,
  },
  {
    id: 'noah',
    name: 'Noah Patel',
    initials: 'NP',
    calls: 431,
    lastActive: '3h ago',
    lastActiveMinutes: 180,
  },
  {
    id: 'mia',
    name: 'Mia Fernandez',
    initials: 'MF',
    calls: 316,
    lastActive: '1d ago',
    lastActiveMinutes: 1440,
  },
  {
    id: 'liam',
    name: 'Liam Okafor',
    initials: 'LO',
    calls: 296,
    lastActive: '1d ago',
    lastActiveMinutes: 1500,
  },
  {
    id: 'zoe',
    name: 'Zoe Laurent',
    initials: 'ZL',
    calls: 237,
    lastActive: '1d ago',
    lastActiveMinutes: 1560,
  },
  {
    id: 'ethan',
    name: 'Ethan Kowalski',
    initials: 'EK',
    calls: 214,
    lastActive: '1d ago',
    lastActiveMinutes: 1620,
  },
  {
    id: 'iris',
    name: 'Iris Nakamura',
    initials: 'IN',
    calls: 188,
    lastActive: '2d ago',
    lastActiveMinutes: 2880,
  },
  {
    id: 'omar',
    name: 'Omar Haddad',
    initials: 'OH',
    calls: 152,
    lastActive: '3d ago',
    lastActiveMinutes: 4320,
  },
]

// `render` puts any content in a cell. `primary` gives the bar column the
// leftover width; the number beside the bar carries the value in text.
const columns: TableColumn<User>[] = [
  {
    key: 'name',
    label: 'User',
    render: (user) => (
      <span className="flex items-center gap-3 whitespace-nowrap">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-sm font-medium text-gray-900"
        >
          {user.initials}
        </span>
        {user.name}
      </span>
    ),
  },
  {
    key: 'calls',
    label: 'Calls',
    primary: true,
    sortable: true,
    firstSortDirection: 'descending',
    render: (user) => (
      <span className="flex items-center gap-6">
        <ProgressBar
          className="flex-1"
          value={user.calls}
          max={TotalCalls}
          aria-label={`${user.name} calls`}
          valueText={`${user.calls} of ${TotalCalls} calls`}
        />
        <span className="w-10 text-right tabular-nums">{user.calls}</span>
      </span>
    ),
  },
  {
    key: 'lastActive',
    label: 'Last active',
    sortValue: (user) => user.lastActiveMinutes,
    render: (user) => (
      <span className="whitespace-nowrap text-gray-700">{user.lastActive}</span>
    ),
  },
]

export default function ProgressBarCell() {
  return (
    <div className="overflow-hidden rounded border border-gray-100 bg-white">
      <Table
        aria-label="Calls by user"
        columns={columns}
        rows={users}
        defaultSort={{ key: 'calls', direction: 'descending' }}
      />
      <a
        href="#react-all-users"
        className="block border-t border-gray-100 px-4 py-3 text-indigo-500 hover:underline"
      >
        View all 14 users
      </a>
    </div>
  )
}
