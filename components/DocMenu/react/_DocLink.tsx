import * as React from 'react'
import clsx from 'clsx'
import { NavItemLink } from '@cypress-design/constants-docmenu'
import { MarkerIsMovingContext } from './markerIsMoving'

export type LinkComponentType = React.ElementType<{
  href: string
  className: string
  style: React.CSSProperties
  children: React.ReactNode
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

    const { markerIsMoving } = React.useContext(MarkerIsMovingContext)

    const setActiveMarkerPosition = () => {
      if (active) {
        const box = activeLIRef?.current?.getBoundingClientRect()

        onActive?.({
          top: box?.top || 0,
          height: box?.height || 0,
        })
      }
    }

    // on mount, if the item is active,
    // send the top position to the parent
    React.useEffect(setActiveMarkerPosition, [onActive, active])

    React.useImperativeHandle(ref, () => ({
      setActiveMarkerPosition,
    }))

    return (
      <li ref={activeLIRef} className="list-none p-0">
        <LinkComponent
          className={clsx('group relative block w-full pl-[24px]', {
            'text-indigo-500': active,
            'text-gray-700 dark:text-gray-500': !active,
            'py-[8px] text-[16px] leading-[24px]': depth < 0,
            'leading-[20px] text-[14px] py-[12px]': depth >= 0,
          })}
          href={item.href}
          style={{
            paddingLeft: depth >= 0 ? `${depth * 12 + 48}px` : undefined,
          }}
        >
          {depth >= 0 ? (
            <div
              className={clsx(
                'left-[6.5px] absolute top-[4px] bottom-[4px] w-[4px] z-10 rounded-full',
                {
                  hidden: !markerIsMoving || !active,
                  'group-hover:block bg-gray-300': !active && collapsible,
                  'bg-indigo-500': active && markerIsMoving,
                },
              )}
            />
          ) : null}
          {item.label}
        </LinkComponent>
      </li>
    )
  },
)
