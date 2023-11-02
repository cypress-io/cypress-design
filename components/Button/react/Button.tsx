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
import {
  Link as AccessibleLink,
  Button as AccessibleButton,
} from 'react-aria-components'
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

  const finalClassName = clsx(
    StaticClasses,
    VariantClassesTable[finalVariant],
    SizeClassesTable[size],
    className,
  )

  const finalDisabled = disabled || variant === 'disabled'
  if (href) {
    return (
      <AccessibleLink
        href={href}
        className={finalClassName}
        isDisabled={disabled}
      >
        {children}
      </AccessibleLink>
    )
  }
  return (
    <Button
      type={type}
      {...rest}
      className={finalClassName}
      disabled={finalDisabled}
    >
      {children}
    </Button>
  )
}

export default Button
