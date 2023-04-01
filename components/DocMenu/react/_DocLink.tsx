import * as React from 'react'
import clsx from 'clsx'
import { NavItemLink } from '../constants'

export interface DocLinkProps {
  item: NavItemLink
  depth?: number
  onActive?: (top: number) => void
}

export const DocLink: React.FC<DocLinkProps> = ({
  item,
  depth = -1,
  onActive,
}) => {
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
              'absolute w-[4px] z-10 top-[10%] h-[80%] rounded-full hidden',
              {
                'group-hover:block bg-gray-300': !item.active,
              }
            )}
            style={{
              left: `-${18.5 + depth * 8}px`,
            }}
          />
        ) : null}
        {item.text}
      </a>
    </li>
  )
}