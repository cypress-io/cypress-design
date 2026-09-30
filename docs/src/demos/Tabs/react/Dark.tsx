import Tabs from '@cypress-design/react-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
  { id: 'err', label: 'Errors', tag: '13', ['aria-controls']: 'tabpanel-id-3' },
  { id: 'reco', label: 'Recommendations', ['aria-controls']: 'tabpanel-id-4' },
]

// For dark surfaces, in two sizes.
export default function Dark() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Tabs tabs={tabs} activeId="ov" variant="dark-small" />
      <Tabs tabs={tabs} activeId="ov" variant="dark-large" />
    </div>
  )
}
