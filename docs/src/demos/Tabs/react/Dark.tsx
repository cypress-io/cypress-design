import Tabs from '@cypress-design/react-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'react-dark-panel-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'react-dark-panel-2' },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'react-dark-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'react-dark-panel-4',
  },
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
