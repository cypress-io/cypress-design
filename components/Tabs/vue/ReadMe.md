# Tabs

## Install

```bash
npm install @cypress-design/vue-tabs
```

or with yarn

```bash
yarn add @cypress-design/vue-tabs
```

## Usage

```ts
import Tabs from '@cypress-design/vue-tabs'
```

```vue live
<Tabs
  :tabs="[
    { id: 'ov', label: 'Overview', active: true },
    { id: 'cl', label: 'Command Log' },
    { id: 'err', label: 'Errors', href: 'https://www.cypress.io' },
    { id: 'reco', label: 'Recommendations' },
  ]"
/>
```

If one blocks switching

```vue live
<Tabs
  :tabs="[
    { id: 'ov', label: 'Overview', active: true },
    { id: 'cl', label: 'Command Log' },
    { id: 'err', label: 'Errors', href: 'https://www.cypress.io' },
    { id: 'reco', label: 'Recommendations' },
  ]"
  @switch="(_, e) => e.preventDefault()"
/>
```
