import type * as React from 'react'

// Base static classes for all textboxes
export const CssStaticClasses =
  'flex items-center border border-solid transition-colors duration-150 group cursor-pointer'

// Font size and line height by size (for input element)
export const CssInputSizeClasses = {
  '32': 'text-[14px] leading-[20px]',
  '40': 'text-[16px] leading-[24px]',
  '48': 'text-[16px] leading-[24px]',
} as const

/**
 * Wrapper height classes by size.
 * Maps textbox size to corresponding height Tailwind class.
 */
export const CssWrapperHeightClasses = {
  '32': 'h-[32px]',
  '40': 'h-[40px]',
  '48': 'h-[48px]',
} as const

/**
 * Input container padding classes by size.
 * Maps textbox size to corresponding horizontal padding Tailwind class.
 */
export const CssInputContainerPaddingClasses = {
  '32': 'px-[12px]',
  '40': 'px-[16px]',
  '48': 'px-[16px]',
} as const

/**
 * Input container base classes (layout).
 * Provides flex layout, alignment, gap, and min-width constraints for the input container.
 */
export const CssInputContainerBaseClasses =
  'flex-1 flex items-center gap-[12px] min-w-0'

// Rounded classes
export const CssRoundedClasses = {
  false: 'rounded-[4px]',
  true: 'rounded-[28px]',
} as const

// Input element classes - theme-specific
export const CssInputClasses = {
  light:
    'flex-1 min-w-0 outline-none bg-transparent border-0 placeholder-gray-700',
  dark: 'flex-1 min-w-0 outline-none bg-transparent border-0 placeholder-gray-400',
} as const

// Variant classes - structure: theme-type-state
// Light mode colors extracted from Figma
// Dark mode colors extracted from Figma (explicit, not auto-mapped)
export const CssVariantClasses = {
  // Light mode - Default type
  'light-default-default': [
    // Base styles
    'bg-white border-gray-100 text-gray-900',
    // Placeholder styles (when input shows placeholder)
    // Using :has() to detect when any descendant input has placeholder-shown
    // The has: variant targets descendants, so this should match input:placeholder-shown
    // Input element has text-inherit, so it will inherit this text color
    'has-[:placeholder-shown]:bg-gray-50 has-[:placeholder-shown]:placeholder-gray-900',
    // Hover styles
    'hover:border-gray-300',
    'hover:outline hover:outline-2 hover:outline-gray-300/25',

    // Active and focus styles
    'focus-within:border-indigo-300 focus-within:hover:border-indigo-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-indigo-300/35 focus-within:hover:outline-indigo-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Light mode - Valid type
  'light-valid-default': [
    // Base styles
    'bg-white border-jade-300 text-jade-500',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles
    'hover:border-jade-300',
    'hover:outline hover:outline-2 hover:outline-jade-300/35',

    // Active and focus styles
    'focus-within:border-jade-400 focus-within:hover:border-jade-400',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-jade-300/35 focus-within:hover:outline-jade-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Light mode - Invalid type
  'light-invalid-default': [
    // Base styles
    'bg-white border-red-300 text-red-500',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles
    'hover:border-red-300',
    'hover:outline hover:outline-2 hover:outline-red-300/35 hover:outline-offset-0',
    // Active and focus styles
    'focus-within:border-red-400 focus-within:hover:border-red-400',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-red-300/35 focus-within:hover:outline-red-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Light mode - Warning type
  'light-warning-default': [
    // Base styles
    'bg-white border-orange-300 text-orange-600',
    // Placeholder styles (when input shows placeholder)
    'has-[input:placeholder-shown]:bg-gray-50',
    // Hover styles
    'hover:border-orange-400',
    'hover:outline hover:outline-2 hover:outline-orange-300/35',
    // Active and focus styles
    'focus-within:border-orange-400 focus-within:hover:border-orange-400',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-orange-300/35 focus-within:hover:outline-orange-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Default type (explicit colors from Figma)
  'dark-default-default': [
    // Base styles
    'bg-gray-950 border-gray-800 text-gray-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-gray-800',
    'hover:outline hover:outline-2 hover:outline-white/10',
    // Active and focus styles
    'focus-within:border-indigo-300 focus-within:hover:border-indigo-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-indigo-300/35 focus-within:hover:outline-indigo-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Valid type
  'dark-valid-default': [
    // Base styles
    'bg-gray-950 border-jade-300 text-jade-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-jade-300',
    'hover:outline hover:outline-2 hover:outline-jade-300/35',
    // Active and focus styles
    'focus-within:border-jade-300 focus-within:hover:border-jade-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-jade-300/35 focus-within:hover:outline-jade-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Invalid type
  'dark-invalid-default': [
    // Base styles
    'bg-gray-950 border-red-300 text-red-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-red-300',
    'hover:outline hover:outline-2 hover:outline-red-300/35',
    // Active and focus styles
    'focus-within:border-red-300 focus-within:hover:border-red-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-red-300/35 focus-within:hover:outline-red-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Warning type
  'dark-warning-default': [
    // Base styles
    'bg-gray-950 border-orange-300 text-orange-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-orange-300',
    'hover:outline hover:outline-2 hover:outline-orange-300/35',
    // Active and focus styles
    'focus-within:border-orange-300 focus-within:hover:border-orange-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-orange-300/35 focus-within:hover:outline-orange-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),
} as const

// Icon color classes - structure: theme-variant-state
// Icon color classes extracted from Figma design, converted to CSS classes
// These classes are applied to icon elements via className prop
export const CssIconColorClasses = {
  // Light mode - Default type
  'light-default-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-indigo-500 group-hover:icon-light-indigo-200', // hover
    'group-focus-within:icon-dark-indigo-500 group-focus-within:icon-light-indigo-200', // focus
    'group-active:icon-dark-indigo-500 group-active:icon-light-indigo-200', // active
    'has-[:placeholder-shown]:icon-dark-gray-500 has-[:placeholder-shown]:icon-light-gray-50', // placeholder
    // Icons
    'icon-dark-gray-500 icon-light-gray-50', // base
    'group-has-[:disabled]:icon-dark-gray-400 group-has-[:disabled]:icon-light-indigo-50',
  ].join(' '),

  // Light mode - Valid type
  'light-valid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-jade-500 group-hover:icon-light-jade-200', // hover
    'group-focus-within:icon-dark-jade-500 group-focus-within:icon-light-jade-200', // focus
    'group-active:icon-dark-jade-500 group-active:icon-light-jade-200', // active
    'has-[:placeholder-shown]:icon-dark-jade-500 has-[:placeholder-shown]:icon-light-jade-200', // placeholder
    // Icons
    'icon-dark-jade-500 icon-light-jade-200', // base
    'group-has-[:disabled]:icon-dark-gray-400 group-has-[:disabled]:icon-light-gray-50',
  ].join(' '),

  // Light mode - Invalid type
  'light-invalid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-red-500 group-hover:icon-light-red-200', // hover
    'group-focus-within:icon-dark-red-500 group-focus-within:icon-light-red-200', // focus
    'group-active:icon-dark-red-500 group-active:icon-light-red-200', // active
    'has-[:placeholder-shown]:icon-dark-red-500 has-[:placeholder-shown]:icon-light-red-200', // placeholder
    // Icons
    'icon-dark-red-500 icon-light-red-200', // base
    'group-has-[:disabled]:icon-dark-red-500 group-has-[:disabled]:icon-light-red-200',
  ].join(' '),

  // Light mode - Warning type
  'light-warning-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-orange-500 group-hover:icon-light-orange-200', // hover
    'group-focus-within:icon-dark-orange-500 group-focus-within:icon-light-orange-200', // focus
    'group-active:icon-dark-orange-500 group-active:icon-light-orange-200', // active
    'has-[:placeholder-shown]:icon-dark-orange-500 has-[:placeholder-shown]:icon-light-orange-200', // placeholder
    // Icons
    'icon-dark-orange-500 icon-light-orange-200', // base
    'group-has-[:disabled]:icon-dark-gray-400 group-has-[:disabled]:icon-light-gray-50',
  ].join(' '),

  // Dark mode - Default type
  'dark-default-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-indigo-300 group-hover:icon-light-indigo-500', // hover
    'group-focus-within:icon-dark-indigo-300 group-focus-within:icon-light-indigo-500', // focus
    'group-active:icon-dark-indigo-300 group-active:icon-light-indigo-500', // active
    'has-[:placeholder-shown]:icon-dark-gray-500 has-[:placeholder-shown]:icon-light-gray-800', // placeholder
    // Icons
    'icon-dark-gray-500 icon-light-gray-800', // base
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),

  // Dark mode - Valid type
  'dark-valid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-jade-300 group-hover:icon-light-jade-500', // hover
    'group-focus-within:icon-dark-jade-300 group-focus-within:icon-light-jade-500', // focus
    'group-active:icon-dark-jade-300 group-active:icon-light-jade-500', // active
    'has-[:placeholder-shown]:icon-dark-jade-300 has-[:placeholder-shown]:icon-light-jade-500', // placeholder
    // Icons
    'icon-dark-jade-300 icon-light-jade-500', // base
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),

  // Dark mode - Invalid type
  'dark-invalid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-red-300 group-hover:icon-light-red-500', // hover
    'group-focus-within:icon-dark-red-300 group-focus-within:icon-light-red-500', // focus
    'group-active:icon-dark-red-300 group-active:icon-light-red-500', // active
    'has-[:placeholder-shown]:icon-dark-red-300 has-[:placeholder-shown]:icon-light-red-500', // placeholder
    // Icons
    'icon-dark-red-300 icon-light-red-500', // base
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),

  // Dark mode - Warning type
  'dark-warning-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-orange-300 group-hover:icon-light-orange-500', // hover
    'group-focus-within:icon-dark-orange-300 group-focus-within:icon-light-orange-500', // focus
    'group-active:icon-dark-orange-300 group-active:icon-light-orange-500', // active
    'has-[:placeholder-shown]:icon-dark-orange-300 has-[:placeholder-shown]:icon-light-orange-500', // placeholder
    // Icons
    'icon-dark-orange-300 icon-light-orange-500', // base (default state uses orange-400/transparent)
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),
} as const

// Divider classes - structure: theme
export const DividerClasses = {
  light: 'h-[16px] w-[1px] bg-gray-200 shrink-0',
  dark: 'h-[16px] w-[1px] bg-gray-700 shrink-0',
} as const

// Label size classes - padding, font size, line height
export const CssLabelSizeClasses = {
  '32': 'px-[8px] text-[14px] leading-[20px]',
  '40': 'px-[16px] text-[16px] leading-[24px]',
  '48': 'px-[16px] text-[16px] leading-[24px]',
} as const

// Label theme classes - text color and background
export const CssLabelThemeClasses = {
  light: 'text-gray-700 bg-gray-50',
  dark: 'text-gray-400 bg-gray-900',
} as const

// Label border classes - separate light/dark entries, no dark: prefix
export const CssLabelBorderClasses = {
  left: {
    light: 'border-r border-gray-100',
    dark: 'border-r border-gray-800',
  },
  right: {
    light: 'border-l border-gray-100',
    dark: 'border-l border-gray-800',
  },
} as const

// Label rounded classes - based on textbox rounded prop
export const CssLabelRoundedClasses = {
  left: {
    rounded: 'rounded-tl-[28px] rounded-bl-[28px]',
    notRounded: 'rounded-tl-[4px] rounded-bl-[4px]',
  },
  right: {
    rounded: 'rounded-tr-[28px] rounded-br-[28px]',
    notRounded: 'rounded-tr-[4px] rounded-br-[4px]',
  },
} as const

// Label base classes - vertical expansion and layout
export const CssLabelBaseClasses = 'h-full flex items-center shrink-0'

// TypeScript types
export type TextboxTheme = 'light' | 'dark'
export type TextboxVariant = 'default' | 'valid' | 'invalid' | 'warning'
export type TextboxSize = keyof typeof CssInputSizeClasses

export const DefaultTheme: TextboxTheme = 'light'
export const DefaultVariant: TextboxVariant = 'default'
export const DefaultSize: TextboxSize = '40'

// Props interface
export interface TextboxProps {
  /**
   * Theme mode: 'light' or 'dark'
   */
  theme?: TextboxTheme
  /**
   * Visual variant/type of the textbox
   */
  variant?: TextboxVariant
  /**
   * Size (height) of the textbox in pixels
   */
  size?: TextboxSize
  /**
   * Whether to use rounded corners
   */
  rounded?: boolean
  /**
   * Label text or element on the left side
   */
  labelLeft?: string | React.ReactNode
  /**
   * Icon component on the left side
   */
  iconLeft?: React.ComponentType<any> | React.ReactNode
  /**
   * Whether to show a divider between iconLeft and input
   */
  divider?: boolean
  /**
   * Icon component on the right side
   */
  iconRight?: React.ComponentType<any> | React.ReactNode
  /**
   * Label text or element on the right side
   */
  labelRight?: string | React.ReactNode
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Current value of the input
   */
  value?: string
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string
}
