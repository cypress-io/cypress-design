import * as React from 'react'
import clsx from 'clsx'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { NavGroup, classes } from '../constants/dist'

export interface SidebarNavigationGroupProps {
  group: NavGroup
  depth?: number
}

export const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({
  group,
  depth = 0,
}) => {
  const Head = group.href ? 'a' : 'div'

  return (
    <>
      <Head
        href={group.href}
        className={clsx(classes.button, {
          'text-indigo-500': group.active,
          [classes.topButton]: depth === 0,
          [classes.leafButton]: depth,
        })}
      >
        {group.text}
      </Head>
      <ul
        className={clsx('ml-[8px] list-none p-0', {
          'border-l border-gray-100': depth === 0,
        })}
      >
        {group.items.map((item, index) =>
          'items' in item ? (
            <li key={index} className="relative list-none p-0">
              <SidebarNavigationGroup group={item} depth={depth + 1} />
            </li>
          ) : (
            <SidebarNavigationLink key={index} item={item} depth={depth} />
          ),
        )}
      </ul>
    </>
  )
}
