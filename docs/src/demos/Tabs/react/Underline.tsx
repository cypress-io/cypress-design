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

// Tab ids become element ids, so each Tabs on the page gets its own set.
const tabsFor = (prefix: string) =>
  tabs.map((tab) => ({ ...tab, id: `${prefix}-${tab.id}` }))

// A bottom border marks the active tab; center centers the tabs over a fading line.
export default function Underline() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs
        tabs={tabsFor('react-underline-small')}
        activeId="react-underline-small-ov"
        variant="underline-small"
      />
      <Tabs
        tabs={tabsFor('react-underline-center')}
        activeId="react-underline-center-ov"
        variant="underline-center"
      />
      <Tabs
        tabs={tabsFor('react-underline-large')}
        activeId="react-underline-large-ov"
        variant="underline-large"
      />
    </div>
  )
}
