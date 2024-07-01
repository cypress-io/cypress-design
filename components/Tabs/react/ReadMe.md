# Tabs

## Install

```bash
npm install @cypress-design/react-tabs
```

or with yarn

```bash
yarn add @cypress-design/react-tabs
```

## Usage

```ts
import Tabs from '@cypress-design/react-tabs'
```

```tsx live
import { IconActionPlayVideo } from '@cypress-design/react-icon'

export default () => {
  const activeId = 'ov'
  const tabs = [
    { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
    {
      id: 'cl',
      label: 'Command Log',
      icon: IconActionPlayVideo,
      ['aria-controls']: 'tabpanel-id-2',
    },
    {
      id: 'err',
      label: 'Errors',
      href: 'https://www.cypress.io',
      ['aria-controls']: 'tabpanel-id-3',
    },
    {
      id: 'reco',
      label: 'Recommendations',
      ['aria-controls']: 'tabpanel-id-4',
    },
  ]

  return (
    <div>
      <Tabs activeId={activeId} tabs={tabs} />
      {tabs.map(({ id: tabId, ...rest }, i) => (
        <div
          key={i}
          role="tabpanel"
          id={rest['aria-controls']}
          style={{ display: activeId === tabId ? 'block' : 'none' }}
        >
          Tab Panel {i + 1}
        </div>
      ))}
    </div>
  )
}
```

```tsx live
import { useState } from 'react'
import { IconActionPlayVideo } from '@cypress-design/react-icon'

export default () => {
  const activeId = 'ov'
  const [allowMove, setAllowMove] = useState(true)
  const tabs = [
    { id: 'ov', label: 'Overview', ['aria-controls']: 'tabpanel-id-1' },
    {
      id: 'cl',
      label: 'Command Log',
      icon: IconActionPlayVideo,
      ['aria-controls']: 'tabpanel-id-2',
    },
    {
      id: 'err',
      label: 'Errors',
      href: 'https://www.cypress.io',
      ['aria-controls']: 'tabpanel-id-3',
    },
    {
      id: 'reco',
      label: 'Recommendations',
      ['aria-controls']: 'tabpanel-id-4',
    },
  ]
  return (
    <>
      <fieldset>
        <input
          id="allow-move"
          type="checkbox"
          onClick={() => setAllowMove(!allowMove)}
          defaultChecked={allowMove}
          className="mr-2"
        />
        <label htmlFor="allow-move">allow tab move</label>
      </fieldset>
      <Tabs
        activeId={activeId}
        tabs={tabs}
        onSwitch={(_, e) => {
          if (!allowMove) e.preventDefault()
        }}
      />
      {tabs.map(({ id: tabId, ...rest }, i) => (
        <div
          key={i}
          role="tabpanel"
          id={rest['aria-controls']}
          style={{ display: activeId === tabId ? 'block' : 'none' }}
        >
          Tab Panel {i + 1}
        </div>
      ))}
    </>
  )
}
```
