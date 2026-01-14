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

  // #region agent log
  if (variant === 'invalid' && theme === 'light') {
    fetch('http://127.0.0.1:7242/ingest/b216fe50-d6b8-4a94-b221-11b07ed8da3f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'Textbox.tsx:92',
        message: 'Variant classes retrieved',
        data: {
          variantKey,
          variantClasses,
          hasHoverOutline: variantClasses.includes('has-[:hover]:outline'),
          hoverClasses: variantClasses
            .split(' ')
            .filter((c) => c.includes('hover')),
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'B',
      }),
    }).catch(() => {})
  }
  // #endregion

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

  // #region agent log
  if (variant === 'invalid' && theme === 'light') {
    fetch('http://127.0.0.1:7242/ingest/b216fe50-d6b8-4a94-b221-11b07ed8da3f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'Textbox.tsx:113',
        message: 'Invalid variant wrapper classes',
        data: { variantClasses, wrapperClasses, variant, theme },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'A',
      }),
    }).catch(() => {})
  }
  // #endregion

  // Build input container classes - this contains the input and icons with padding
  const inputContainerClasses = clsx(
    'flex-1 flex items-center gap-[12px] min-w-0',
    paddingClass, // Padding on input container
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

  // #region agent log
  if (variant === 'invalid' && theme === 'light') {
    fetch('http://127.0.0.1:7242/ingest/b216fe50-d6b8-4a94-b221-11b07ed8da3f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'Textbox.tsx:197',
        message: 'Rendering invalid textbox wrapper',
        data: {
          wrapperClasses,
          hasHoverClasses: variantClasses.includes('has-[:hover]'),
          hasOutlineClasses: variantClasses.includes('outline'),
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'A',
      }),
    }).catch(() => {})
  }
  // #endregion

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
        {renderIcon(IconLeft, 'left')}

        {/* Divider */}
        {divider && IconLeft && (
          <div className={clsx(dividerClasses, 'shrink-0')} />
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
        {renderIcon(IconRight, 'right')}
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
