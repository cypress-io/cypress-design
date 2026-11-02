import Table from '@cypress-design/react-table'
import { IconDocumentBlank } from '@cypress-design/react-icon'

// `icon` renders before the header label; `cellIcon` before each cell.
const columns = [
  {
    key: 'view',
    label: 'Views',
    icon: IconDocumentBlank,
    cellIcon: () => IconDocumentBlank,
    sortable: true,
  },
  {
    key: 'snapshots',
    label: 'Snapshots',
    align: 'right' as const,
    sortable: true,
    firstSortDirection: 'descending' as const,
  },
]

const rows = [
  {
    id: 'home',
    view: 'localhost:3000/',
    snapshots: 5692,
    tested: 38,
    total: 53,
    coverage: 72,
  },
  {
    id: 'branches',
    view: 'localhost:3000/projects/*/branches/*',
    snapshots: 4394,
    tested: 73,
    total: 98,
    coverage: 74,
  },
  {
    id: 'integrations',
    view: 'localhost:3000/projects/*/settings/integrations',
    snapshots: 3078,
    tested: 67,
    total: 88,
    coverage: 76,
  },
  {
    id: 'overview',
    view: 'localhost:3000/projects/*/runs/*/overview',
    snapshots: 3045,
    tested: 54,
    total: 59,
    coverage: 92,
  },
  {
    id: 'billing',
    view: 'localhost:3000/organizations/*/billing',
    snapshots: 2547,
    tested: 42,
    total: 45,
    coverage: 93,
  },
]

export default function Icons() {
  return <Table aria-label="Views" columns={columns} rows={rows} />
}
