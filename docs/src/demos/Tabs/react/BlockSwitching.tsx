import { useState } from 'react'
import Tabs from '@cypress-design/react-tabs'

const tabs = [
  {
    id: 'react-block-switching-ov',
    label: 'Overview',
    ['aria-controls']: 'react-block-switching-panel-1',
  },
  {
    id: 'react-block-switching-cl',
    label: 'Command Log',
    ['aria-controls']: 'react-block-switching-panel-2',
  },
  {
    id: 'react-block-switching-err',
    label: 'Errors',
    tag: '13',
    ['aria-controls']: 'react-block-switching-panel-3',
  },
  {
    id: 'react-block-switching-reco',
    label: 'Recommendations',
    ['aria-controls']: 'react-block-switching-panel-4',
  },
]

// Calling preventDefault() in onSwitch keeps the current tab.
export default function BlockSwitching() {
  const [allowMove, setAllowMove] = useState(true)
  return (
    <>
      <label
        htmlFor="react-block-switching-allow-move"
        className="mb-4 flex items-center gap-2"
      >
        <input
          id="react-block-switching-allow-move"
          type="checkbox"
          checked={allowMove}
          onChange={(e) => setAllowMove(e.target.checked)}
        />
        Allow tab move
      </label>
      <Tabs
        tabs={tabs}
        activeId="react-block-switching-ov"
        onSwitch={(_tab, e) => {
          if (!allowMove) e.preventDefault()
        }}
      />
    </>
  )
}
