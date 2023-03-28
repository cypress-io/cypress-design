import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { NavGroup, classes } from '../constants'
import { DocLink } from './_DocLink'

export interface DocGroupProps {
  group: NavGroup
  depth?: number
  onToggle?: (open: boolean) => void
}

export const DocGroup: React.FC<DocGroupProps> = ({
  group,
  depth = 0,
  onToggle,
}) => {
  const [open, setOpen] = React.useState(depth === 0)

  const [openSubGroups, setOpenSubGroups] = React.useState<boolean[]>(
    Array().fill(false)
  )

  function setOpenGroup(index: number, open: boolean) {
    setOpenSubGroups((prev) => {
      const next = [...prev]
      next[index] = open
      return next
    })
  }

  function calculateTop(): number {
    const activeIndex = group.items.findIndex(
      (item) => 'href' in item && item.active
    )

    // if there is any open group before the active element
    // compensate for the height
    const groupHeight = group.items.reduce((acc, group, index) => {
      if (index >= activeIndex) return acc
      if ('items' in group && openSubGroups[index]) {
        return acc + group.items.length
      }
      return acc
    }, 0)

    // number of items before active element + compensation for open groups
    return (activeIndex + groupHeight) * 44
  }

  const top = calculateTop()

  function toggleMenu(open: boolean) {
    setOpen(open)
    onToggle?.(open)
  }

  return (
    <>
      {group.text ? (
        <button
          onClick={() => toggleMenu(!open)}
          className={clsx(classes.button, {
            [classes.topButton]: depth === 0,
            [classes.leafButton]: depth,
          })}
        >
          <IconChevronDownSmall
            stroke-color="gray-400"
            size={depth ? '8' : '16'}
            className={clsx('absolute transform transition-transform left-0', {
              'rotate-0': open,
              '-rotate-90': !open,
              'ml-[16px]': depth,
            })}
          />
          {group.text}
        </button>
      ) : null}
      {depth >= 0 &&
      open &&
      group.items.some((item) => 'href' in item && item.active) ? (
        <div
          className="absolute h-[36px] w-[4px] z-10 rounded-full bg-indigo-500 transition-all duration-300 ml-[6px] mt-[48px]"
          style={{
            top: `${top}px`,
            left: `-${depth === 0 ? 0 : depth * 7.5 + 1}px`,
          }}
        />
      ) : null}
      <ul
        className={clsx('ml-[7px]', {
          'border-l border-gray-100': depth === 0,
          hidden: !open,
        })}
      >
        {group.items.map((item, index) =>
          'href' in item ? (
            <DocLink item={item} depth={depth} />
          ) : (
            <li className="relative">
              <DocGroup
                group={item}
                depth={depth + 1}
                onToggle={(open) => setOpenGroup(index, open)}
              />
            </li>
          )
        )}
      </ul>
    </>
  )
}
