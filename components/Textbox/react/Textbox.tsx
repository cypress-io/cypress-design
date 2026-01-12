import clsx from 'clsx'
import * as React from 'react'
import {
  TextboxProps as TextboxPropsBase,
  DefaultTheme,
  DefaultVariant,
  DefaultSize,
  CssStaticClasses,
  CssSizeClassesTable,
  CssVariantClassesTable,
  CssRoundedClasses,
  IconColors,
  DividerClasses,
  LabelClasses,
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
  // Track focus state to switch from placeholder to default when focused
  const [isFocused, setIsFocused] = React.useState(false)
  // Track actual input value for uncontrolled inputs
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')

  // Determine current state based on priority:
  // 1. disabled (highest priority)
  // 2. placeholder (if value is empty AND not focused)
  // 3. focus-visible (handled by CSS)
  // 4. active (handled by CSS)
  // 5. hover (handled by CSS)
  // 6. default (lowest priority)

  // Check if placeholder state should be applied
  // Once any value is typed, use default state (not placeholder)
  // For controlled: use value prop
  // For uncontrolled: use internalValue state (updated on input/change/blur)
  const currentValue = value !== undefined ? value : internalValue
  const hasValue = currentValue && String(currentValue).trim() !== ''
  const isPlaceholder = !hasValue

  // Determine state key for variant classes
  // Note: hover, active, and focus-visible are handled by CSS pseudo-classes
  // We only need to determine between placeholder, default, and disabled
  // Priority: disabled > placeholder (only if empty AND not focused) > default
  // When focused OR has value, use default state (so active styles show)
  const stateKey: 'placeholder' | 'default' | 'disabled' = disabled
    ? 'disabled'
    : isPlaceholder && placeholder && !isFocused
      ? 'placeholder'
      : 'default'

  // Handle focus events
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    // Update internal value from input for uncontrolled inputs
    if (value === undefined) {
      setInternalValue(e.currentTarget.value)
    }
    onBlur?.(e)
  }

  // Handle input events to track value for uncontrolled inputs
  // Update state immediately so component re-renders with correct state
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    if (value === undefined) {
      // Use functional update to ensure we get the latest value
      setInternalValue(inputValue)
    }
    onInput?.(e)
  }

  // Handle change events to track value for uncontrolled inputs
  // Update state immediately so component re-renders with correct state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    if (value === undefined) {
      // Use functional update to ensure we get the latest value
      setInternalValue(inputValue)
    }
    onChange?.(e)
  }

  // Build variant class key: theme-variant-state
  const variantKey =
    `${theme}-${variant}-${stateKey}` as keyof typeof CssVariantClassesTable

  // Get variant classes
  const variantClasses = CssVariantClassesTable[variantKey] || ''

  // Get size classes - these include height, padding, font-size, line-height
  const sizeClasses = CssSizeClassesTable[size]

  // Extract padding from size for input container
  // Size classes format: "h-[40px] px-[16px] text-[14px] leading-[20px]"
  const paddingClass =
    size === '32' ? 'px-[12px]' : size === '40' ? 'px-[16px]' : 'px-[16px]'
  const heightClass =
    size === '32' ? 'h-[32px]' : size === '40' ? 'h-[40px]' : 'h-[48px]'

  // Get rounded classes
  const roundedClasses =
    CssRoundedClasses[rounded as unknown as keyof typeof CssRoundedClasses]

  // Build wrapper classes - wrapper handles hover/focus states and height
  const wrapperClasses = clsx(
    CssStaticClasses,
    variantClasses,
    roundedClasses,
    heightClass, // Height on wrapper
    'group', // For group-hover and group-focus-within
    className,
  )

  // Build input container classes - this contains the input and icons with padding
  const inputContainerClasses = clsx(
    'flex-1 flex items-center gap-[12px] min-w-0',
    paddingClass, // Padding on input container
  )

  // Build input classes
  const inputClasses = clsx(
    'flex-1 min-w-0 outline-none bg-transparent border-0',
    'text-[14px] leading-[20px]', // Font size and line height
    'placeholder:text-gray-500 dark:placeholder:text-gray-400', // Placeholder color
  )

  // Get icon colors based on current state
  // For hover/active/focus-visible, CSS will handle the transitions
  // We use the base state (default or placeholder) for icon colors
  const iconStateKey = disabled
    ? 'disabled'
    : isPlaceholder && placeholder
      ? 'placeholder'
      : 'default'
  const iconColorKey =
    `${theme}-${variant}-${iconStateKey}` as keyof typeof IconColors
  const iconColors = IconColors[iconColorKey] || {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  }

  // Get divider classes
  const dividerClasses = DividerClasses[theme]

  // Get label classes
  const labelClasses = LabelClasses[theme]

  // Render icon helper
  const renderIcon = (
    Icon: React.ComponentType<any> | React.ReactNode | undefined,
    position: 'left' | 'right',
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
          className="shrink-0"
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
    <div className={wrapperClasses}>
      {/* Label Left */}
      {labelLeft && (
        <span
          className={clsx(
            labelClasses,
            'px-[16px] shrink-0',
            rounded
              ? 'rounded-bl-[38px] rounded-tl-[38px]'
              : 'rounded-bl-[4px] rounded-tl-[4px]',
          )}
        >
          {labelLeft}
        </span>
      )}

      {/* Input Container - contains icons and input */}
      <div className={inputContainerClasses}>
        {/* Icon Left */}
        {renderIcon(IconLeft, 'left')}

        {/* Divider */}
        {divider && IconLeft && (
          <div className={clsx(dividerClasses, 'shrink-0')} />
        )}

        {/* Input */}
        <input
          ref={inputRef}
          type={type}
          className={inputClasses}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={ariaLabel}
          aria-invalid={ariaInvalidValue}
          aria-describedby={ariaDescribedBy}
          {...rest}
        />

        {/* Icon Right */}
        {renderIcon(IconRight, 'right')}
      </div>

      {/* Label Right */}
      {labelRight && (
        <span
          className={clsx(
            labelClasses,
            'px-[16px] shrink-0',
            rounded
              ? 'rounded-br-[38px] rounded-tr-[38px]'
              : 'rounded-br-[4px] rounded-tr-[4px]',
          )}
        >
          {labelRight}
        </span>
      )}
    </div>
  )
}

export default Textbox
