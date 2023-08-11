import * as React from 'react'
import type { NavGroup, NavItemLink } from '../constants/dist'
import SidebarNavigation from './SidebarNavigation'

export default ({ items }: { items: (NavGroup | NavItemLink)[] }) => {
  return <SidebarNavigation items={items} />
}
