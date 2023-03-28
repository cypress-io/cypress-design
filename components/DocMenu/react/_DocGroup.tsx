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

  const [top, setTop] = React.useState(0)

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
          className="absolute h-[36px] w-[4px] z-10 rounded-full bg-indigo-500 transition-all duration-300 ml-[6px] mt-[4px]"
          style={{
            top: `${top}px`,
            left: `${depth === 0 ? 0.5 : -(depth * 8) - 0.5}px`,
          }}
        />
      ) : null}
      <ul
        className={clsx('ml-[8px]', {
          'border-l border-gray-100': depth === 0,
          hidden: !open,
        })}
      >
        {group.items.map((item, index) =>
          'href' in item ? (
            <DocLink key={index} item={item} depth={depth} />
          ) : (
            <li key={index} className="relative">
              <DocGroup group={item} depth={depth + 1} />
            </li>
          )
        )}
      </ul>
    </>
  )
}
