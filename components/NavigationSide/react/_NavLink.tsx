import * as React from 'react'
import clsx from 'clsx'
import { IconGeneralPlaceholder } from '@cypress-design/react-icon'

export interface NavLinkContentsProps {
  label: string
  href: string
  icon?: React.ReactElement
}

export interface NavLinkProps extends React.HTMLAttributes<HTMLUListElement> {
  item: NavLinkContentsProps
  expanded: boolean
  active?: boolean
  depth?: number
  onActive?: (top: number) => void
  className?: string
  ref?: React.LegacyRef<HTMLUListElement>
}

export const NavLink: React.FC<NavLinkProps> = ({
  item,
  expanded,
  depth = -1,
  onActive,
  active,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onActive?.(item.href)
  }

  const activeLIRef = React.useRef<HTMLLIElement>(null)

  // on mount, if the item is active,
  // send the top position to the parent
  React.useEffect(() => {
    if (active) {
      onActive?.(activeLIRef?.current?.offsetTop || 0)
    }
  }, [])
  return (
    <li
      ref={activeLIRef}
      className={clsx('list-none p-0', rest.className, {
        'pl-[16px]': depth >= 0,
      })}
    >
      <a
        onClick={handleClick}
        className={clsx('flex items-center gap-2 group pl-[24px] bg-gray-900', {
          'text-indigo-500': active,
          'text-white': !active,
          'py-[8px] text-[16px] leading-[24px]': depth < 0,
          'py-[12px] leading-[20px] text-[14px]': depth >= 0,
        })}
        href={item.href}
      >
        {item.icon || <IconGeneralPlaceholder fillColor="transparent" />}
        {depth >= 0 ? (
          <div
            className={clsx('w-[4px] z-10 h-[80%] rounded-full hidden', {
              'group-hover:block bg-gray-300': !active && !expanded,
            })}
          />
        ) : null}
        {item.label}
      </a>
    </li>
  )
}
