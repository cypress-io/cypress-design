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

  return (
    <div role="tablist" className={classes.wrapper} {...rest}>
      {tabs.map((tab) => {
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
            onClick={() => {
              setActiveId(tab.id)
              onChange?.(tab)
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
