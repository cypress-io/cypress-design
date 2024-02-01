import * as React from 'react'
import clsx from 'clsx'
import { SharedSettings } from '@cypress-design/constants-animatedicons'

export interface AnimatedIconsProps {
  id: string
  label?: string
  className?: string
}

export const AnimatedIcons: React.FC<
  AnimatedIconsProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for AnimatedIcons
      <p>{SharedSettings.foo}</p>
    </div>
  )
}

export default AnimatedIcons
