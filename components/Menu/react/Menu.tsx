import * as React from 'react'
import clsx from 'clsx'
import { NavMenuItem, NavMenuGroup } from '@cypress-design/constants-menu'

interface NavMenuItemWithIcon extends NavMenuItem {
  icon?: React.ReactNode
}

export const Menu: React.FC<
  {
    items: (NavMenuItemWithIcon | NavMenuGroup<NavMenuItemWithIcon>)[]
  } & React.HTMLProps<HTMLUListElement>
> = ({ items, className, ...rest }) => {
  return (
    <ul className={clsx('bg-jade-100', className)} {...rest}>
      {items.map((item) => (
        <li key={item.label} className="p-2">
          {'items' in item ? (
            <>
              <span>{item.label}</span>
              <Menu items={item.items} />
            </>
          ) : (
            <a href={item.href}>{item.label}</a>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Menu
