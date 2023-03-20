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
        <div
          className={clsx(
            'absolute w-[4px] z-10 top-[5%] h-[90%] rounded-full',
            {
              'left-[-18.5px]': depth === 0,
              'left-[-25.5px]': depth > 0,
              'hidden group-hover:block bg-gray-300': !item.active,
              'bg-indigo-500': item.active,
            }
          )}
        />
        {item.text}
      </a>
    </li>
  )
}
