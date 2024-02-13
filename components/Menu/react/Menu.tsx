import * as React from 'react'
import clsx from 'clsx'
import { NavMenuItem, NavMenuGroup } from '@cypress-design/constants-menu'
import { WindiColor } from '@cypress-design/icon-registry'

interface NavMenuItemWithIcon extends NavMenuItem {
  icon: React.FC<
    {
      size?: '16' | '24'
      strokeColor?: WindiColor
      fillColor?: WindiColor
      hoverStrokeColor?: WindiColor
    } & React.SVGProps<SVGSVGElement>
  >
  iconActive: React.FC<
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
        const IconActive = 'iconActive' in item ? item.iconActive : null
        return (
          <li key={item.label} className="p-4">
            {'items' in item ? (
              <>
                <span>
                  {IconActive ? (
                    <IconActive isActive width="24" height="24" />
                  ) : null}
                  {item.label}
                </span>
                <Menu items={item.items} />
              </>
            ) : (
              <a href={item.href} className="flex gap-4 group">
                {Icon && IconActive
                  ? (
                      <Icon
                        size="24"
                        strokeColor="gray-600"
                        fillColor="gray-900"
                        hoverStrokeColor="gray-500"
                      />
                    ) ?? (
                      <IconActive
                        isActive={false}
                        width="24"
                        height="24"
                        className="icon-dark-gray-500 group-hover:icon-dark-gray-900 group-hover:icon-light-gray-500 transition-all duration-300 ease-in-out"
                      />
                    )
                  : null}
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
