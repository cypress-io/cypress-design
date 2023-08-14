import * as React from 'react'
import clsx from 'clsx'
import { SidebarNavigationLinkInterface } from '../constants/dist'

export const SidebarNavigationLink: React.FC<
  SidebarNavigationLinkInterface
> = ({ item, depth = -1, onActive }) => {
  const activeLIRef = React.useRef<HTMLLIElement>(null)

  // on mount, if the item is active,
  // send the top position to the parent
  React.useEffect(() => {
    if (item.active) {
      onActive?.(activeLIRef?.current?.offsetTop || 0)
    }
  }, [])

  return (
    <li
      ref={activeLIRef}
      className={clsx('list-none p-0', {
        'pl-[16px]': depth >= 0,
        'border-l-[1px] border-gray-100 pl-[16px]': depth >= 1,
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
        {/* {depth >= 0 ? (
          // add active indicator
          <div
            className={clsx(
              'absolute w-[4px] z-10 top-[10%] h-[80%] rounded-full hidden',
              {
                'group-hover:block bg-gray-300': !item.active,
                'bg-indigo-300 visible': item.active,
              }
            )}
            style={{
              left: `-${18.5 * 8}px`,
            }}
          />
        ) : null} */}

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
