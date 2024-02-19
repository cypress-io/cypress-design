import * as React from 'react'
import clsx from 'clsx'
import { NavItemLink } from '@cypress-design/constants-docmenu'

export interface Context {
  setMarkerIsMoving: (markerIsMoving: boolean) => void
  collapsible: boolean
  activePath: string
  hideMarker: () => void
}

export type LinkComponentType = React.ElementType<{
  href: string
  className: string
  style: React.CSSProperties
  children: React.ReactNode
}>

export interface DocLinkProps {
  item: NavItemLink
  depth: number
  markerIsMoving: boolean
  context: Context
  onActive: (opts: { top: number; height: number }) => void
  LinkComponent: LinkComponentType
}

export interface DocLinkForward {
  setActiveMarkerPosition: () => void
}

export const DocLink = React.forwardRef<DocLinkForward, DocLinkProps>(
  ({ item, depth, markerIsMoving, context, onActive, LinkComponent }, ref) => {
    const activeLIRef = React.useRef<HTMLLIElement>(null)

    const active = React.useMemo(
      () => item.href === context.activePath,
      [item.href, context.activePath],
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, ...itemRest } = item

    const setActiveMarkerPosition = () => {
      if (active) {
        const box = activeLIRef?.current?.getBoundingClientRect()

        onActive({
          top: box?.top || 0,
          height: box?.height || 0,
        })
      }
    }

    // on mount, if the item is active,
    // send the top position to the parent
    React.useEffect(setActiveMarkerPosition, [onActive, active])

    React.useEffect(() => {
      if (active && activeLIRef.current) {
        // if active check if the item is visible in the
        // viewport and scrollIntoView if not
        const rect = activeLIRef.current.getBoundingClientRect()

        if (
          rect.top > 0 &&
          rect.bottom < window.innerHeight &&
          rect.left > 0 &&
          rect.right < window.innerWidth
        ) {
          return
        }

        activeLIRef.current.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        })
      }
    }, [active])

    React.useImperativeHandle(ref, () => ({
      setActiveMarkerPosition,
    }))

    return (
      <li ref={activeLIRef} className="list-none p-0">
        <LinkComponent
          {...itemRest}
          className={clsx('group relative block w-full pl-[24px]', {
            'text-indigo-500 dark:text-indigo-400': active,
            'text-gray-700 dark:text-gray-500': !active,
            'py-[8px] text-[16px] leading-[24px]': depth < 0,
            'leading-[20px] text-[14px] py-[12px]': depth >= 0,
          })}
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
                  'group-hover:block bg-gray-300':
                    !active && context.collapsible,
                  'bg-indigo-500 dark:bg-indigo-400': active && markerIsMoving,
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

DocLink.displayName = 'DocMenuDocLink'
