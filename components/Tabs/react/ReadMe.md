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
export default () => (
  <Tabs
    tabs={[
      { id: 'ov', label: 'Overview', active: true },
      { id: 'cl', label: 'Command Log' },
      { id: 'err', label: 'Errors', href: 'https://www.cypress.io' },
      { id: 'reco', label: 'Recommendations' },
    ]}
  />
)
```
