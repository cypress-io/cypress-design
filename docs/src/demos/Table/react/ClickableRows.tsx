import Table from '@cypress-design/react-table'

type View = { id: string; view: string; snapshots: number; disabled?: boolean }

const columns = [
  { key: 'view', label: 'Views' },
  { key: 'snapshots', label: 'Snapshots', align: 'right' as const },
]

const rows: View[] = [
  { id: 'home', view: 'localhost:3000/', snapshots: 5692 },
  {
    id: 'branches',
    view: 'localhost:3000/projects/*/branches/*',
    snapshots: 4394,
  },
  {
    id: 'integrations',
    view: 'localhost:3000/projects/*/settings/integrations',
    snapshots: 3078,
    disabled: true,
  },
  {
    id: 'overview',
    view: 'localhost:3000/projects/*/runs/*/overview',
    snapshots: 3045,
  },
]

// Return `undefined` to leave a row non-clickable. Pass React Router's
// `Link` as `rowLinkAs` and return `{ to }` to navigate with the router.
export default function ClickableRows() {
  return (
    <Table
      aria-label="Views"
      columns={columns}
      rows={rows}
      rowLink={(view) =>
        view.disabled ? undefined : { href: `#react-view-${view.id}` }
      }
    />
  )
}
