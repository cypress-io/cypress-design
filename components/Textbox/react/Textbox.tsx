import clsx from 'clsx'
import * as React from 'react'
import * as TextboxConstants from '@cypress-design/constants-textbox'
import type { TextboxProps as TextboxPropsBase } from '@cypress-design/constants-textbox'

export interface TextboxPropsJsx extends TextboxPropsBase {
  labelLeft?: string | React.ReactNode
  labelRight?: string | React.ReactNode
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
      onChange,
      onInput,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      type = 'text',
      'aria-label': ariaLabel,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    // Build variant class key: theme-variant-default
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const variantKey =
      `${theme}-${variant}-default` as keyof typeof TextboxConstants.CssVariantClassesTable

    // Get variant classes - these include hover/active/focus/focus-visible styles
    // CSS pseudo-classes will automatically apply the correct styles
    const variantClasses =
      TextboxConstants.CssVariantClassesTable[variantKey] || ''

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
      TextboxConstants.CssWrapperHeightClassesTable[size], // Height on wrapper
      className,
    )

    // Build input container classes - this contains the input and icons with padding
    const inputContainerClasses = clsx(
      TextboxConstants.CssInputContainerBaseClasses,
      TextboxConstants.CssInputContainerPaddingClassesTable[size], // Padding on input container
    )

    // Get input size classes (font size and line height)
    const inputSizeClasses = TextboxConstants.CssInputSizeClassesTable[size]

    // Build input classes
    const inputClasses = clsx(
      TextboxConstants.CssInputClassesTable[theme],
      inputSizeClasses,
    )

    // Get icon color classes
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const iconColorKey =
      `${theme}-${variant}-default` as keyof typeof TextboxConstants.CssIconColorClassesTable
    const iconColorClasses =
      TextboxConstants.CssIconColorClassesTable[iconColorKey]

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

      // If Icon is a React component
      if (typeof Icon === 'function' || React.isValidElement(Icon)) {
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

      // If Icon is already a ReactNode
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
              TextboxConstants.CssLabelSizeClassesTable[size],
              TextboxConstants.CssLabelThemeClassesTable[theme],
              TextboxConstants.CssLabelBorderClassesTable.left[theme],
              TextboxConstants.CssLabelRoundedClassesTable.left[
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
            onChange={onChange}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalidValue}
            aria-describedby={ariaDescribedBy}
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
              TextboxConstants.CssLabelSizeClassesTable[size],
              TextboxConstants.CssLabelThemeClassesTable[theme],
              TextboxConstants.CssLabelBorderClassesTable.right[theme],
              TextboxConstants.CssLabelRoundedClassesTable.right[
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
