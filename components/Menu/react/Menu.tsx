import * as React from 'react'
import clsx from 'clsx'
import type { NavMenuItem, NavMenuGroup } from '@cypress-design/constants-menu'
import { WindiColor } from '@cypress-design/icon-registry'

type NavMenuItemIcon = React.FC<
  {
    size?: '24'
    strokeColor?: WindiColor
    fillColor?: WindiColor
    secondaryFillColor?: WindiColor
    hoverStrokeColor?: WindiColor
    interactiveColorsOnGroup?: boolean
  } & React.SVGProps<SVGSVGElement>
>

type NavMenuItemIconActive = React.FC<
  React.SVGProps<SVGSVGElement> & {
    animated: boolean
  }
>

interface NavMenuItemWithIcon extends NavMenuItem {
  icon?: NavMenuItemIcon
  iconActive?: NavMenuItemIconActive
}

const IconComputed: React.FC<{
  active?: boolean
  animated?: boolean
  Icon: NavMenuItemIcon
  IconActive: NavMenuItemIconActive
}> = ({ active, animated, Icon, IconActive }) => {
  return active ? (
    <IconActive
      animated={!!animated}
      width="24"
      height="24"
      className="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
    />
  ) : (
    <Icon
      size="24"
      strokeColor="gray-600"
      fillColor="gray-900"
      secondaryFillColor="gray-900"
      hoverStrokeColor="gray-400"
      interactiveColorsOnGroup
    />
  )
}

const MenuItem = ({
  href,
  icon,
  iconActive,
  active,
  label,
}: {
  href?: string
  icon?: NavMenuItemIcon
  iconActive?: NavMenuItemIconActive
  active: boolean
  label: string
}) => {
  const [animated, setAnimated] = React.useState(active)
  React.useEffect(() => {
    if (!active) {
      setAnimated(false)
    }
  }, [active])
  return (
    <a
      href={href}
      className={clsx('flex items-center gap-4 group ', {
        'text-gray-500': !active,
        'text-indigo-300': active,
        'p-2 px-7 mx-7 border-l border-gray-800': !icon || !iconActive,
        'p-4': icon && iconActive,
      })}
      onMouseUp={(e) => {
        e.preventDefault()
        setAnimated(true)
      }}
    >
      {icon && iconActive ? (
        <IconComputed
          Icon={icon}
          IconActive={iconActive}
          active={active}
          animated={animated}
        />
      ) : null}
      {label}
    </a>
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
        const active = item.href !== undefined && item.href === activePath
        return (
          <li key={item.label}>
            {'items' in item ? (
              <>
                <MenuItem {...item} active={active} />
                <Menu items={item.items} activePath={activePath} />
              </>
            ) : (
              <MenuItem {...item} active={active} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
