# Table

## Install

```bash
npm install @cypress-design/react-table
```

or with yarn

```bash
yarn add @cypress-design/react-table
```

## Usage

```ts
import Table from '@cypress-design/react-table'
```

```tsx
import Table from '@cypress-design/react-table'

export default () => (
  <Table
    aria-label="Usage"
    defaultSort={{ key: 'calls', direction: 'descending' }}
    columns={[
      { key: 'name', label: 'User', sortable: true },
      {
        key: 'calls',
        label: 'Calls',
        align: 'right',
        sortable: true,
        firstSortDirection: 'descending',
      },
    ]}
    rows={[
      { id: 'jordan', name: 'Jordan Lee', calls: 480 },
      { id: 'maya', name: 'Maya Patel', calls: 431 },
    ]}
  />
)
```
