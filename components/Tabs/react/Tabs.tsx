import * as React from 'react'
import clsx from 'clsx'
import { Tab, classes } from '../constants'

export interface TabsProps {
  tabs: Tab[]
  onChange?: (tab: Tab) => void
}

export const Tabs: React.FC<TabsProps & React.HTMLProps<HTMLDivElement>> = ({
  tabs,
  onChange,
  ...rest
}) => {
  const [activeId, setActiveId] = React.useState(
    tabs.find((tab) => tab.active)?.id
  )

  const $tab = React.useRef<HTMLButtonElement[]>([])

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

  return (
    <div role="tablist" className={classes.wrapper} {...rest}>
      {tabs.map((tab, index) => {
        return (
          <button
            role="tab"
            className={clsx([
              classes.button,
              {
                [classes.active]: tab.id === activeId,
                [classes.inActive]: tab.id !== activeId,
              },
            ])}
            ref={(el) => (el ? ($tab.current[index] = el) : null)}
            tabIndex={tab.id === activeId ? undefined : -1}
            onClick={() => {
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
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
