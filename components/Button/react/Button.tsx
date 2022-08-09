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

type ReactButtonProps = ButtonPropsJsx &
  (ButtonPropsJsx extends React.HTMLProps<HTMLAnchorElement>
    ? React.HTMLProps<HTMLAnchorElement>
    : Omit<React.HTMLProps<HTMLButtonElement>, 'size'>)

export const Button: React.FC<ReactButtonProps> = ({
  variant = 'indigo-dark',
  size = '32',
  disabled = false,
  href,
  className,
  children,
  ...rest
}) => {
  const finalVariant =
    disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
      ? 'disabled'
      : variant
  const finalDisabled = disabled || variant === 'disabled'
  const Comp = href ? 'a' : 'button'
  return (
    // @ts-ignore
    <Comp
      {...rest}
      href={href}
      type={href ? undefined : 'button'}
      className={clsx(
        StaticClasses,
        VariantClassesTable[finalVariant],
        SizeClassesTable[size],
        className
      )}
      disabled={finalDisabled}
    >
      {children}
    </Comp>
  )
}

export default Button
