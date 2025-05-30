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
  // Determine if we should use the disabled variant
  const useDisabledVariant =
    disabled &&
    !variant.includes('dark-mode') &&
    !variant.includes('outline') &&
    variant !== 'white'

  // If using disabled variant, use it. Otherwise, keep original variant
  const finalVariant = useDisabledVariant ? 'disabled' : variant

  const finalDisabled =
    disabled ||
    variant === 'disabled' ||
    variant === 'outline-disabled' ||
    variant === 'disabled-dark-mode'

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
