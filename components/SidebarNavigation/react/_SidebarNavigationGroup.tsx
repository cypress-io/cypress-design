import * as React from 'react'
import clsx from 'clsx'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { NavGroup } from '../constants/dist'

export interface SidebarNavigationGroupProps {
  group: NavGroup
  depth?: number
}

export const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({
  group,
  depth = 0,
}) => {
  return (
    <>
      <SidebarNavigationLink
        item={{
          icon: group.icon,
          href: group.href || '',
          ...group,
        }}
        depth={depth}
      />
      <ul
        className={clsx('ml-1 list-none p-0', {
          'pl-[24px]': depth >= 0,
        })}
      >
        {group.items.map((item, index) => {
          return (
            <SidebarNavigationLink key={index} item={item} depth={depth + 1} />
          )
        })}
      </ul>
    </>
  )
}
