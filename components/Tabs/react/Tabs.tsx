import * as React from 'react'
import clsx from 'clsx'
import {
  Tab,
  overflowContainerClass,
  variants,
} from '@cypress-design/constants-tabs'

export interface TabsProps {
  /**
   * The tabs to display
   */
  tabs: Tab[]
  /**
   * Appearance of tabs
   */
  variant?: keyof typeof variants
  /**
   * Callback when tab is changed
   * @param tab new tab selected
   */
  onSwitch?: (tab: Tab) => void
}

export const Tabs: React.FC<TabsProps & React.HTMLProps<HTMLDivElement>> = ({
  tabs,
  onSwitch,
  variant = 'default',
  ...rest
}) => {
  const [mounted, setMounted] = React.useState(false)
  const [activeId, setActiveId] = React.useState(
    tabs.find((tab) => tab.active)?.id
  )

  const $tab = React.useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([])
  const $overflowContainer = React.useRef<HTMLDivElement>(null)

  const [activeMarkerStyle, setActiveMarkerStyle] = React.useState<{
    left?: string
    width?: string
    transitionProperty?: string
  }>({})

  function getActiveTabEl() {
    const activeTab = tabs.findIndex((tab) => tab.id === activeId)
    if (activeTab > -1) {
      const activeTabEl = $tab.current?.[activeTab]
      if (activeTabEl) {
        return activeTabEl
      }
    }
    return null
  }

  React.useEffect(() => {
    const activeTabEl = getActiveTabEl()
    if (activeTabEl) {
      setActiveMarkerStyle({
        left: `${activeTabEl.offsetLeft}px`,
        width: `${activeTabEl.offsetWidth}px`,
        transitionProperty: 'left, width',
      })
    }
    setMounted(true)
  }, [activeId])

  React.useEffect(() => {
    const activeTabEl = getActiveTabEl()
    if ($overflowContainer.current && activeTabEl) {
      // Scroll to active tab if it is not visible
      const leftBoundary =
        $overflowContainer.current.offsetWidth / 2 - activeTabEl.offsetWidth / 2

      if (activeTabEl.offsetLeft > leftBoundary) {
        $overflowContainer.current.scrollTo({
          left: activeTabEl.offsetLeft - leftBoundary,
        })
      }
    }
  }, [])

  function navigate(shift: number) {
    const shiftedIndex = tabs.findIndex((tab) => tab.id === activeId) + shift
    const nextIndex =
      shiftedIndex < 0
        ? tabs.length - 1
        : shiftedIndex >= tabs.length
        ? 0
        : shiftedIndex
    setActiveId(tabs[nextIndex].id)
    $tab.current?.[nextIndex]?.focus()
    onSwitch?.(tabs[nextIndex])
  }

  const classes =
    variant in variants ? variants[variant].classes : variants.default.classes

  const iconProps =
    variant in variants ? variants[variant].icon : variants.default.icon

  return (
    <div ref={$overflowContainer} className={overflowContainerClass}>
      <div role="tablist" className={classes.wrapper} {...rest}>
        {tabs.map((tab, index) => {
          const ButtonTag = tab.href ? 'a' : 'button'
          return (
            <ButtonTag
              key={tab.id}
              role="tab"
              href={tab.href}
              className={clsx([
                classes.button,
                {
                  [classes.activeStatic]: tab.id === activeId && !mounted,
                  [classes.active]: tab.id === activeId,
                  [classes.inActive]: tab.id !== activeId,
                },
              ])}
              // @ts-expect-error React is incapable of typing this kind of ref so we do not add a type
              ref={(el) => (el ? ($tab.current[index] = el) : null)}
              tabIndex={tab.id === activeId ? undefined : -1}
              aria-selected={tab.id === activeId ? true : undefined}
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey) return
                e.preventDefault()
                setActiveId(tab.id)
                onSwitch?.(tab)
              }}
              onKeyUp={(e) => {
                if (e.key === 'ArrowRight') {
                  navigate(1)
                } else if (e.key === 'ArrowLeft') {
                  navigate(-1)
                }
              }}
            >
              <>
                {(() => {
                  const IconBefore = tab.iconBefore ?? tab.icon
                  return IconBefore ? (
                    <IconBefore {...iconProps} className="mr-[8px]" />
                  ) : null
                })()}
                {tab.label}
                {tab.tag ? <div className={classes.tag}>{tab.tag}</div> : null}
                {tab.iconAfter ? (
                  <tab.iconAfter {...iconProps} className="ml-[8px]" />
                ) : null}
              </>
              {tab.id === activeId && !activeMarkerStyle.left ? (
                <div className={classes.activeMarkerStatic} />
              ) : null}
            </ButtonTag>
          )
        })}
        <div
          key="active-marker"
          className={clsx(classes.activeMarker, classes.activeMarkerColor)}
          style={activeMarkerStyle}
        />
        <div
          key="active-marker-blend"
          className={clsx(classes.activeMarker, classes.activeMarkerBlender)}
          style={activeMarkerStyle}
        />
      </div>
    </div>
  )
}

export default Tabs
