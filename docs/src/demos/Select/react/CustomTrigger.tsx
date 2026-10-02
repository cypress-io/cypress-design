import { useState } from 'react'
import Select from '@cypress-design/react-select'
import Button from '@cypress-design/react-button'
import {
  IconActionAddSmall,
  IconShapeLightningBolt,
} from '@cypress-design/react-icon'

const items = [
  { value: 'alpha', label: 'Alpha', iconLeft: IconShapeLightningBolt },
  { value: 'beta', label: 'Beta', iconLeft: IconShapeLightningBolt },
  { value: 'gamma', label: 'Gamma', iconLeft: IconShapeLightningBolt },
]

export default function CustomTrigger() {
  const [value, setValue] = useState<string | undefined>()
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      minWidth={200}
      // The render-prop owns the trigger; call toggle() to open the popover.
      trigger={({ open, toggle }) => (
        <Button aria-expanded={open} onClick={toggle}>
          <IconActionAddSmall size="16" interactiveColorsOnGroup />
          Add new
        </Button>
      )}
    />
  )
}
