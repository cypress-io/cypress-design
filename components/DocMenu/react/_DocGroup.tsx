import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { NavGroup, classes } from '../constants'
import { DocLink } from './_DocLink'

export interface DocGroupProps {
  group: NavGroup
  depth?: number
}

export const DocGroup: React.FC<DocGroupProps> = ({ group, depth = 0 }) => {
  const [open, setOpen] = React.useState(depth === 0)

  function calculateTop(): number {
    const activeIndex = group.items.findIndex(
      (item) => 'href' in item && item.active
    )

    // how many groups are before the active element?
    let numberOfGroups = group.items.filter(
      (item, index) => !('href' in item) && index < activeIndex
    ).length

    // if there is any open group before the active element
    // compensate for the height
    const groupHeight = $groups.value?.reduce((acc, group) => {
      if (numberOfGroups < -1) return acc
      numberOfGroups--
      return acc + group.height
    }, 0)
    return (activeIndex + groupHeight) * 44 + 48
  }

  const top = 0 // calculateTop()

  return (
    <>
      {group.text ? (
        <button
          onClick={() => setOpen(!open)}
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
        {group.items.map((item) =>
          'href' in item ? (
            <DocLink item={item} depth={depth} />
          ) : (
            <li className="relative">
              <DocGroup group={item} depth={depth + 1} />
            </li>
          )
        )}
      </ul>
    </>
  )
}
