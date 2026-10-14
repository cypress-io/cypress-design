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

// Tab ids become element ids, so each Tabs on the page gets its own set.
const tabsFor = (prefix: string) =>
  tabs.map((tab) => ({ ...tab, id: `${prefix}-${tab.id}` }))

// For dark surfaces, in two sizes.
export default function Dark() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Tabs
        tabs={tabsFor('react-dark-small')}
        activeId="react-dark-small-ov"
        variant="dark-small"
      />
      <Tabs
        tabs={tabsFor('react-dark-large')}
        activeId="react-dark-large-ov"
        variant="dark-large"
      />
    </div>
  )
}
