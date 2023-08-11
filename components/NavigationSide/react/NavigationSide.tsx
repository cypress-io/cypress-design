import * as React from 'react'
import clsx from 'clsx'
// import { SharedSettings } from '@cypress-design/constants-navigationside'
import { ProjectDropdown } from './ProjectDropdown'
import { NavLink, NavLinkContentsProps } from './_NavLink'
// import { IconTechnologyCodeEditor } from '@cypress-design/react-icon'
export interface NavigationSideProps {
  items: Array<NavLinkContentsProps>
  label?: string
  className?: string
}

const expanded = true

export const NavigationSide: React.FC<
  NavigationSideProps & React.HTMLProps<HTMLDivElement>
> = ({ id, className, items, ...rest }) => {
  return (
    <nav {...rest} id={id} className={clsx('bg-gray-900', className)}>
      <ProjectDropdown />
      <ul className="p-0 list-none">
        {items.map((item, index) => (
          <NavLink key={index} item={item} expanded={expanded} />
        ))}
      </ul>
    </nav>
  )
}

export default NavigationSide
