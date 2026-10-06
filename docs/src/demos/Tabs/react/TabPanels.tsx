import { useState } from 'react'
import Tabs from '@cypress-design/react-tabs'

const tabs = [
  {
    id: 'ov',
    label: 'Overview',
    ['aria-controls']: 'react-tab-panels-panel-1',
  },
  {
    id: 'cl',
    label: 'Command Log',
    ['aria-controls']: 'react-tab-panels-panel-2',
  },
  {
    id: 'err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'react-tab-panels-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    ['aria-controls']: 'react-tab-panels-panel-4',
  },
]

// Tabs doesn't render panels: track the active id and show the matching one.
export default function TabPanels() {
  const [activeId, setActiveId] = useState('ov')
  return (
    <>
      <Tabs
        tabs={tabs}
        activeId={activeId}
        onSwitch={(tab) => setActiveId(tab.id)}
      />
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          id={tab['aria-controls']}
          role="tabpanel"
          hidden={tab.id !== activeId}
          className="mt-4"
        >
          Tab panel {i + 1}
        </div>
      ))}
    </>
  )
}
