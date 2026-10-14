import { useState } from 'react'
import Select, { type SelectItem } from '@cypress-design/react-select'

const items: SelectItem[] = [
  {
    type: 'checkbox',
    value: 'a',
    label: 'Option A',
    subText: 'Secondary text',
  },
  {
    type: 'checkbox',
    value: 'b',
    label: 'Option B',
    subText: 'Secondary text',
  },
  {
    type: 'checkbox',
    value: 'c',
    label: 'Option C',
    subText: 'Secondary text',
  },
]

// Checkbox rows are still single-select: clicking the checked row clears it.
export default function CheckboxRows() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      placeholder="Checkbox rows"
      minWidth={240}
    />
  )
}
