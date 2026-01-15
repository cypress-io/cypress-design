import clsx from 'clsx'
import * as React from 'react'
import {
  TextboxProps as TextboxPropsBase,
  DefaultTheme,
  DefaultVariant,
  DefaultSize,
  CssStaticClasses,
  CssInputSizeClassesTable,
  CssVariantClassesTable,
  CssRoundedClasses,
  CssInputClassesTable,
  CssLabelSizeClassesTable,
  CssLabelThemeClassesTable,
  CssLabelBorderClassesTable,
  CssLabelRoundedClassesTable,
  CssLabelBaseClasses,
  IconColors,
  DividerClasses,
  CssWrapperHeightClassesTable,
  CssInputContainerPaddingClassesTable,
  CssInputContainerBaseClasses,
  CssShrinkZeroClass,
  TextboxTheme,
  TextboxVariant,
  TextboxSize,
} from '@cypress-design/constants-textbox'

export interface TextboxPropsJsx
  extends Omit<TextboxPropsBase, 'iconLeft' | 'iconRight' | 'rounded'> {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  iconLeft?: React.ComponentType<any> | React.ReactNode
  iconRight?: React.ComponentType<any> | React.ReactNode
  type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url'
  name?: string
  id?: string
  autoFocus?: boolean
  rounded?: boolean
  'aria-label'?: string
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
  'aria-describedby'?: string
}

type ReactTextboxProps = TextboxPropsJsx &
  Omit<
    React.HTMLProps<HTMLInputElement>,
    | 'size'
    | 'onChange'
    | 'onInput'
    | 'onFocus'
    | 'onBlur'
    | 'type'
    | 'className'
  >

export const Textbox: React.FC<ReactTextboxProps> = ({
  theme = DefaultTheme,
  variant = DefaultVariant,
  size = DefaultSize,
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
  type = 'text',
  'aria-label': ariaLabel,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  ...rest
}) => {
  // Determine state key for variant classes
  // States are handled by CSS pseudo-classes (hover, active, focus, focus-visible, placeholder-shown)
  // We only need to determine base state: disabled or default
  // CSS will automatically apply hover/active/focus/focus-visible/placeholder-shown styles
  const stateKey: 'default' | 'disabled' = disabled ? 'disabled' : 'default'

  // Build variant class key: theme-variant-state
  const variantKey =
    `${theme}-${variant}-${stateKey}` as keyof typeof CssVariantClassesTable

  // Get variant classes - these include hover/active/focus/focus-visible styles
  // CSS pseudo-classes will automatically apply the correct styles
  const variantClasses = CssVariantClassesTable[variantKey] || ''

  // Get rounded classes
  const roundedClasses =
    CssRoundedClasses[rounded as unknown as keyof typeof CssRoundedClasses]

  // Build wrapper classes - wrapper handles hover/focus states and height
  const wrapperClasses = clsx(
    CssStaticClasses,
    variantClasses,
    roundedClasses,
    CssWrapperHeightClassesTable[size], // Height on wrapper
    className,
  )

  // Build input container classes - this contains the input and icons with padding
  const inputContainerClasses = clsx(
    CssInputContainerBaseClasses,
    CssInputContainerPaddingClassesTable[size], // Padding on input container
  )

  // Get input size classes (font size and line height)
  const inputSizeClasses = CssInputSizeClassesTable[size]

  // Build input classes
  const inputClasses = clsx(CssInputClassesTable[theme], inputSizeClasses)

  // Get icon colors based on current state
  // For hover/active/focus-visible/placeholder-shown, CSS will handle the transitions
  // We use the base state (default) for icon colors
  const iconStateKey = disabled ? 'disabled' : 'default'
  const iconColorKey =
    `${theme}-${variant}-${iconStateKey}` as keyof typeof IconColors
  const iconColors = IconColors[iconColorKey] || {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  }

  // Get divider classes
  const dividerClasses = DividerClasses[theme]

  // Render icon helper
  const renderIcon = (
    Icon: React.ComponentType<any> | React.ReactNode | undefined,
  ) => {
    if (!Icon) return null

    // If Icon is a React component
    if (typeof Icon === 'function' || React.isValidElement(Icon)) {
      const IconComponent = Icon as React.ComponentType<any>
      return (
        <IconComponent
          size="16"
          strokeColor={iconColors.strokeColor}
          fillColor={iconColors.fillColor}
          className={CssShrinkZeroClass}
        />
      )
    }

    // If Icon is already a ReactNode
    return <span className={CssShrinkZeroClass}>{Icon}</span>
  }

  // Determine aria-invalid value
  const ariaInvalidValue =
    ariaInvalid !== undefined
      ? ariaInvalid
      : variant === 'invalid'
        ? true
        : undefined

  return (
    <div className={wrapperClasses}>
      {/* Label Left */}
      {labelLeft && (
        <span
          className={clsx(
            CssLabelBaseClasses,
            CssLabelSizeClassesTable[size],
            CssLabelThemeClassesTable[theme],
            CssLabelBorderClassesTable.left[theme],
            CssLabelRoundedClassesTable.left[
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
        {divider && IconLeft && (
          <div className={clsx(dividerClasses, CssShrinkZeroClass)} />
        )}

        {/* Input */}
        <input
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
            CssLabelBaseClasses,
            CssLabelSizeClassesTable[size],
            CssLabelThemeClassesTable[theme],
            CssLabelBorderClassesTable.right[theme],
            CssLabelRoundedClassesTable.right[
              rounded ? 'rounded' : 'notRounded'
            ],
          )}
        >
          {labelRight}
        </span>
      )}
    </div>
  )
}

export default Textbox
