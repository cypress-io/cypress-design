import clsx from 'clsx'
import * as React from 'react'
import {
  ButtonProps,
  DefaultSize,
  DefaultVariant,
  CssSizeClassesTable,
  CssVariantClassesTable,
  CssStaticClasses,
  CssSizeClassesTableSquare,
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
  square = false,
  ...rest
}) => {
  const finalVariant =
    disabled && !['outline-dark', 'outline-light', 'link'].includes(variant)
      ? variant.includes('outline') || variant === 'white'
        ? 'outline-disabled'
        : 'disabled'
      : variant

  const finalDisabled =
    disabled || variant === 'disabled' || variant === 'outline-disabled'

  const Comp = href ? 'a' : 'button'

  return (
    // @ts-expect-error since the button cannot have an href, ts will complain
    <Comp
      {...(href ? {} : { type })}
      {...rest}
      href={href}
      className={clsx(
        CssStaticClasses,
        CssVariantClassesTable[finalVariant],
        CssSizeClassesTable[size],
        CssSizeClassesTableSquare[size][square ? 'square' : 'wide'],
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
