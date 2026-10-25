import { useState, type ComponentProps, type MouseEvent } from 'react'
import Menu from '@cypress-design/react-menu'
import {
  IconTechnologyServerAlt,
  IconAnimatedTechnologyServer,
  IconViewPieChart,
  IconAnimatedViewChart,
} from '@cypress-design/react-icon'

// An item with `items` renders its children as an indented submenu.
const items: ComponentProps<typeof Menu>['items'] = [
  {
    label: 'Runs',
    icon: (props) => <IconTechnologyServerAlt {...props} />,
    iconActive: IconAnimatedTechnologyServer,
    href: '#runs',
  },
  {
    label: 'Insights',
    icon: (props) => <IconViewPieChart {...props} />,
    iconActive: IconAnimatedViewChart,
    href: '#insights',
    items: [
      'Run status',
      'Run duration',
      'Test suite size',
      'Top failures',
      'Flaky tests',
    ].map((label) => ({
      label,
      href: `#${label.toLowerCase().replace(/ /g, '-')}`,
    })),
  },
]

export default function NestedItems() {
  const [activePath, setActivePath] = useState('#run-status')
  function onMouseDown(e: MouseEvent<HTMLUListElement>) {
    const link = (e.target as HTMLElement).closest('a')
    if (!link) return
    e.preventDefault()
    setActivePath(`#${link.href.split('#')[1]}`)
  }
  return (
    <Menu
      className="w-64"
      activePath={activePath}
      items={items}
      onMouseDown={onMouseDown}
    />
  )
}
