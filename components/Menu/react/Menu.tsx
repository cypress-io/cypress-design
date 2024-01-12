import * as React from 'react'
import { NavGroup, NavItemLink } from '@cypress-design/constants-menu'
import type { MenuLinkComponentType } from './_MenuLink'
import { MenuGroupElements } from './_MenuGroup'

export type NavItem = NavGroup | NavItemLink

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: NavItem[]
  activePath?: string
  collapsible?: boolean
  LinkComponent?: MenuLinkComponentType
}

export const Menu: React.FC<MenuProps> = ({
  items,
  activePath = '<unknown>',
  collapsible = true,
  LinkComponent = 'a',
  ...rest
}) => {
  const [activeTop, setActiveTop] = React.useState(0)
  const [activeHeight, setActiveHeight] = React.useState(36)
  const [showMarker, setShowMarker] = React.useState(false)
  const [markerIsMoving, localSetMarkerIsMoving] = React.useState(false)
  const [hasCSSTransition, setHasCSSTransition] = React.useState(true)

  const container = React.useRef<HTMLDivElement>(null)

  const setActivePosition = React.useCallback(
    (opts: { top: number; height: number }) => {
      const containerTop = container.current?.getBoundingClientRect().top || 0
      setShowMarker(true)
      setActiveTop(opts.top - containerTop)
      setActiveHeight(opts.height)
    },
    [],
  )

  const hideMarker = React.useCallback(() => setShowMarker(false), [])
  const setMarkerIsMoving = React.useCallback(
    (val: boolean) => {
      localSetMarkerIsMoving(val)
      if (!val) return
      // make sure the animation does not fire "after"
      // the marker has reappeared at its right place
      setHasCSSTransition(false)
      setTimeout(() => {
        setHasCSSTransition(true)
      }, 300)
    },
    [localSetMarkerIsMoving],
  )

  return (
    <div ref={container} className="relative">
      {showMarker && !markerIsMoving && collapsible ? (
        <div
          data-cy="-menu-active-marker"
          className="absolute h-[36px] w-[4px] z-50 rounded-full bg-indigo-500 dark:bg-indigo-400 ml-[6.5px] mt-[4px]"
          style={{
            top: `${activeTop}px`,
            height: `${activeHeight - 8}px`,
            transition: hasCSSTransition
              ? 'height .3s ease-in-out, top .3s ease-in-out'
              : 'none',
          }}
        />
      ) : null}
      <MenuGroupElements
        {...rest}
        items={items}
        depth={-1}
        markerIsMoving={markerIsMoving}
        onActivePosition={setActivePosition}
        LinkComponent={LinkComponent}
        context={{
          setMarkerIsMoving,
          activePath,
          collapsible,
          hideMarker,
        }}
      />
    </div>
  )
}

export default Menu
