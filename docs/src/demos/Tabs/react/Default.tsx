import Tabs from '@cypress-design/react-tabs'

// Each tab's `aria-controls` points at the id of the panel it shows.
const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'react-default-panel-1' },
  {
    id: 'cl',
    label: 'Command Log',
    ['aria-controls']: 'react-default-panel-2',
  },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'react-default-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'react-default-panel-4',
  },
]

export default function Default() {
  return <Tabs tabs={tabs} activeId="ov" />
}
