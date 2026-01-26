import clsx from 'clsx'
import * as React from 'react'
import * as TextboxConstants from '@cypress-design/constants-textbox'
import type { TextboxProps as TextboxPropsBase } from '@cypress-design/constants-textbox'

export interface TextboxPropsJsx extends TextboxPropsBase {
  labelLeft?: string | React.ReactNode
  labelRight?: string | React.ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type ReactTextboxProps = TextboxPropsJsx &
  Omit<React.HTMLProps<HTMLInputElement>, 'size'>

export const Textbox = React.forwardRef<HTMLInputElement, ReactTextboxProps>(
  (
    {
      theme = TextboxConstants.DefaultTheme,
      variant = TextboxConstants.DefaultVariant,
      size = TextboxConstants.DefaultSize,
      rounded = false,
      labelLeft,
      iconLeft: IconLeft,
      divider = false,
      iconRight: IconRight,
      labelRight,
      disabled = false,
      placeholder,
      value,
      defaultValue,
      className,
      type = 'text',
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref,
  ) => {
    // Build variant class key: theme-variant-default
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const variantKey =
      `${theme}-${variant}-default` as keyof typeof TextboxConstants.CssVariantClasses

    // Get variant classes - these include hover/active/focus/focus-visible styles
    // CSS pseudo-classes will automatically apply the correct styles
    const variantClasses = TextboxConstants.CssVariantClasses[variantKey] || ''

    // Get rounded classes
    const roundedClasses =
      TextboxConstants.CssRoundedClasses[
        rounded as unknown as keyof typeof TextboxConstants.CssRoundedClasses
      ]

    // Build wrapper classes - wrapper handles hover/focus states and height
    // Use label element for click-to-focus behavior (no JS needed)
    const wrapperClasses = clsx(
      TextboxConstants.CssStaticClasses,
      variantClasses,
      roundedClasses,
      TextboxConstants.CssWrapperHeightClasses[size], // Height on wrapper
      className,
    )

    // Build input container classes - this contains the input and icons with padding
    const inputContainerClasses = clsx(
      TextboxConstants.CssInputContainerBaseClasses,
      TextboxConstants.CssInputContainerPaddingClasses[size], // Padding on input container
    )

    // Get input size classes (font size and line height)
    const inputSizeClasses = TextboxConstants.CssInputSizeClasses[size]

    // Build input classes
    const inputClasses = clsx(
      TextboxConstants.CssInputClasses[theme],
      inputSizeClasses,
    )

    // Get icon color classes
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const iconColorKey =
      `${theme}-${variant}-default` as keyof typeof TextboxConstants.CssIconColorClasses
    const iconColorClasses = TextboxConstants.CssIconColorClasses[iconColorKey]

    // Get divider classes
    const dividerClasses = TextboxConstants.DividerClasses[theme]

    // Render icon helper
    const renderIcon = (
      Icon:
        | React.ComponentType<Record<string, unknown>>
        | React.ReactNode
        | undefined,
    ) => {
      if (!Icon) return null

      // If Icon is already a React element, return it directly with icon color classes
      // Note: iconColorClasses already includes 'shrink-0'
      if (React.isValidElement(Icon)) {
        return <span className={iconColorClasses}>{Icon}</span>
      }

      // If Icon is a React component, render it as a component
      if (typeof Icon === 'function') {
        const IconComponent = Icon as React.ComponentType<
          Record<string, unknown>
        >
        return (
          <IconComponent
            size="16"
            interactiveColorsOnGroup={true}
            className={iconColorClasses}
          />
        )
      }

      // Otherwise, treat as ReactNode
      return <span className="shrink-0">{Icon}</span>
    }

    // Determine aria-invalid value
    const ariaInvalidValue =
      ariaInvalid !== undefined
        ? ariaInvalid
        : variant === 'invalid'
          ? true
          : undefined

    return (
      <label className={wrapperClasses}>
        {/* Label Left */}
        {labelLeft && (
          <span
            className={clsx(
              TextboxConstants.CssLabelBaseClasses,
              TextboxConstants.CssLabelSizeClasses[size],
              TextboxConstants.CssLabelThemeClasses[theme],
              TextboxConstants.CssLabelBorderClasses.left[theme],
              TextboxConstants.CssLabelRoundedClasses.left[
                rounded ? 'rounded' : 'notRounded'
              ],
            )}
          >
            {labelLeft}
          </span>
        )}

        {/* Input Container - contains icons and input */}
        <div className={inputContainerClasses}>
          {/* Icon Left */}
          {renderIcon(IconLeft)}

          {/* Divider */}
          {divider && IconLeft && <div className={dividerClasses} />}

          {/* Input */}
          <input
            ref={ref}
            type={type}
            className={inputClasses}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={ariaInvalidValue}
            {...rest}
          />

          {/* Icon Right */}
          {renderIcon(IconRight)}
        </div>

        {/* Label Right */}
        {labelRight && (
          <span
            className={clsx(
              TextboxConstants.CssLabelBaseClasses,
              TextboxConstants.CssLabelSizeClasses[size],
              TextboxConstants.CssLabelThemeClasses[theme],
              TextboxConstants.CssLabelBorderClasses.right[theme],
              TextboxConstants.CssLabelRoundedClasses.right[
                rounded ? 'rounded' : 'notRounded'
              ],
            )}
          >
            {labelRight}
          </span>
        )}
      </label>
    )
  },
)

Textbox.displayName = 'Textbox'

export default Textbox
