import * as React from 'react'
import clsx from 'clsx'
import { NavMenuItem, NavMenuGroup } from '@cypress-design/constants-menu'

interface NavMenuItemWithIcon extends NavMenuItem {
  icon?: React.FC<
    React.SVGProps<SVGSVGElement> & {
      isActive: boolean
    }
  >
}

export const Menu: React.FC<
  {
    items: (NavMenuItemWithIcon | NavMenuGroup<NavMenuItemWithIcon>)[]
  } & React.HTMLProps<HTMLUListElement>
> = ({ items, className, ...rest }) => {
  return (
    <ul className={clsx('bg-gray-1000 text-gray-500', className)} {...rest}>
      {items.map((item) => {
        const Icon = 'icon' in item ? item.icon : null
        return (
          <li key={item.label} className="p-2">
            {'items' in item ? (
              <>
                <span>
                  {Icon ? <Icon isActive width="24" height="24" /> : null}
                  {item.label}
                </span>
                <Menu items={item.items} />
              </>
            ) : (
              <a href={item.href} className="flex gap-2">
                {Icon ? <Icon isActive width="24" height="24" /> : null}
                {item.label}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
