import * as React from 'react'
import clsx from 'clsx'
// import { SharedSettings } from '@cypress-design/constants-navigationside'
import { ProjectDropdown } from './ProjectDropdown'

export interface NavigationSideProps {
  id: string
  label?: string
  className?: string
}

export const NavigationSide: React.FC<
  NavigationSideProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-gray-900', className)}>
      <ProjectDropdown />
    </div>
  )
}

export default NavigationSide
