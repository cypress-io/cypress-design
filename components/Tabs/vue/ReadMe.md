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
    {
      id: 'ov',
      label: 'Overview',
      active: true,
      ['aria-controls']: 'tabpanel-id-1',
    },
    { id: 'cl', label: 'Command Log', ['aria-controls']: 'tabpanel-id-2' },
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
  ]"
/>
```

If one blocks switching

```vue live
<Tabs
  :tabs="[
    {
      id: 'ov',
      label: 'Overview',
      active: true,
      ['aria-controls']: 'tabpanel-id-1',
    },
    {
      id: 'cl',
      label: 'Command Log',
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
  ]"
  @switch="(_, e) => e.preventDefault()"
/>
```
