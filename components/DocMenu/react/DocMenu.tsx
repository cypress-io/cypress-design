import * as React from 'react'
import { NavGroup, classes, NavItemLink } from '../constants'
import { DocLink } from './_DocLink'
import { DocGroup } from './_DocGroup'

export type NavItem = NavGroup | NavItemLink

export interface DocMenuProps {
  items: NavItem[]
  className?: string
}

export const DocMenu: React.FC<DocMenuProps> = ({ items, className }) => {
  return (
    <ul className={className}>
      {items.map((item, index) =>
        'href' in item ? (
          <DocLink key={index} item={item} />
        ) : (
          <li key={index} className="relative">
            <DocGroup group={item} />
          </li>
        )
      )}
    </ul>
  )
}

export default DocMenu
