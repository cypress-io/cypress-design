import * as React from 'react'
import clsx from 'clsx'
import { CssColor, CssShared, CssSize } from '@cypress-design/constants-tag'

export interface TagProps {
  size: keyof typeof CssSize
  color: keyof typeof CssColor
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
        CssSize[size],
        CssColor[color][dark ? 'dark' : 'default'],
        CssShared,
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Tag
