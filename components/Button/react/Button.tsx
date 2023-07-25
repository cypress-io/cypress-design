import clsx from 'clsx'
import * as React from 'react'
import {
  ButtonProps,
  DefaultSize,
  DefaultVariant,
  SizeClassesTable,
  VariantClassesTable,
  StaticClasses,
} from '@cypress-design/constants-button'

export interface ButtonPropsJsx extends ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  className?: string
  children?: React.ReactNode
}

type ReactButtonProps = ButtonPropsJsx &
  (ButtonPropsJsx extends React.HTMLProps<HTMLAnchorElement>
    ? React.HTMLProps<HTMLAnchorElement>
    : Omit<React.HTMLProps<HTMLButtonElement>, 'size'>)

export const Button: React.FC<ReactButtonProps> = ({
  variant = DefaultVariant,
  size = DefaultSize,
  disabled = false,
  href,
  className,
  children,
  type = 'button',
  ...rest
}) => {
  const finalVariant =
    disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
      ? 'disabled'
      : variant
  const finalDisabled = disabled || variant === 'disabled'
  const Comp = href ? 'a' : 'button'
  return (
    // @ts-expect-error since the button cannot have an href, ts will complain
    <Comp
      {...(href ? {} : { type })}
      {...rest}
      href={href}
      className={clsx(
        StaticClasses,
        VariantClassesTable[finalVariant],
        SizeClassesTable[size],
        className,
      )}
      disabled={finalDisabled}
      {...(finalDisabled && href ? { 'aria-disabled': true } : {})}
    >
      {children}
    </Comp>
  )
}

export default Button
