import * as React from 'react'
import { NavGroup, NavItemLink } from '@cypress-design/constants-docmenu'
import { DocLink } from './_DocLink'
import { DocGroup } from './_DocGroup'
import clsx from 'clsx'

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
    <ul {...rest} className={clsx('list-none p-0', rest.className)}>
      {items.map((item, index) =>
        'items' in item ? (
          <li key={index} className="relative list-none p-0">
            <DocGroup index={index} group={item} collapsible={collapsible} />
          </li>
        ) : (
          <DocLink key={index} item={item} collapsible={collapsible} />
        ),
      )}
    </ul>
  )
}

export default DocMenu
