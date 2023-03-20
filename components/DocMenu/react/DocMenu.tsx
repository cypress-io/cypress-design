import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import { NavGroup, classes, NavItemLink } from '../constants'
import { DocLink } from './DocLink'
import { DocGroup } from './DocGroup'

export interface DocMenuProps {
  items: (NavGroup | NavItemLink)[]
  depth?: number
}

export const DocMenu: React.FC<DocMenuProps> = ({ items }) => {
  return (
    <ul className="pl-[16px]">
      {items.map((item) =>
        'href' in item ? (
          <DocLink item={item} />
        ) : (
          <li>
            <DocGroup group={item} />
          </li>
        )
      )}
    </ul>
  )
}

export default DocMenu
