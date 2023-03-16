import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { NavGroup } from '../constants'

export interface DocMenuProps {
  group: NavGroup
  depth?: number
}

export const DocMenu: React.FC<DocMenuProps> = ({ group, depth = 0 }) => {
  const [open, setOpen] = React.useState(depth === 0)
  return (
    <>
      {group.text ? (
        <button
          onClick={() => setOpen(!open)}
          className={clsx(
            'flex leading-[24px] py-[8px] items-center relative',
            {
              'leading-[24px] text-[16px] pl-[24px]': depth === 0,
              'leading-[20px] text-[14px] pl-[40px]': depth,
            }
          )}
        >
          <IconChevronDownSmall
            stroke-color="gray-400"
            size={depth ? '8' : '16'}
            className={clsx('absolute transform transition-transform left-0', {
              'rotate-0': open,
              '-rotate-90': !open,
              'ml-[16px]': depth,
            })}
          />
          {group.text}
        </button>
      ) : null}
      <ul
        className={clsx('ml-[7px]', {
          'border-l border-gray-100': depth === 0,
          hidden: !open,
        })}
      >
        {group.items.map((item) =>
          'href' in item ? (
            <li className="pl-[16px]">
              <a
                className={clsx(
                  'group relative inline-block py-[12px] leading-[20px] text-[14px] pl-[24px]',
                  {
                    'text-indigo-500': item.active,
                  }
                )}
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
          ) : (
            <li>
              <DocMenu group={item} depth={depth + 1} />
            </li>
          )
        )}
      </ul>
    </>
  )
}

export default DocMenu
