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

export default () => (
  <Tabs
    activeId="ov"
    tabs={[
      { id: 'ov', label: 'Overview' },
      { id: 'cl', label: 'Command Log', icon: IconActionPlayVideo },
      { id: 'err', label: 'Errors', href: 'https://www.cypress.io' },
      { id: 'reco', label: 'Recommendations' },
    ]}
  />
)
```

```tsx live
import { useState } from 'react'
import { IconActionPlayVideo } from '@cypress-design/react-icon'

export default () => {
  const [allowMove, setAllowMove] = useState(true)
  return (
    <>
      <fieldset>
        <input
          id="allow-move"
          type="checkbox"
          onClick={() => setAllowMove(!allowMove)}
          checked={allowMove}
          class="mr-2"
        />
        <label for="allow-move">allow tab move</label>
      </fieldset>
      <Tabs
        activeId="ov"
        tabs={[
          { id: 'ov', label: 'Overview' },
          { id: 'cl', label: 'Command Log', icon: IconActionPlayVideo },
          { id: 'err', label: 'Errors', href: 'https://www.cypress.io' },
          { id: 'reco', label: 'Recommendations' },
        ]}
        onSwitch={(_, e) => {
          if (!allowMove) e.preventDefault()
        }}
      />
    </>
  )
}
```
