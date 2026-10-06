import { useState } from 'react'
import Select, { type SelectItem } from '@cypress-design/react-select'
import { IconUserGeneralOutline } from '@cypress-design/react-icon'

const items: SelectItem[] = [
  {
    type: 'user',
    value: 'jordan',
    label: 'Jordan Lee',
    secondary: 'jordan@example.com',
    iconLeft: IconUserGeneralOutline,
  },
  {
    type: 'user',
    value: 'maya',
    label: 'Maya Patel',
    secondary: 'maya@example.com',
    iconLeft: IconUserGeneralOutline,
  },
  {
    type: 'user',
    value: 'sam',
    label: 'Sam Rivera',
    secondary: 'sam@example.com — Enterprise SSO',
    iconLeft: IconUserGeneralOutline,
  },
]

export default function UserRows() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      placeholder="Assignee"
      minWidth={280}
    />
  )
}
