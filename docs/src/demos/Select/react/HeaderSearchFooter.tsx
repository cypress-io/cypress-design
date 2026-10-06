import { useState } from 'react'
import Select, { type SelectItem } from '@cypress-design/react-select'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'

const items: SelectItem[] = [
  { type: 'headline', label: 'Recent' },
  {
    value: 'alpha',
    label: 'Default',
    tag: 'New',
    iconLeft: IconShapeLightningBolt,
  },
  { value: 'beta', label: 'Selected', iconLeft: IconShapeLightningBolt },
]

export default function HeaderSearchFooter() {
  const [value, setValue] = useState<string | undefined>()
  const [tab, setTab] = useState('all')
  return (
    <Select
      items={items}
      value={value}
      onChange={setValue}
      placeholder="With header + footer"
      headerTitle="Header headline"
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
      minWidth={280}
    />
  )
}
