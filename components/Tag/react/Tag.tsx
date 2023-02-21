import * as React from 'react'
import clsx from 'clsx'
import { ColorClasses, SharedSettings, SizeClasses } from '../constants'

export interface TagProps {
  size: keyof typeof SizeClasses
  color: keyof typeof ColorClasses
  children: React.ReactNode
  className?: string
}

export const Tag: React.FC<
  TagProps & Omit<React.HTMLProps<HTMLSpanElement>, 'size'>
> = ({ className, children, size, color, ...rest }) => {
  return (
    <span
      {...rest}
      className={clsx(
        SizeClasses[size],
        ColorClasses[color],
        SharedSettings.classes,
        className
      )}
    >
      {children}
    </span>
  )
}

export default Tag
