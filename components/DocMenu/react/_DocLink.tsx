import * as React from 'react'
import clsx from 'clsx'
import { NavItemLink } from '@cypress-design/constants-docmenu'

export type LinkComponentType = React.ElementType<{
  href: string
  className?: string
  children?: React.ReactNode
}>

export interface DocLinkProps {
  item: NavItemLink
  active: boolean
  collapsible: boolean
  depth?: number
  onActive?: (opts: { top: number; height: number }) => void
  LinkComponent?: LinkComponentType
}

export interface DocLinkForward {
  setActiveMarkerPosition: () => void
}

export const DocLink = React.forwardRef<DocLinkForward, DocLinkProps>(
  (
    { item, active, collapsible, depth = -1, onActive, LinkComponent = 'a' },
    ref,
  ) => {
    const activeLIRef = React.useRef<HTMLLIElement>(null)

    // on mount, if the item is active,
    // send the top position to the parent
    React.useEffect(setActiveMarkerPosition, [onActive, active])

    function setActiveMarkerPosition() {
      if (active) {
        const box = activeLIRef?.current?.getBoundingClientRect()
        onActive?.({
          top: box?.top || 0,
          height: box?.height || 0,
        })
      }
    }

    React.useImperativeHandle(ref, () => ({
      setActiveMarkerPosition,
    }))

    return (
      <li
        ref={activeLIRef}
        className={clsx('list-none p-0', {
          'pl-[16px]': depth >= 0,
        })}
      >
        <LinkComponent
          className={clsx('group relative inline-block pl-[24px]', {
            'text-indigo-500': active,
            'py-[8px] text-[16px] leading-[24px]': depth < 0,
            'py-[12px] leading-[20px] text-[14px]': depth >= 0,
          })}
          href={item.href}
        >
          {depth >= 0 ? (
            <div
              className={clsx(
                'absolute w-[4px] z-10 top-[4px] bottom-[4px] rounded-full hidden',
                {
                  'group-hover:block bg-gray-300': !active && collapsible,
                },
              )}
              style={{
                left: `-${18.5 + depth * 8}px`,
              }}
            />
          ) : null}
          {item.label}
        </LinkComponent>
      </li>
    )
  },
)
