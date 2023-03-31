import * as React from 'react'
import { NavGroup, NavItemLink } from '../constants'
import { DocLink } from './_DocLink'
import { DocGroup } from './_DocGroup'

export type NavItem = NavGroup | NavItemLink

export interface DocMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: NavItem[]
  collapsible?: boolean
}

export const DocMenu: React.FC<DocMenuProps> = ({
  items,
  collapsible = true,
  ...rest
}) => {
  return (
    <ul {...rest}>
      {items.map((item, index) =>
        'items' in item ? (
          <li key={index} className="relative">
            <DocGroup group={item} collapsible={collapsible} />
          </li>
        ) : (
          <DocLink key={index} item={item} />
        )
      )}
    </ul>
  )
}

export default DocMenu
