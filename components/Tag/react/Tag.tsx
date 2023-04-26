import * as React from 'react'
import clsx from 'clsx'
import {
  ColorClasses,
  SharedSettings,
  SizeClasses,
} from '@cypress-design/constants-tag'

export interface TagProps {
  size: keyof typeof SizeClasses
  color: keyof typeof ColorClasses
  dark?: boolean
  children: React.ReactNode
  className?: string
}

export const Tag: React.FC<
  TagProps & Omit<React.HTMLProps<HTMLSpanElement>, 'size'>
> = ({ className, children, size, color, dark, ...rest }) => {
  return (
    <span
      {...rest}
      className={clsx(
        SizeClasses[size],
        ColorClasses[color][dark ? 'dark' : 'default'],
        SharedSettings.classes,
        className
      )}
    >
      {children}
    </span>
  )
}

export default Tag
