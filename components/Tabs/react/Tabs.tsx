import * as React from 'react'
import clsx from 'clsx'
import { Tab, classesMap } from '@cypress-design/constants-tabs'

export interface TabsProps {
  tabs: Tab[]
  type?: keyof typeof classesMap
  onChange?: (tab: Tab) => void
}

export const Tabs: React.FC<TabsProps & React.HTMLProps<HTMLDivElement>> = ({
  tabs,
  onChange,
  type = 'default',
  ...rest
}) => {
  const [mounted, setMounted] = React.useState(false)
  const [activeId, setActiveId] = React.useState(
    tabs.find((tab) => tab.active)?.id
  )

  const $tab = React.useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([])

  const [activeMarkerStyle, setActiveMarkerStyle] = React.useState<{
    left?: string
    width?: string
    transitionProperty?: string
  }>({})

  React.useEffect(() => {
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
  }, [activeId])

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
    onChange?.(tabs[nextIndex])
  }

  const classes = type in classesMap ? classesMap[type] : classesMap.default

  return (
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
            ref={(el: any) => (el ? ($tab.current[index] = el) : null)}
            tabIndex={tab.id === activeId ? undefined : -1}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey) return
              e.preventDefault()
              setActiveId(tab.id)
              onChange?.(tab)
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
              {() => {
                const IconBefore = tab.iconBefore ?? tab.icon
                return IconBefore ? (
                  <IconBefore
                    className="mr-[8px]"
                    size={type !== 'underline-large' ? '24' : '16'}
                  />
                ) : null
              }}
              {tab.label}
              {tab.tag ? <div className={classes.tag}>{tab.tag}</div> : null}
              {tab.iconAfter ? (
                <tab.iconAfter
                  className="ml-[8px]"
                  size={type !== 'underline-large' ? '24' : '16'}
                />
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
  )
}

export default Tabs
