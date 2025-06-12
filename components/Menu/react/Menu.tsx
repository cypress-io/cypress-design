import * as React from 'react'
import clsx from 'clsx'
import type {
  NavMenuItem,
  NavMenuGroup,
  DataAttributes,
} from '@cypress-design/constants-menu'
import { WindiColor } from '@cypress-design/icon-registry'

interface NavMenuGroupWithExtras extends NavMenuGroup<NavMenuItemWithIcon> {
  submenuClassName?: string
}

interface NavMenuProps {
  items: (NavMenuGroupWithExtras | NavMenuItemWithIcon)[]
  activePath?: string
}

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
  anchorAttributes?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | DataAttributes
}

const IconComputed: React.FC<{
  active?: boolean
  animated?: boolean
  Icon: NavMenuItemIcon
  IconActive: NavMenuItemIconActive
  interactiveColorsOnGroup?: boolean
}> = ({
  active,
  animated,
  Icon,
  IconActive,
  interactiveColorsOnGroup = true,
}) => {
  return (
    <span className="relative inline-flex w-[24px] h-[24px] shrink-0 items-center justify-center align-middle">
      <Icon
        size="24"
        strokeColor="gray-600"
        fillColor="gray-900"
        secondaryFillColor="gray-900"
        hoverStrokeColor="gray-400"
        interactiveColorsOnGroup={interactiveColorsOnGroup}
        className={clsx(
          'absolute inset-0 transition-opacity',
          active ? 'opacity-0' : 'opacity-100',
        )}
      />
      <IconActive
        animated={!!animated}
        width="24"
        height="24"
        className={clsx(
          'absolute inset-0 transition-opacity',
          active ? 'opacity-100' : 'opacity-0',
          'icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400',
        )}
      />
    </span>
  )
}

const MenuItem = ({
  href,
  icon,
  iconActive,
  active,
  label,
  anchorClassName,
  labelClassName,
  interactiveColorsOnGroup,
  anchorAttributes = {},
}: NavMenuItemWithIcon & {
  active: boolean
}) => {
  const [animated, setAnimated] = React.useState(active)
  const [transientActive, setTransientActive] = React.useState(false)
  const visuallyActive = active || transientActive
  React.useEffect(() => {
    if (!active) {
      setAnimated(false)
    }
  }, [active])
  return (
    <a
      href={href}
      {...anchorAttributes}
      className={clsx('flex items-center gap-4', {
        group: interactiveColorsOnGroup,
        'text-gray-500': !visuallyActive,
        'text-indigo-300': visuallyActive,
        'p-2 px-7 mx-7 border-l border-gray-800': !icon || !iconActive,
        'p-4': icon && iconActive,
        [`${anchorClassName}`]: anchorClassName,
      })}
      onMouseDown={(e) => {
        e.preventDefault()
        setTransientActive(true)
      }}
      onMouseUp={(e) => {
        e.preventDefault()
        setAnimated(true)
        setTransientActive(false)
      }}
      onMouseLeave={() => {
        setTransientActive(false)
      }}
    >
      {icon && iconActive ? (
        <IconComputed
          Icon={icon}
          IconActive={iconActive}
          active={visuallyActive}
          animated={animated}
          interactiveColorsOnGroup={interactiveColorsOnGroup}
        />
      ) : null}
      {label && (
        <span
          className={
            clsx({
              [`${labelClassName}`]: labelClassName,
            }) || undefined
          }
        >
          {label}
        </span>
      )}
    </a>
  )
}

export const Menu: React.FC<
  NavMenuProps & React.HTMLProps<HTMLUListElement>
> = ({ items, activePath, className, ...rest }) => {
  return (
    <ul className={clsx('bg-gray-1000 text-gray-500', className)} {...rest}>
      {items.map((item) => {
        const active = item.href !== undefined && item.href === activePath
        return (
          <li
            key={item.key || item.label}
            className={clsx(item.className, { active }) || undefined}
          >
            {'items' in item ? (
              <>
                <MenuItem {...item} active={active} />
                <Menu
                  items={item.items}
                  className={item.submenuClassName}
                  activePath={activePath}
                />
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
