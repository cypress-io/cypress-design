import clsx from 'clsx'
import * as React from 'react'
import type { ButtonProps } from '../constants'
import {
  SizeClassesTable,
  VariantClassesTable,
  StaticClasses,
} from '../constants'

export interface ButtonPropsJsx extends ButtonProps {
  className?: string
  children?: React.ReactNode
}

export const Button: React.FC<
  ButtonPropsJsx & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>
> = ({
  variant = 'indigo-dark',
  size = '32',
  disabled = false,
  className,
  children,
  ...rest
}) => {
  const finalVariant =
    disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
      ? 'disabled'
      : variant
  const finalDisabled = disabled || variant === 'disabled'
  return (
    <button
      {...rest}
      type="button"
      className={clsx(
        StaticClasses,
        VariantClassesTable[finalVariant],
        SizeClassesTable[size],
        className
      )}
      disabled={finalDisabled}
    >
      {children}
    </button>
  )
}

export default Button
