import * as React from 'react'
import {
  NavGroup,
  NavItemLink,
} from '@cypress-design/constants-SidebarNavigation'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { SidebarNavigationGroup } from './_SidebarNavigationGroup'
import clsx from 'clsx'

export type NavItem = NavGroup | NavItemLink

export interface SidebarNavigationProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: NavItem[]
  collapsible?: boolean
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items,
  collapsible = true,
  ...rest
}) => {
  return (
    <ul {...rest} className={clsx('list-none p-0', rest.className)}>
      {items.map((item, index) =>
        'items' in item ? (
          <li key={index} className="relative list-none p-0">
            <SidebarNavigationGroup group={item} collapsible={collapsible} />
          </li>
        ) : (
          <SidebarNavigationLink
            key={index}
            item={item}
            collapsible={collapsible}
          />
        ),
      )}
    </ul>
  )
}

export default SidebarNavigation
