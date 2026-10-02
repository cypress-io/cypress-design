import Tabs from '@cypress-design/react-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'react-underline-panel-1' },
  {
    id: 'cl',
    label: 'Command Log',
    ['aria-controls']: 'react-underline-panel-2',
  },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'react-underline-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'react-underline-panel-4',
  },
]

// A bottom border marks the active tab; center centers the tabs over a fading line.
export default function Underline() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs tabs={tabs} activeId="ov" variant="underline-small" />
      <Tabs tabs={tabs} activeId="ov" variant="underline-center" />
      <Tabs tabs={tabs} activeId="ov" variant="underline-large" />
    </div>
  )
}
