import * as React from 'react'
import clsx from 'clsx'
import { Tab, variants, throttle } from '@cypress-design/constants-tabs'

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
  activeId: activeIdProp,
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
  }, [activeIdProp])

  const $tab = React.useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([])

  const [activeMarkerStyle, setActiveMarkerStyle] = React.useState<{
    left?: string
    width?: string
    transitionProperty?: string
  }>({})

  function updateActiveMarkerStyle() {
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
  }

  React.useEffect(() => {
    updateActiveMarkerStyle()
  }, [activeId])

  const throttledUpdateActiveMarkerStyle = throttle(
    updateActiveMarkerStyle,
    100,
  )

  React.useEffect(() => {
    window.addEventListener('resize', throttledUpdateActiveMarkerStyle)
    return () =>
      window.removeEventListener('resize', throttledUpdateActiveMarkerStyle)
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
    <div role="tablist" className={classes.wrapper} {...rest}>
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
          ...dataAttr
        } = tab
        return (
          <ButtonTag
            key={id}
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
            // @ts-expect-error React is incapable of typing this kind of ref so we do not add a type
            ref={(el) => (el ? ($tab.current[index] = el) : null)}
            tabIndex={id === activeId ? undefined : -1}
            aria-selected={id === activeId ? true : undefined}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey) return
              e.preventDefault()
              setActiveId(id)
              onSwitch?.(tab)
            }}
            onKeyUp={(e) => {
              if (e.key === 'ArrowRight') {
                navigate(1)
              } else if (e.key === 'ArrowLeft') {
                navigate(-1)
              }
            }}
            {...dataAttr}
          >
            <>
              {(() => {
                const IconBefore = iconBefore ?? icon
                return IconBefore ? (
                  <IconBefore {...iconProps} className="mr-[8px]" />
                ) : null
              })()}
              {label}
              {tag ? <div className={classes.tag}>{tag}</div> : null}
              {IconAfter ? (
                <IconAfter {...iconProps} className="ml-[8px]" />
              ) : null}
            </>
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
