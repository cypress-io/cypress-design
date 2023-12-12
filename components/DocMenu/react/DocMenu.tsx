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

const MarkerIsMovingContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [markerIsMoving, setMarkerIsMoving] = React.useState(false)

  return (
    <MarkerIsMovingContext.Provider
      value={{ markerIsMoving, setMarkerIsMoving }}
    >
      {children}
    </MarkerIsMovingContext.Provider>
  )
}

const ActiveMarker: React.FC<{
  showMarker: boolean
  collapsible: boolean
  activeTop: number
  activeHeight: number
}> = ({ showMarker, collapsible, activeTop, activeHeight }) => {
  const { markerIsMoving } = React.useContext(MarkerIsMovingContext)
  return showMarker && !markerIsMoving && collapsible ? (
    <div
      className="absolute h-[36px] w-[4px] z-50 rounded-full bg-indigo-500 transition-all duration-300 ml-[6.5px] mt-[4px]"
      style={{
        top: `${activeTop}px`,
        height: `${activeHeight - 8}px`,
      }}
    />
  ) : null
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

  return (
    <MarkerIsMovingContextProvider>
      <div ref={container} className="relative">
        <ActiveMarker
          {...{ showMarker, collapsible, activeTop, activeHeight }}
        />

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
    </MarkerIsMovingContextProvider>
  )
}

export default DocMenu
