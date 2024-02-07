import * as React from 'react'
import clsx from 'clsx'
import { NavMenuProps } from '@cypress-design/constants-menu'

export const Menu: React.FC<NavMenuProps & React.HTMLProps<HTMLDivElement>> = ({
  items,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={clsx('bg-jade-100', className)}>
      {items.map((i) => {
        return <div>Menu item {i.label}</div>
      })}
    </div>
  )
}

export default Menu
