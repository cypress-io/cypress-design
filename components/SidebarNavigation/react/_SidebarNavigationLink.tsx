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
        [`px-[20px] mt-[16px]`]: depth == 0,
        [`p-0 border-l-[1px] border-gray-100/10`]: depth == 1,
      })}
    >
      <a
        className={clsx([`flex items-center group relative inline-block`], {
          'text-indigo-300': item.active,
          [`text-gray-500 text-16px leading-[24px] pl-[0] py-[8px]`]:
            depth == 0,
          'text-gray-500 leading-[20px] text-[14px] pl-[34px] py-[8px]':
            depth == 1,
        })}
        href={item.href}
      >
        {/* Active indicator */}
        <div
          className={clsx(
            'absolute w-[4px] z-10 transition-all duration-300 ease-in-out top-[10%] h-[80%] ',
            {
              [`left-[-20px] rounded-r`]: depth == 0,
              [`left-[-2px] rounded-full`]: depth == 1,
              'group-hover:block bg-gray-300 opacity-0 group-hover:opacity-100':
                !item.active,
              'bg-indigo-300 block opacity-100': item.active,
            },
          )}
        />

        {/* Add optional icon */}
        {item.icon && (
          <span className="mr-[24px]">
            <item.icon
              size={24}
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
