import { useState } from 'react'
import Select, { type SelectItem } from '@cypress-design/react-select'

// `render` draws the row's interior; `label` is what the trigger shows once selected.
const items: SelectItem[] = ['Alpha', 'Beta', 'Gamma'].map((label) => ({
  type: 'custom',
  value: label.toLowerCase(),
  label,
  render: ({ selected }) => (
    <span className="flex w-full justify-between gap-4">
      <span>{label}</span>
      <span className="text-gray-500">{selected ? 'Selected' : ''}</span>
    </span>
  ),
}))

export default function CustomRow() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      placeholder="Pick one"
      minWidth={200}
    />
  )
}
