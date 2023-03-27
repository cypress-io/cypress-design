import * as React from 'react'
import clsx from 'clsx'
import { NavItemLink } from '../constants'

export interface DocLinkProps {
  item: NavItemLink
  depth?: number
}

export const DocLink: React.FC<DocLinkProps> = ({ item, depth = -1 }) => {
  return (
    <li
      className={clsx({
        'pl-[16px]': depth >= 0,
      })}
    >
      <a
        className={clsx('group relative inline-block pl-[24px]', {
          'text-indigo-500': item.active,
          'py-[8px] text-[16px] leading-[24px]': depth < 0,
          'py-[12px] leading-[20px] text-[14px]': depth >= 0,
        })}
        href={item.href}
      >
        {depth >= 0 ? (
          <div
            className={clsx(
              'absolute w-[4px] z-10 top-[5%] h-[90%] rounded-full hidden',
              {
                'left-[-18.5px]': depth === 0,
                'left-[-26px]': depth === 1,
                'left-[-33.5px]': depth === 2,
                'group-hover:block bg-gray-300': !item.active,
              }
            )}
          />
        ) : null}
        {item.text}
      </a>
    </li>
  )
}
