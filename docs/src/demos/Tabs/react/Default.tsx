import Tabs from '@cypress-design/react-tabs'

// Each tab's `aria-controls` points at the id of the panel it shows.
const tabs = [
  {
    id: 'react-default-ov',
    label: 'Overview',
    ['aria-controls']: 'react-default-panel-1',
  },
  {
    id: 'react-default-cl',
    label: 'Command Log',
    ['aria-controls']: 'react-default-panel-2',
  },
  {
    id: 'react-default-err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'react-default-panel-3',
  },
  {
    id: 'react-default-reco',
    label: 'Recommendations',
    ['aria-controls']: 'react-default-panel-4',
  },
]

export default function Default() {
  return <Tabs tabs={tabs} activeId="react-default-ov" />
}
