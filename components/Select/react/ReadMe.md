# Select

## Install

The Select component is contained in the `@cypress-design/react-select` package. You'll also want to install `@cypress-design/constants-select` to get proper types for TypeScript.

```bash
npm install @cypress-design/react-select @cypress-design/constants-select
```

or with yarn

```bash
yarn add @cypress-design/react-select @cypress-design/constants-select
```

## Usage

```ts
import Select from '@cypress-design/react-select'
import type { SelectItem } from '@cypress-design/constants-select'
```

```jsx
import { useState } from 'react'
import Select from '@cypress-design/react-select'

const items = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma' },
]

export default function Example() {
  const [value, setValue] = (useState < string) | (undefined > undefined)
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      placeholder="Pick one"
    />
  )
}
```

### Custom trigger

```jsx
<Select
  items={items}
  trigger={({ open, selected, toggle }) => (
    <button onClick={toggle} aria-expanded={open}>
      {selected?.label ?? 'Open'}
    </button>
  )}
/>
```

### Header with tabs + search, footer action

```jsx
<Select
  items={items}
  headerTitle="Pick a value"
  headerTabs={[
    { id: 'all', label: 'All' },
    { id: 'mine', label: 'Mine' },
  ]}
  headerActiveTab={tab}
  onHeaderTabChange={setTab}
  searchable
  footerLabel="Showing 3 of 12"
  footerAction={{ label: 'Manage', onClick: () => {} }}
  maxHeight={320}
/>
```
