import * as React from 'react'
import { NavGroup, NavItemLink } from '@cypress-design/constants-docmenu'
import type { LinkComponentType } from './_DocLink'
import { DocGroupElements } from './_DocGroup'
import { MarkerIsMovingContext } from './markerIsMoving'

export type NavItem = NavGroup | NavItemLink

export interface DocMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: NavItem[]
  activePath?: string
  collapsible?: boolean
  LinkComponent?: LinkComponentType
}

export const DocMenu: React.FC<DocMenuProps> = ({
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

  const setShowMarkerFalse = React.useCallback(() => setShowMarker(false), [])
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
    <MarkerIsMovingContext.Provider
      value={{ markerIsMoving, setMarkerIsMoving }}
    >
      <div ref={container} className="relative">
        {showMarker && !markerIsMoving && collapsible ? (
          <div
            className="absolute h-[36px] w-[4px] z-50 rounded-full bg-indigo-500 ml-[6.5px] mt-[4px]"
            style={{
              top: `${activeTop}px`,
              height: `${activeHeight - 8}px`,
              transition: hasCSSTransition
                ? 'height .3s ease-in-out, top .3s ease-in-out'
                : 'none',
            }}
          />
        ) : null}
        <DocGroupElements
          {...rest}
          items={items}
          activePath={activePath}
          collapsible={collapsible}
          depth={-1}
          onActivePosition={setActivePosition}
          LinkComponent={LinkComponent}
          hideMarker={setShowMarkerFalse}
        />
      </div>
    </MarkerIsMovingContext.Provider>
  )
}

export default DocMenu
