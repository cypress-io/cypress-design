import Tabs from '@cypress-design/react-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
  { id: 'err', label: 'Errors', tag: '13', ['aria-controls']: 'tabpanel-id-3' },
  { id: 'reco', label: 'Recommendations', ['aria-controls']: 'tabpanel-id-4' },
]

// Same layout as the default, with an indigo active tab.
export default function IndigoLight() {
  return <Tabs tabs={tabs} activeId="ov" variant="indigo-light" />
}
