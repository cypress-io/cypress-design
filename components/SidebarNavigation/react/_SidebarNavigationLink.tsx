import * as React from 'react'
import clsx from 'clsx'
import { SidebarNavigationLinkInterface } from '../constants/dist'

export const SidebarNavigationLink: React.FC<
  SidebarNavigationLinkInterface
> = ({ item, depth = 0 }) => {
  const activeLIRef = React.useRef<HTMLLIElement>(null)

  return (
    <li
      ref={activeLIRef}
      className={clsx('relative list-none p-0', {
        'pl-[16px]': depth >= 0,
        'border-l-[1px] border-gray-100/10 pl-[16px]': depth >= 1,
      })}
    >
      <a
        className={clsx(
          'flex items-center group relative inline-block pl-[16px] py-[8px]',
          {
            'text-indigo-300': item.active,
            'text-gray-500 text-[16px] leading-[24px]': depth < 0,
            'text-gray-500 pl-[0px] leading-[20px] text-[14px]': depth >= 0,
          },
        )}
        href={item.href}
      >
        <div
          className={clsx(
            'absolute w-[4px] z-10 transition-all duration-300 ease-in-out',
            {
              'left-[-16px] top-[10%] h-[80%] rounded-r': depth == 0,
              'top-[10%] h-[80%] rounded-full': depth == 1,
              'group-hover:block bg-gray-300 opacity-0 group-hover:opacity-100':
                !item.active,
              'bg-indigo-300 block opacity-100': item.active,
            },
          )}
          style={depth == 1 ? { left: `-${18.5}px` } : {}}
        />

        {/* Add optional icon */}
        {item.icon && (
          <span className="mr-2">
            <item.icon
              size="24"
              strokeColor="white-900"
              fillColor="white-200"
            />
          </span>
        )}

        {item.text}
      </a>
    </li>
  )
}
