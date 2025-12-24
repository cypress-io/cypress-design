import clsx from 'clsx'
import * as React from 'react'
import Icon from '@cypress-design/react-icon'
import {
  TextboxProps as TextboxPropsBase,
  DefaultSize,
  DefaultVariant,
  DefaultRounded,
  CssSizeClassesTable,
  CssRoundedClasses,
  CssVariantClassesTableLight,
  CssVariantClassesTableDark,
  CssLabelClasses,
  CssLabelClassesDark,
  TextboxSizes,
  TextboxVariants,
  TextboxRounded,
  TextboxStateStyles,
} from '@cypress-design/constants-textbox'

export interface TextboxPropsJsx
  extends Omit<TextboxPropsBase, 'iconLeft' | 'iconRight' | 'rounded'> {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  iconLeft?: React.ReactNode | string
  iconRight?: React.ReactNode | string
  type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url'
  name?: string
  id?: string
  autoFocus?: boolean
  rounded?: boolean
}

type ReactTextboxProps = TextboxPropsJsx &
  Omit<
    React.HTMLProps<HTMLInputElement>,
    'size' | 'onChange' | 'onFocus' | 'onBlur'
  >

export const Textbox: React.FC<ReactTextboxProps> = ({
  variant = DefaultVariant,
  size = DefaultSize,
  rounded = false,
  darkMode = false,
  labelLeft,
  labelRight,
  iconLeft,
  iconRight,
  disabled = false,
  placeholder,
  value,
  className,
  onChange,
  onFocus,
  onBlur,
  type = 'text',
  name,
  id,
  autoFocus,
  ...rest
}) => {
  // Use disabled variant if disabled prop is true OR variant is 'disabled'
  const finalVariant: TextboxVariants =
    disabled || variant === 'disabled' ? 'disabled' : variant || DefaultVariant
  const isActuallyDisabled = disabled || variant === 'disabled'

  // Track keyboard focus for CSS class (minimal JS needed to distinguish keyboard vs mouse)
  const [isKeyboardFocus, setIsKeyboardFocus] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  // Get variant table based on dark mode
  const variantTable = darkMode
    ? CssVariantClassesTableDark
    : CssVariantClassesTableLight

  // Determine the state style based on user interaction and input state
  // Default to 'default' style - only show 'placeholder' style when input is empty and has placeholder
  // Priority: focus (keyboard) > active (click) > hover > placeholder (if empty) > default
  let stateStyle: TextboxStateStyles = 'default'

  if (!isActuallyDisabled && finalVariant !== 'disabled') {
    // Only show placeholder style if input is empty AND has placeholder attribute
    const isEmpty = !value || value === ''
    if (placeholder && isEmpty) {
      stateStyle = 'placeholder'
    }
    // Otherwise, always use 'default' style (hover/active/focus handled by CSS)
  }

  // Get the style classes for the current variant and state
  const stateVariant = finalVariant === 'disabled' ? 'disabled' : finalVariant
  const variantStyles = variantTable[stateVariant]
  // For disabled, only 'default' style exists, so use that if stateStyle is not available
  const baseStyleClasses =
    stateStyle in variantStyles
      ? variantStyles[stateStyle as keyof typeof variantStyles]
      : variantStyles.default

  // Get hover, active, and focus classes for CSS (only if variant supports them)
  const hoverClasses = 'hover' in variantStyles ? variantStyles.hover : null
  const activeClasses = 'active' in variantStyles ? variantStyles.active : null
  const focusClasses = 'focus' in variantStyles ? variantStyles.focus : null

  // Handle keyboard events to detect Tab navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      setIsKeyboardFocus(true)
    }
  }

  // Handle mouse events to detect click
  const handleMouseDown = () => {
    setIsKeyboardFocus(false)
  }

  // Handle focus events
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    // If no keyboard flag was set, assume mouse (click)
    if (!isKeyboardFocus) {
      setIsKeyboardFocus(false)
    }
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    setIsKeyboardFocus(false)
    onBlur?.(e)
  }

  // Get label classes based on dark mode
  const labelTable = darkMode ? CssLabelClassesDark : CssLabelClasses

  // Convert boolean rounded to string key
  const roundedKey: TextboxRounded = rounded ? 'true' : 'false'

  // Build container classes
  const containerClasses = clsx(
    'relative',
    CssSizeClassesTable[size],
    CssRoundedClasses[roundedKey],
    className,
  )

  // Build label classes
  const labelLeftClasses = labelLeft
    ? clsx(
        'flex items-center h-full',
        labelTable.background,
        labelTable.stroke,
        labelTable.text,
        labelTable.padding,
        'border-r',
        labelTable.rounded[roundedKey],
      )
    : undefined

  const labelRightClasses = labelRight
    ? clsx(
        'flex items-center h-full',
        labelTable.background,
        labelTable.stroke,
        labelTable.text,
        labelTable.padding,
        'border-l',
        roundedKey === 'true'
          ? 'rounded-br-[28px] rounded-tr-[28px]'
          : 'rounded-br-[4px] rounded-tr-[4px]',
      )
    : undefined

  // Icon wrapper classes
  const iconWrapperClasses =
    'flex items-center justify-center shrink-0 w-[16px] h-[16px]'

  return (
    <div className="relative w-full flex items-center">
      {/* Left Label */}
      {labelLeft && (
        <div className={labelLeftClasses}>
          <span className="text-[14px] leading-[20px]">{labelLeft}</span>
        </div>
      )}

      {/* Input Container */}
      <div
        className={clsx(
          'relative flex-1 group',
          containerClasses,
          // Add class for keyboard focus to enable CSS targeting
          isKeyboardFocus && 'textbox-keyboard-focus',
        )}
      >
        {/* Outer border for hover state - CSS handles this */}
        {!isActuallyDisabled &&
          finalVariant !== 'disabled' &&
          hoverClasses &&
          hoverClasses.strokeOutside && (
            <div
              className={clsx(
                'absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity',
                hoverClasses.strokeOutside.includes('border-[3px]')
                  ? '-inset-[1.5px]'
                  : '-inset-[1px]',
                CssRoundedClasses[roundedKey],
                hoverClasses.strokeOutside,
                'z-0',
              )}
            />
          )}

        {/* Outer border for active state (mouse click) - CSS handles this */}
        {!isActuallyDisabled &&
          finalVariant !== 'disabled' &&
          activeClasses &&
          activeClasses.strokeOutside && (
            <div
              className={clsx(
                'absolute pointer-events-none opacity-0 transition-opacity',
                'group-focus-within:opacity-100',
                'group-focus-within.textbox-keyboard-focus:opacity-0',
                activeClasses.strokeOutside.includes('border-[3px]')
                  ? '-inset-[2px]'
                  : '-inset-[2px]',
                CssRoundedClasses[roundedKey],
                activeClasses.strokeOutside,
                'z-0',
              )}
            />
          )}

        {/* Outer border for focus state (keyboard Tab) - CSS handles this */}
        {!isActuallyDisabled &&
          finalVariant !== 'disabled' &&
          focusClasses &&
          focusClasses.strokeOutside && (
            <div
              className={clsx(
                'absolute pointer-events-none opacity-0 transition-opacity',
                'group-focus-within.textbox-keyboard-focus:opacity-100',
                focusClasses.strokeOutside.includes('border-[3px]')
                  ? '-inset-[1.5px]'
                  : '-inset-[1px]',
                CssRoundedClasses[roundedKey],
                focusClasses.strokeOutside,
                'z-0',
              )}
            />
          )}

        {/* Input Background with inner border - CSS handles state changes */}
        <div
          className={clsx(
            'absolute inset-0 pointer-events-none transition-colors',
            CssRoundedClasses[roundedKey],
            // Base state (default or placeholder)
            baseStyleClasses.background,
            // Base border width - only 1px when not focused
            !isFocused && 'border-[1px]',
            baseStyleClasses.stroke,
            // Hover state - only apply when not focused (using prefixed versions from constants)
            !isActuallyDisabled &&
              finalVariant !== 'disabled' &&
              !isFocused &&
              hoverClasses &&
              'groupHoverBackground' in hoverClasses &&
              'groupHoverStroke' in hoverClasses && [
                hoverClasses.groupHoverBackground,
                hoverClasses.groupHoverStroke,
              ],
            // Active state (mouse click) - CSS with class check (using prefixed versions from constants)
            // Only apply when actually focused (not keyboard focus) - uses 1px border
            !isActuallyDisabled &&
              finalVariant !== 'disabled' &&
              isFocused &&
              !isKeyboardFocus &&
              activeClasses &&
              'groupFocusWithinBackground' in activeClasses &&
              'groupFocusWithinStroke' in activeClasses && [
                'border-[1px]', // Explicitly set 1px border for active state
                activeClasses.groupFocusWithinBackground,
                activeClasses.groupFocusWithinStroke,
              ],
            // Focus state (keyboard Tab) - CSS with focus-visible for keyboard navigation - uses 2px border
            !isActuallyDisabled &&
              finalVariant !== 'disabled' &&
              focusClasses &&
              'groupFocusVisibleBackground' in focusClasses &&
              'groupFocusVisibleStroke' in focusClasses && [
                focusClasses.groupFocusVisibleBackground,
                // Split the stroke classes to ensure border-2 is applied correctly
                ...(focusClasses.groupFocusVisibleStroke as string).split(' '),
              ],
            // Ensure base border color is always applied when not focused (override any focus colors)
            !isFocused && baseStyleClasses.stroke,
            'z-10',
          )}
        />

        {/* Input Content */}
        <div className="relative flex items-center h-full z-20">
          {/* Left Icon */}
          {iconLeft && (
            <div className={clsx(iconWrapperClasses, 'ml-[16px]')}>
              <div
                className={clsx(
                  'w-full h-full flex items-center justify-center transition-colors',
                  baseStyleClasses.iconFill,
                  baseStyleClasses.iconStroke,
                  // Hover state - only apply when not focused (using prefixed versions from constants)
                  !isActuallyDisabled &&
                    finalVariant !== 'disabled' &&
                    !isFocused &&
                    hoverClasses &&
                    'groupHoverIconFill' in hoverClasses &&
                    'groupHoverIconStroke' in hoverClasses && [
                      hoverClasses.groupHoverIconFill,
                      hoverClasses.groupHoverIconStroke,
                    ],
                  // Active/Focus states (using prefixed versions from constants)
                  !isActuallyDisabled &&
                    finalVariant !== 'disabled' &&
                    activeClasses &&
                    'groupFocusWithinIconFill' in activeClasses &&
                    'groupFocusWithinIconStroke' in activeClasses && [
                      activeClasses.groupFocusWithinIconFill,
                      activeClasses.groupFocusWithinIconStroke,
                    ],
                )}
              >
                {typeof iconLeft === 'string' ? (
                  <Icon
                    name={iconLeft as any}
                    size="16"
                    className="text-current"
                  />
                ) : (
                  iconLeft
                )}
              </div>
            </div>
          )}

          {/* Input Field */}
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={isActuallyDisabled}
            autoFocus={autoFocus}
            className={clsx(
              'flex-1 bg-transparent border-0 outline-none relative z-20 h-full transition-colors',
              baseStyleClasses.text,
              'text-[14px] leading-[20px]',
              iconLeft ? 'pl-[12px]' : 'pl-[16px]',
              iconRight ? 'pr-[12px]' : 'pr-[16px]',
              stateStyle === 'placeholder'
                ? 'placeholder:text-[#5a5f7a]'
                : 'placeholder:text-gray-700',
              darkMode &&
                (stateStyle === 'placeholder'
                  ? 'placeholder:text-gray-400'
                  : 'placeholder:text-gray-400'),
            )}
            onChange={onChange}
            onMouseDown={handleMouseDown}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />

          {/* Right Icon */}
          {iconRight && (
            <div className={clsx(iconWrapperClasses, 'mr-[16px]')}>
              <div
                className={clsx(
                  'w-full h-full flex items-center justify-center transition-colors',
                  baseStyleClasses.iconFill,
                  baseStyleClasses.iconStroke,
                  // Hover state - only apply when not focused (using prefixed versions from constants)
                  !isActuallyDisabled &&
                    finalVariant !== 'disabled' &&
                    !isFocused &&
                    hoverClasses &&
                    'groupHoverIconFill' in hoverClasses &&
                    'groupHoverIconStroke' in hoverClasses && [
                      hoverClasses.groupHoverIconFill,
                      hoverClasses.groupHoverIconStroke,
                    ],
                  // Active/Focus states (using prefixed versions from constants)
                  !isActuallyDisabled &&
                    finalVariant !== 'disabled' &&
                    activeClasses &&
                    'groupFocusWithinIconFill' in activeClasses &&
                    'groupFocusWithinIconStroke' in activeClasses && [
                      activeClasses.groupFocusWithinIconFill,
                      activeClasses.groupFocusWithinIconStroke,
                    ],
                )}
              >
                {typeof iconRight === 'string' ? (
                  <Icon
                    name={iconRight as any}
                    size="16"
                    className="text-current"
                  />
                ) : (
                  iconRight
                )}
              </div>
            </div>
          )}

          {/* Right Label (inside input) */}
          {labelRight && !iconRight && (
            <div
              className={clsx(
                'flex items-center h-full pr-[16px] pl-[16px]',
                'border-l',
                labelTable.stroke,
              )}
            >
              <span
                className={clsx('text-[14px] leading-[20px]', labelTable.text)}
              >
                {labelRight}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Label (outside input) */}
      {labelRight && iconRight && (
        <div className={labelRightClasses}>
          <span className="text-[14px] leading-[20px]">{labelRight}</span>
        </div>
      )}
    </div>
  )
}

export default Textbox
