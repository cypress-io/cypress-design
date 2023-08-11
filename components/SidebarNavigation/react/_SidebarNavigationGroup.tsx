import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { SidebarNavigationLink } from './_SidebarNavigationLink'

// Some of the types in this file should instead be imported like this:
// import { NavGroup, classes } from '@cypress-design/constants-SidebarNavigation'

export interface NavItemBase {
  text: string
  href?: string
  active?: boolean
}

export interface NavItemLink extends NavItemBase {
  href: string
}

export interface NavGroup extends NavItemBase {
  items: (NavItemLink | NavGroup)[]
}

export const classes = {
  button: 'flex leading-[24px] py-[10px] items-center relative w-full',
  topButton: 'leading-[24px] text-[16px] pl-[24px] font-medium',
  leafButton: 'leading-[20px] text-[14px] pl-[40px]',
} as const

export interface SidebarNavigationGroupProps {
  group: NavGroup
  collapsible: boolean
  depth?: number
  setHeight?: (height: number) => void
}

export const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({
  group,
  collapsible,
  depth = 0,
  setHeight,
}) => {
  const [open, setOpen] = React.useState(depth === 0)
  const [itemsHeights, setItemsHeights] = React.useState<number[]>(
    Array(group.items.length).fill(1),
  )

  React.useEffect(() => {
    setHeight?.(open ? itemsHeights.reduce((a, b) => a + b, 1) : 1)
  }, [itemsHeights, open])

  const [activeTop, setActiveTop] = React.useState(0)

  React.useEffect(() => {
    const activeItem = group.items.findIndex(
      (item) => 'href' in item && item.active,
    )
    if (activeItem >= 0) {
      setActiveTop(
        itemsHeights.slice(0, activeItem).reduce((a, b) => a + b, 1) * 44,
      )
    }
  }, [itemsHeights])

  function toggleMenu(open: boolean) {
    if (!collapsible) return
    setOpen(open)
  }

  function onSetHeight(index: number, height: number) {
    setItemsHeights((prev) => {
      const newHeights = [...prev]
      newHeights[index] = height
      return newHeights
    })
  }

  const Head = collapsible ? 'button' : group.href ? 'a' : 'div'

  return (
    <>
      <Head
        onClick={() => toggleMenu(!open)}
        href={group.href}
        className={clsx(classes.button, {
          'text-indigo-500': group.active,
          [classes.topButton]: depth === 0,
          [classes.leafButton]: depth,
        })}
      >
        {collapsible ? (
          <IconChevronDownSmall
            stroke-color="gray-400"
            size={depth ? '8' : '16'}
            className={clsx('absolute transform transition-transform left-0', {
              'rotate-0': open,
              '-rotate-90': !open,
              'ml-[16px]': depth,
            })}
          />
        ) : null}
        {group.text}
      </Head>
      {collapsible &&
      depth >= 0 &&
      open &&
      group.items.some((item) => 'href' in item && item.active) ? (
        <div
          className="absolute h-[36px] w-[4px] z-10 rounded-full bg-indigo-500 transition-all duration-300 ml-[6px] mt-[4px]"
          style={{
            top: `${activeTop}px`,
            left: `${depth === 0 ? 0.5 : -(depth * 8) - 0.5}px`,
          }}
        />
      ) : null}
      <ul
        className={clsx('ml-[8px] list-none p-0', {
          'border-l border-gray-100': depth === 0 && collapsible,
          hidden: !open,
        })}
      >
        {group.items.map((item, index) =>
          'items' in item ? (
            <li key={index} className="relative list-none p-0">
              <SidebarNavigationGroup
                group={item}
                depth={depth + 1}
                setHeight={(height) => onSetHeight(index, height)}
                collapsible={collapsible}
              />
            </li>
          ) : (
            <SidebarNavigationLink
              key={index}
              item={item}
              collapsible={collapsible}
              depth={depth}
              onActive={(top) => setActiveTop(top)}
            />
          ),
        )}
      </ul>
    </>
  )
}
