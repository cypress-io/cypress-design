import * as React from 'react'
import clsx from 'clsx'
// import { SharedSettings } from '@cypress-design/constants-navigationside'
import { ProjectDropdown } from './ProjectDropdown'
import { NavLink } from './_NavLink'
import { IconTechnologyCodeEditor } from '@cypress-design/react-icon'
export interface NavigationSideProps {
  id: string
  label?: string
  className?: string
}

const items = [
  {
    active: true,
    href: '/specs',
    text: 'specs',
    collapsible: true,
  },
  {
    href: '/debug',
    text: 'debug',
    collapsible: true,
  },
  {
    href: '/runs',
    text: 'runs',
    collapsible: true,
  },
  {
    href: '/reviews',
    text: 'reviews',
    collapsible: true,
  },
  {
    href: '/branches',
    text: 'branches',
    collapsible: true,
  },
  {
    href: '/insights',
    text: 'insights',
    collapsible: true,
  },
  {
    href: '/settings',
    text: 'settings',
    collapsible: true,
  },
]

const collapsible = true

export const NavigationSide: React.FC<
  NavigationSideProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-gray-900', className)}>
      <ProjectDropdown />
      <ul {...rest} className={clsx('list-none p-0', rest?.className)}>
        {items.map((item, index) => (
          <NavLink key={index} item={item} collapsible={collapsible} />
        ))}
      </ul>
    </div>
  )
}

export default NavigationSide
