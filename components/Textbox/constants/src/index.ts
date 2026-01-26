import type * as React from 'react'

// Re-export all constants from separate files
export * from './base-classes'
export * from './variant-classes'
export * from './icon-color-classes'

// Import CssInputSizeClasses for type definition
import { CssInputSizeClasses } from './base-classes'

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
