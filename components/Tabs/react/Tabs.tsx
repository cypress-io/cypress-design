import * as React from 'react'
import clsx from 'clsx'
import {
  Tab,
  CssVariants,
  throttle,
  SwitchEvent,
} from '@cypress-design/constants-tabs'

export interface TabsProps {
  /**
   * The tabs to display
   */
  tabs: Tab[]
  /**
   * The id of the active tab
   */
  activeId?: string
  /**
   * Appearance of tabs
   */
  variant?: keyof typeof CssVariants
  /**
   * Callback when tab is changed
   * use e.preventDefault() to prevent tab change
   * @param tab new tab selected
   */
  onSwitch?: (tab: Tab, evt: SwitchEvent) => void

  /**
   * render a tab with a custom function
   */
  renderTab?: (tab: Tab) => React.ReactNode
}

export const Tabs: React.FC<TabsProps & React.HTMLProps<HTMLDivElement>> = ({
  tabs,
  onSwitch,
  variant = 'default',
  activeId: activeIdProp,
  renderTab,
  className,
  ...rest
}) => {
  const [mounted, setMounted] = React.useState(false)
  const [activeId, setActiveId] = React.useState(
    activeIdProp || tabs.find((tab) => tab.active)?.id,
  )

  React.useEffect(() => {
    if (mounted && activeIdProp) {
      setActiveId(activeIdProp)
    }
  }, [activeIdProp, mounted])

  const $tab = React.useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([])

  const [activeMarkerStyle, setActiveMarkerStyle] = React.useState<{
    left?: string
    width?: string
    transitionProperty?: string
  }>({})

  const updateActiveMarkerStyle = React.useCallback(() => {
    const activeTab = tabs.findIndex((tab) => tab.id === activeId)
    if (activeTab > -1) {
      const activeTabEl = $tab.current?.[activeTab]
      if (activeTabEl) {
        setActiveMarkerStyle({
          left: `${activeTabEl.offsetLeft}px`,
          width: `${activeTabEl.offsetWidth}px`,
          transitionProperty: 'left, width',
        })
      }
    }
    setMounted(true)
  }, [activeId, tabs])

  React.useEffect(() => {
    updateActiveMarkerStyle()
  }, [activeId, updateActiveMarkerStyle])

  const throttledUpdateActiveMarkerStyle = React.useMemo(() => {
    return throttle(updateActiveMarkerStyle, 100)
  }, [updateActiveMarkerStyle])

  React.useEffect(() => {
    window.addEventListener('resize', throttledUpdateActiveMarkerStyle)
    return () =>
      window.removeEventListener('resize', throttledUpdateActiveMarkerStyle)
  }, [throttledUpdateActiveMarkerStyle])

  function navigate(shift: number) {
    const shiftedIndex = tabs.findIndex((tab) => tab.id === activeId) + shift
    const nextIndex =
      shiftedIndex < 0
        ? tabs.length - 1
        : shiftedIndex >= tabs.length
          ? 0
          : shiftedIndex
    const switchEvent = new SwitchEvent()
    if (onSwitch !== undefined) {
      onSwitch(tabs[nextIndex], switchEvent)
      if (switchEvent.defaultPrevented) return
    }
    setActiveId(tabs[nextIndex].id)
    $tab.current?.[nextIndex]?.focus()
  }

  const classes =
    variant in CssVariants
      ? CssVariants[variant].classes
      : CssVariants.default.classes

  const iconProps =
    variant in CssVariants
      ? CssVariants[variant].icon
      : CssVariants.default.icon

  return (
    <div role="tablist" className={clsx(classes.wrapper, className)} {...rest}>
      {'subWrapper' in classes ? <div className={classes.subWrapper} /> : null}
      {tabs.map((tab, index) => {
        const ButtonTag = tab.href ? 'a' : 'button'
        const {
          id,
          href,
          icon,
          iconBefore,
          iconAfter: IconAfter,
          label,
          tag,
          ...rest
        } = tab
        return (
          <ButtonTag
            key={id}
            id={id}
            role="tab"
            href={href}
            className={clsx([
              classes.button,
              {
                [classes.activeStatic]: id === activeId && !mounted,
                [classes.active]: id === activeId,
                [classes.inActive]: id !== activeId,
              },
            ])}
            ref={(el: HTMLButtonElement | HTMLAnchorElement | null) =>
              el ? ($tab.current[index] = el) : null
            }
            tabIndex={id === activeId ? undefined : -1}
            aria-selected={id === activeId ? true : false}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey) return
              e.preventDefault()
              const switchEvent = new SwitchEvent()
              if (onSwitch !== undefined) {
                onSwitch(tab, switchEvent)
                if (switchEvent.defaultPrevented) return
              }
              setActiveId(id)
            }}
            onKeyUp={(e) => {
              if (e.key === 'ArrowRight') {
                navigate(1)
              } else if (e.key === 'ArrowLeft') {
                navigate(-1)
              }
            }}
            {...rest}
          >
            {renderTab ? (
              renderTab(tab)
            ) : (
              <>
                {(() => {
                  const IconBefore = iconBefore ?? icon
                  return IconBefore ? (
                    <IconBefore {...iconProps} className="mr-[8px]" />
                  ) : null
                })()}
                {label}
                {tag ? (
                  <div
                    className={
                      id === activeId && classes.tagActive.length
                        ? classes.tagActive
                        : classes.tag
                    }
                  >
                    {tag}
                  </div>
                ) : null}
                {IconAfter ? (
                  <IconAfter {...iconProps} className="ml-[8px]" />
                ) : null}
              </>
            )}
            {id === activeId && !activeMarkerStyle.left ? (
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
  )
}

export default Tabs
