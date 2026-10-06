import { useState } from 'react'
import Select from '@cypress-design/react-select'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'

const items = [
  { value: 'alpha', label: 'Alpha', iconLeft: IconShapeLightningBolt },
  { value: 'beta', label: 'Beta', iconLeft: IconShapeLightningBolt },
  { value: 'gamma', label: 'Gamma', iconLeft: IconShapeLightningBolt },
]

export default function Default() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      placeholder="Pick one"
    />
  )
}
