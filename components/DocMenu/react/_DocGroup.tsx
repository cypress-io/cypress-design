import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { NavGroup, classes } from '@cypress-design/constants-docmenu'
import { DocLink, LinkComponentType } from './_DocLink'

export interface DocGroupProps {
  index: number
  group: NavGroup
  collapsible: boolean
  depth?: number
  setHeight?: (height: number) => void
  LinkComponent?: LinkComponentType
}

export const DocGroup: React.FC<DocGroupProps> = ({
  group,
  collapsible,
  depth = 0,
  setHeight,
  index,
  LinkComponent = 'a',
}) => {
  const [open, setOpen] = React.useState(depth === 0)
  const [itemsHeights, setItemsHeights] = React.useState<number[]>(
    Array(group.items.length).fill(1),
  )

  React.useEffect(() => {
    // if this group contains other groups, ignore this effect
    // it will be triggered by a leaf and trickle up
    if (group.items.some((item) => 'items' in item)) {
      return
    }

    const newHeight = open ? itemsHeights.reduce((a, b) => a + b, 1) : 1

    setHeight?.(newHeight)
  }, [itemsHeights, open, setHeight, group.items, group.label])

  const [activeTop, setActiveTop] = React.useState<number | undefined>(
    undefined,
  )

  const [activeHeight, setActiveHeight] = React.useState<number | undefined>(36)

  React.useEffect(() => {
    const activeItemIndex = group.items.findIndex(
      (item) => 'href' in item && item.active,
    )

    setActiveTop(
      activeItemIndex >= 0
        ? itemsHeights.slice(0, activeItemIndex).reduce((a, b) => a + b, 44)
        : undefined,
    )
  }, [itemsHeights, group.items])

  function toggleMenu(open: boolean) {
    if (!collapsible) return
    setOpen(open)
  }

  const onSetHeightCallback = React.useCallback(
    (height: number) => {
      setItemsHeights((prev) => {
        const newHeights = [...prev]
        newHeights[index] = height
        return newHeights
      })
    },
    [setItemsHeights, index],
  )

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
        {group.label}
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
            height: `${activeHeight}px`,
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
              <DocGroup
                group={item}
                depth={depth + 1}
                setHeight={onSetHeightCallback}
                index={index}
                collapsible={collapsible}
                LinkComponent={LinkComponent}
              />
            </li>
          ) : (
            <DocLink
              key={index}
              item={item}
              collapsible={collapsible}
              depth={depth}
              onActive={({ top, height }) => {
                setActiveTop(top)
                setActiveHeight(height)
              }}
              LinkComponent={LinkComponent}
            />
          ),
        )}
      </ul>
    </>
  )
}
