import * as React from 'react'
import { NavGroup, classes, NavItemLink } from '../constants'
import { DocLink } from './_DocLink'
import { DocGroup } from './_DocGroup'

export interface DocMenuProps {
  items: (NavGroup | NavItemLink)[]
  depth?: number
}

export const DocMenu: React.FC<DocMenuProps> = ({ items }) => {
  return (
    <ul className={classes.docMenu}>
      {items.map((item, index) =>
        'href' in item ? (
          <DocLink key={index} item={item} />
        ) : (
          <li key={index} className="relative">
            <DocGroup group={item} />
          </li>
        )
      )}
    </ul>
  )
}

export default DocMenu
