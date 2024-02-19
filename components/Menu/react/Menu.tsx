import * as React from 'react'
import clsx from 'clsx'
import { NavMenuItem, NavMenuGroup } from '@cypress-design/constants-menu'
import { WindiColor } from '@cypress-design/icon-registry'

interface NavMenuItemWithIcon extends NavMenuItem {
  icon: React.FC<
    {
      size?: '24'
      strokeColor?: WindiColor
      fillColor?: WindiColor
      hoverStrokeColor?: WindiColor
    } & React.SVGProps<SVGSVGElement>
  >
  iconActive: React.FC<
    React.SVGProps<SVGSVGElement> & {
      animated: boolean
    }
  >
}

const IconComputed: React.FC<{
  active: boolean
  animated: boolean
  Icon: React.FC<
    {
      size?: '24'
      strokeColor?: WindiColor
      fillColor?: WindiColor
      hoverStrokeColor?: WindiColor
    } & React.SVGProps<SVGSVGElement>
  >
  IconActive: React.FC<
    React.SVGProps<SVGSVGElement> & {
      animated: boolean
    }
  >
}> = ({ active, animated, Icon, IconActive }) => {
  return active ? (
    <IconActive
      animated={animated}
      width="24"
      height="24"
      className="icon-dark-gray-500 group-hover:icon-dark-gray-900 group-hover:icon-light-gray-500 transition-all duration-300 ease-in-out"
    />
  ) : (
    <Icon
      size="24"
      strokeColor="gray-600"
      fillColor="gray-900"
      hoverStrokeColor="gray-500"
    />
  )
}

export const Menu: React.FC<
  {
    items: (NavMenuItemWithIcon | NavMenuGroup<NavMenuItemWithIcon>)[]
    activePath?: string
  } & React.HTMLProps<HTMLUListElement>
> = ({ items, activePath, className, ...rest }) => {
  return (
    <ul className={clsx('bg-gray-1000 text-gray-500', className)} {...rest}>
      {items.map((item) => {
        return (
          <li key={item.label} className="p-4">
            {'items' in item ? (
              <>
                <span></span>
                <Menu items={item.items} />
              </>
            ) : (
              <a href={item.href} className="flex gap-4 group">
                <IconComputed
                  Icon={item.icon}
                  IconActive={item.iconActive}
                  active={item.href === activePath}
                  animated={true}
                />
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
