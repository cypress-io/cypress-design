import { useState } from 'react'
import Tabs from '@cypress-design/react-tabs'

const tabs = [
  { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
  { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
  { id: 'err', label: 'Errors', tag: '13', ['aria-controls']: 'tabpanel-id-3' },
  { id: 'reco', label: 'Recommendations', ['aria-controls']: 'tabpanel-id-4' },
]

// Calling preventDefault() in onSwitch keeps the current tab.
export default function BlockSwitching() {
  const [allowMove, setAllowMove] = useState(true)
  return (
    <>
      <label className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={allowMove}
          onChange={(e) => setAllowMove(e.target.checked)}
        />
        Allow tab move
      </label>
      <Tabs
        tabs={tabs}
        activeId="ov"
        onSwitch={(_tab, e) => {
          if (!allowMove) e.preventDefault()
        }}
      />
    </>
  )
}
