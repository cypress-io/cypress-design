import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { NavGroup, classes } from '@cypress-design/constants-docmenu'
import { DocLink, LinkComponentType } from './_DocLink'

export interface DocGroupProps {
  index: number
  group: NavGroup
  activePath: string
  collapsible: boolean
  onActive: (opts: { top: number; height: number }) => void
  onCollapse: (opts: { hasActive: boolean; open: boolean }) => void
  depth?: number
  setHeight?: (height: number) => void
  LinkComponent?: LinkComponentType
}

export const DocGroup: React.FC<DocGroupProps> = ({
  group,
  activePath,
  collapsible,
  depth = 0,
  setHeight,
  index,
  onActive,
  onCollapse,
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

  function toggleMenu(open: boolean) {
    if (!collapsible) return
    setOpen(open)
    onCollapse({ hasActive: true, open })
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

  const setActive = React.useCallback(
    ({ top, height }: { top: number; height: number }) => {
      if (open) {
        onActive({ top, height })
      }
    },
    [onActive, open],
  )

  return (
    <>
      <Head
        onClick={() => toggleMenu(!open)}
        href={group.href}
        className={clsx(classes.button, {
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
                activePath={activePath}
                depth={depth + 1}
                setHeight={onSetHeightCallback}
                index={index}
                collapsible={collapsible}
                onCollapse={onCollapse}
                LinkComponent={LinkComponent}
                onActive={setActive}
              />
            </li>
          ) : (
            <DocLink
              key={index}
              item={item}
              active={item.href === activePath}
              collapsible={collapsible}
              depth={depth}
              onActive={setActive}
              LinkComponent={LinkComponent}
            />
          ),
        )}
      </ul>
    </>
  )
}
