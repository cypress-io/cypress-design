# Select

## Install

```bash
npm install @cypress-design/react-select
```

or with yarn

```bash
yarn add @cypress-design/react-select
```

Types (`SelectItem`, `SelectItemDefault`, `SelectItemUser`, …) are re-exported from `@cypress-design/react-select` — there's no separate constants package to install.

## Usage

```tsx
import Select, { type SelectItem } from '@cypress-design/react-select'
```

```tsx
import { useState } from 'react'
import Select from '@cypress-design/react-select'

const items = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma' },
]

export default function Example() {
  const [value, setValue] = useState<string | undefined>(undefined)
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

```tsx
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

```tsx
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
