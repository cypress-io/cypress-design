import * as React from 'react'
import type { NavGroup, NavItemLink } from '../constants'
import DocMenu from './DocMenu'

export default ({ items }: { items: (NavGroup | NavItemLink)[] }) => {
  return <DocMenu items={items} />
}
