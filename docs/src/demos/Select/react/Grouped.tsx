import { useState } from 'react'
import Select, { type SelectItem } from '@cypress-design/react-select'
import {
  IconShapeLightningBolt,
  IconObjectGear,
} from '@cypress-design/react-icon'

const items: SelectItem[] = [
  { type: 'headline', label: 'Recent' },
  {
    value: 'alpha',
    label: 'Default',
    tag: 'New',
    iconLeft: IconShapeLightningBolt,
  },
  { value: 'beta', label: 'Selected', iconLeft: IconShapeLightningBolt },
  { type: 'divider' },
  { type: 'headline', label: 'All content types' },
  {
    value: 'delta',
    label: 'With icon right',
    iconLeft: IconShapeLightningBolt,
    iconRight: IconObjectGear,
  },
  {
    value: 'epsilon',
    label: 'Disabled',
    disabled: true,
    iconLeft: IconShapeLightningBolt,
  },
]

export default function Grouped() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      placeholder="Groups + tag + disabled"
      minWidth={240}
    />
  )
}
