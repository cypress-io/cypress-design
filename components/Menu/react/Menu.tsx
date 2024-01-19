import * as React from 'react'
import clsx from 'clsx'
import { SharedSettings } from '@cypress-design/constants-menu'

export interface MenuProps {
  id: string
  label?: string
  className?: string
}

export const Menu: React.FC<MenuProps & React.HTMLProps<HTMLDivElement>> = ({
  id,
  label,
  className,
  ...rest
}) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for Menu
      <p>{SharedSettings.foo}</p>
    </div>
  )
}

export default Menu
