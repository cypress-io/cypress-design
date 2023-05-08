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
    tabs={[
      { id: 'ov', label: 'Overview', active: true },
      { id: 'cl', label: 'Command Log', icon: IconActionPlayVideo },
      { id: 'err', label: 'Errors', href: 'https://www.cypress.io' },
      { id: 'reco', label: 'Recommendations' },
    ]}
  />
)
```
