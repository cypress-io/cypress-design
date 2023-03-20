import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { NavGroup, classes } from '../constants'
import { DocLink } from './DocLink'

export interface DocGroupProps {
  group: NavGroup
  depth?: number
}

export const DocGroup: React.FC<DocGroupProps> = ({ group, depth = 0 }) => {
  const [open, setOpen] = React.useState(depth === 0)
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
            <li>
              <DocGroup group={item} depth={depth + 1} />
            </li>
          )
        )}
      </ul>
    </>
  )
}
