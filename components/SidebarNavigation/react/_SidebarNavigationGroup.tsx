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
          href: group.href || '',
          active:
            group.active ||
            (group.items && group.items.some((item) => item.active)),
          ...group,
        }}
        depth={depth}
      />
      <li className="relative list-none p-0">
        <ul className={clsx('list-none pl-[32px] py-[8px]')}>
          {group.items.map((item, index) => {
            return (
              <SidebarNavigationLink
                key={index}
                item={item}
                depth={depth + 1}
              />
            )
          })}
        </ul>
      </li>
    </>
  )
}
