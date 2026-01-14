// Base static classes for all textboxes
export const CssStaticClasses =
  'flex items-center border border-solid transition-colors duration-150 ' +
  'focus-within:outline-none focus-within:z-10 focus-visible:outline-2 focus-visible:outline-offset-0'

// Font size and line height by size (for input element)
export const CssInputSizeClassesTable = {
  '32': 'text-[14px] leading-[20px]',
  '40': 'text-[16px] leading-[24px]',
  '48': 'text-[16px] leading-[24px]',
} as const

// Rounded classes
export const CssRoundedClasses = {
  false: 'rounded-[4px]',
  true: 'rounded-[28px]',
} as const

// Input element classes - theme-specific
export const CssInputClassesTable = {
  light:
    'flex-1 min-w-0 outline-none bg-transparent border-0 placeholder-gray-700',
  dark: 'flex-1 min-w-0 outline-none bg-transparent border-0 placeholder-gray-400',
  auto: 'flex-1 min-w-0 outline-none bg-transparent border-0 ',
} as const

// Variant classes - structure: theme-type-state
// Light mode colors extracted from Figma
// Dark mode colors extracted from Figma (explicit, not auto-mapped)
export const CssVariantClassesTable = {
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
    'has-[:hover]:border-gray-300',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-gray-300/25',

    // Active and focus styles
    'has-[:focus]:border-indigo-300 has-[:focus]:hover:border-indigo-300',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-indigo-300/35 has-[:focus]:hover:outline-indigo-300/35',
  ].join(' '),

  'light-default-disabled':
    'bg-gray-50 border-gray-50 text-gray-500 cursor-not-allowed',

  // Light mode - Valid type
  'light-valid-default': [
    // Base styles
    'bg-white border-jade-300 text-jade-500',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50 has-[:placeholder-shown]:border-jade-300',
    // Hover styles
    'has-[:hover]:border-jade-300',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-jade-300/35',

    // Active and focus styles
    'has-[:focus]:border-jade-400 has-[:focus]:hover:border-jade-400',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-jade-300/35 has-[:focus]:hover:outline-jade-300/35',
  ].join(' '),

  // Light mode - Invalid type
  'light-invalid-default': [
    // Base styles
    'bg-white border-red-300 text-red-500',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles
    'has-[:hover]:border-red-300',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-red-300/35 has-[:hover]:outline-offset-0',
    // Active and focus styles
    'has-[:focus]:border-red-400 has-[:focus]:hover:border-red-400',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-red-300/35 has-[:focus]:hover:outline-red-300/35',
  ].join(' '),
  'light-invalid-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',

  // Light mode - Warning type
  'light-warning-default': [
    // Base styles
    'bg-white border-orange-300 text-orange-600',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles
    'has-[:hover]:border-orange-400',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-orange-300/35',
    // Active and focus styles
    'has-[:focus]:border-orange-400 has-[:focus]:hover:border-orange-400',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-orange-300/35 has-[:focus]:hover:outline-orange-300/35',
  ].join(' '),
  'light-warning-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',

  // Dark mode - Default type (explicit colors from Figma)
  'dark-default-default': [
    // Base styles
    'bg-gray-950 border-gray-800 text-gray-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'has-[:hover]:border-gray-800',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-white/10',
    // Active and focus styles
    'has-[:focus]:border-indigo-300 has-[:focus]:hover:border-indigo-300',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-indigo-300/35 has-[:focus]:hover:outline-indigo-300/35',
  ].join(' '),
  'dark-default-disabled':
    'bg-gray-1000 border-gray-900 text-gray-700 cursor-not-allowed',

  // Dark mode - Valid type
  'dark-valid-default': [
    // Base styles
    'bg-gray-950 border-jade-300 text-jade-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'has-[:hover]:border-jade-300',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-jade-300/35',
    // Active and focus styles
    'has-[:focus]:border-jade-300 has-[:focus]:hover:border-jade-300',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-jade-300/35 has-[:focus]:hover:outline-jade-300/35',
  ].join(' '),
  'dark-valid-disabled':
    'bg-gray-1000 border-gray-900 text-gVyray-700 cursor-not-allowed',

  // Dark mode - Invalid type
  'dark-invalid-default': [
    // Base styles
    'bg-gray-950 border-red-300 text-red-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'has-[:hover]:border-red-300',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-red-300/35',
    // Active and focus styles
    'has-[:focus]:border-red-300 has-[:focus]:hover:border-red-300',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-red-300/35 has-[:focus]:hover:outline-red-300/35',
  ].join(' '),
  'dark-invalid-disabled':
    'bg-gray-1000 border-gray-800 text-Vpgray-600 cursor-not-allowed',

  // Dark mode - Warning type
  'dark-warning-default': [
    // Base styles
    'bg-gray-950 border-orange-300 text-orange-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'has-[:hover]:border-orange-300',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-orange-300/35',
    // Active and focus styles
    'has-[:focus]:border-orange-300 has-[:focus]:hover:border-orange-300',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-orange-300/35 has-[:focus]:hover:outline-orange-300/35',
  ].join(' '),
  'dark-warning-disabled':
    'bg-gray-1000 border-gray-800 text-gray-600 cursor-not-allowed',

  // Auto theme - combines light + dark with dark: prefix
  // Uses explicit dark mode colors from Figma (not auto-mapped)
  'auto-default-default': [
    // Base styles - Light mode
    'bg-white border-gray-200 text-gray-900',
    // Placeholder styles - Light mode (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles - Light mode
    'has-[:hover]:border-gray-300',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-gray-300/25',
    // Active and focus styles - Light mode
    'has-[:focus]:border-indigo-300 has-[:focus]:hover:border-indigo-300',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-indigo-300/35 has-[:focus]:hover:outline-indigo-300/35',
    // Base styles - Dark mode
    'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200',
    // Placeholder styles - Dark mode (when input shows placeholder)
    'dark:has-[:placeholder-shown]:bg-gray-800',
    // Hover styles - Dark mode
    'dark:has-[:hover]:border-gray-600',
    'dark:has-[:hover]:outline dark:has-[:hover]:outline-2 dark:has-[:hover]:outline-gray-600/25',
    // Active and focus styles - Dark mode
    'dark:has-[:focus]:border-indigo-400 dark:has-[:focus]:hover:border-indigo-400',
    'dark:has-[:focus]:outline dark:has-[:focus]:outline-2 dark:has-[:focus]:outline-offset-0 dark:has-[:focus]:outline-indigo-400/35 dark:has-[:focus]:hover:outline-indigo-400/35',
  ].join(' '),
  'auto-default-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-1000 dark:border-gray-800 dark:text-gray-600',

  'auto-valid-default': [
    // Base styles - Light mode
    'bg-white border-jade-400 text-jade-600',
    // Placeholder styles - Light mode (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles - Light mode
    'has-[:hover]:border-jade-500',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-jade-400/35',
    // Active and focus styles - Light mode
    'has-[:focus]:border-jade-500 has-[:focus]:hover:border-jade-500',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-jade-400/35 has-[:focus]:hover:outline-jade-400/35',
    // Base styles - Dark mode
    'dark:bg-gray-800 dark:border-jade-400 dark:text-jade-400',
    // Placeholder styles - Dark mode (when input shows placeholder)
    'dark:has-[:placeholder-shown]:bg-gray-800',
    // Hover styles - Dark mode
    'dark:has-[:hover]:border-jade-500',
    'dark:has-[:hover]:outline dark:has-[:hover]:outline-2 dark:has-[:hover]:outline-jade-400/35',
    // Active and focus styles - Dark mode
    'dark:has-[:focus]:border-jade-500 dark:has-[:focus]:hover:border-jade-500',
    'dark:has-[:focus]:outline dark:has-[:focus]:outline-2 dark:has-[:focus]:outline-offset-0 dark:has-[:focus]:outline-jade-400/35 dark:has-[:focus]:hover:outline-jade-400/35',
  ].join(' '),
  'auto-valid-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-1000 dark:border-gray-800 dark:text-gray-600',

  'auto-invalid-default': [
    // Base styles - Light mode
    'bg-white border-red-300 text-red-600',
    // Placeholder styles - Light mode (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles - Light mode
    'has-[:hover]:border-red-400',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-red-300/35',
    // Active and focus styles - Light mode
    'has-[:focus]:border-red-400 has-[:focus]:hover:border-red-400',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-red-300/35 has-[:focus]:hover:outline-red-300/35',
    // Base styles - Dark mode
    'dark:bg-gray-800 dark:border-red-300 dark:text-red-300',
    // Placeholder styles - Dark mode (when input shows placeholder)
    'dark:has-[:placeholder-shown]:bg-gray-800',
    // Hover styles - Dark mode
    'dark:has-[:hover]:border-red-400',
    'dark:has-[:hover]:outline dark:has-[:hover]:outline-2 dark:has-[:hover]:outline-red-300/35',
    // Active and focus styles - Dark mode
    'dark:has-[:focus]:border-red-400 dark:has-[:focus]:hover:border-red-400',
    'dark:has-[:focus]:outline dark:has-[:focus]:outline-2 dark:has-[:focus]:outline-offset-0 dark:has-[:focus]:outline-red-300/35 dark:has-[:focus]:hover:outline-red-300/35',
  ].join(' '),
  'auto-invalid-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-1000 dark:border-gray-800 dark:text-gray-600',

  'auto-warning-default': [
    // Base styles - Light mode
    'bg-white border-orange-300 text-orange-600',
    // Placeholder styles - Light mode (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles - Light mode
    'has-[:hover]:border-orange-400',
    'has-[:hover]:outline has-[:hover]:outline-2 has-[:hover]:outline-orange-300/35',
    // Active and focus styles - Light mode
    'has-[:focus]:border-orange-400 has-[:focus]:hover:border-orange-400',
    'has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-orange-300/35 has-[:focus]:hover:outline-orange-300/35',
    // Base styles - Dark mode
    'dark:bg-gray-800 dark:border-orange-400 dark:text-orange-400',
    // Placeholder styles - Dark mode (when input shows placeholder)
    'dark:has-[:placeholder-shown]:bg-gray-800',
    // Hover styles - Dark mode
    'dark:has-[:hover]:border-orange-500',
    'dark:has-[:hover]:outline dark:has-[:hover]:outline-2 dark:has-[:hover]:outline-orange-400/35',
    // Active and focus styles - Dark mode
    'dark:has-[:focus]:border-orange-500 dark:has-[:focus]:hover:border-orange-500',
    'dark:has-[:focus]:outline dark:has-[:focus]:outline-2 dark:has-[:focus]:outline-offset-0 dark:has-[:focus]:outline-orange-400/35 dark:has-[:focus]:hover:outline-orange-400/35',
  ].join(' '),
  'auto-warning-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-1000 dark:border-gray-800 dark:text-gray-600',
} as const

// Icon colors - structure: theme-type-state
// Colors extracted from Figma design
export const IconColors = {
  // Light mode - Default type
  'light-default-placeholder': {
    strokeColor: 'gray-500',
    fillColor: 'transparent',
  },
  'light-default-default': {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  },
  'light-default-hover': {
    strokeColor: 'gray-700',
    fillColor: 'transparent',
  },
  'light-default-active': {
    strokeColor: 'indigo-500',
    fillColor: 'transparent',
  },
  'light-default-focus-visible': {
    strokeColor: 'indigo-500',
    fillColor: 'transparent',
  },
  'light-default-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },

  // Light mode - Valid type
  'light-valid-placeholder': {
    strokeColor: 'jade-400',
    fillColor: 'transparent',
  },
  'light-valid-default': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'light-valid-hover': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'light-valid-active': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'light-valid-focus-visible': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'light-valid-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },

  // Light mode - Invalid type
  'light-invalid-placeholder': {
    strokeColor: 'red-300',
    fillColor: 'transparent',
  },
  'light-invalid-default': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'light-invalid-hover': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'light-invalid-active': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'light-invalid-focus-visible': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'light-invalid-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },

  // Light mode - Warning type
  'light-warning-placeholder': {
    strokeColor: 'orange-400',
    fillColor: 'transparent',
  },
  'light-warning-default': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'light-warning-hover': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'light-warning-active': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'light-warning-focus-visible': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'light-warning-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },

  // Dark mode - Default type (explicit colors from Figma)
  'dark-default-placeholder': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },
  'dark-default-default': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },
  'dark-default-hover': {
    strokeColor: 'indigo-300',
    fillColor: 'indigo-500',
  },
  'dark-default-active': {
    strokeColor: 'indigo-300',
    fillColor: 'indigo-500',
  },
  'dark-default-focus-visible': {
    strokeColor: 'indigo-300',
    fillColor: 'indigo-500',
  },
  'dark-default-disabled': {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  },

  // Dark mode - Valid type
  'dark-valid-placeholder': {
    strokeColor: 'jade-400',
    fillColor: 'transparent',
  },
  'dark-valid-default': {
    strokeColor: 'jade-400',
    fillColor: 'transparent',
  },
  'dark-valid-hover': {
    strokeColor: 'jade-400',
    fillColor: 'transparent',
  },
  'dark-valid-active': {
    strokeColor: 'jade-400',
    fillColor: 'transparent',
  },
  'dark-valid-focus-visible': {
    strokeColor: 'jade-400',
    fillColor: 'transparent',
  },
  'dark-valid-disabled': {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  },

  // Dark mode - Invalid type
  'dark-invalid-placeholder': {
    strokeColor: 'red-300',
    fillColor: 'transparent',
  },
  'dark-invalid-default': {
    strokeColor: 'red-300',
    fillColor: 'transparent',
  },
  'dark-invalid-hover': {
    strokeColor: 'red-300',
    fillColor: 'transparent',
  },
  'dark-invalid-active': {
    strokeColor: 'red-300',
    fillColor: 'transparent',
  },
  'dark-invalid-focus-visible': {
    strokeColor: 'red-300',
    fillColor: 'transparent',
  },
  'dark-invalid-disabled': {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  },

  // Dark mode - Warning type
  'dark-warning-placeholder': {
    strokeColor: 'orange-400',
    fillColor: 'transparent',
  },
  'dark-warning-default': {
    strokeColor: 'orange-400',
    fillColor: 'transparent',
  },
  'dark-warning-hover': {
    strokeColor: 'orange-400',
    fillColor: 'transparent',
  },
  'dark-warning-active': {
    strokeColor: 'orange-400',
    fillColor: 'transparent',
  },
  'dark-warning-focus-visible': {
    strokeColor: 'orange-400',
    fillColor: 'transparent',
  },
  'dark-warning-disabled': {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  },

  // Auto theme - same as light for base, dark mode handled via CSS
  'auto-default-placeholder': {
    strokeColor: 'gray-500',
    fillColor: 'transparent',
  },
  'auto-default-default': {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  },
  'auto-default-hover': {
    strokeColor: 'gray-700',
    fillColor: 'transparent',
  },
  'auto-default-active': {
    strokeColor: 'indigo-500',
    fillColor: 'transparent',
  },
  'auto-default-focus-visible': {
    strokeColor: 'indigo-500',
    fillColor: 'transparent',
  },
  'auto-default-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },
  'auto-valid-placeholder': {
    strokeColor: 'jade-400',
    fillColor: 'transparent',
  },
  'auto-valid-default': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'auto-valid-hover': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'auto-valid-active': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'auto-valid-focus-visible': {
    strokeColor: 'jade-500',
    fillColor: 'transparent',
  },
  'auto-valid-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },
  'auto-invalid-placeholder': {
    strokeColor: 'red-300',
    fillColor: 'transparent',
  },
  'auto-invalid-default': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'auto-invalid-hover': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'auto-invalid-active': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'auto-invalid-focus-visible': {
    strokeColor: 'red-400',
    fillColor: 'transparent',
  },
  'auto-invalid-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },
  'auto-warning-placeholder': {
    strokeColor: 'orange-400',
    fillColor: 'transparent',
  },
  'auto-warning-default': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'auto-warning-hover': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'auto-warning-active': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'auto-warning-focus-visible': {
    strokeColor: 'orange-500',
    fillColor: 'transparent',
  },
  'auto-warning-disabled': {
    strokeColor: 'gray-400',
    fillColor: 'transparent',
  },
} as const

// Divider classes - structure: theme
export const DividerClasses = {
  light: 'h-[16px] w-[1px] bg-gray-200',
  dark: 'h-[16px] w-[1px] bg-gray-700',
  auto: 'h-[16px] w-[1px] bg-gray-200 dark:bg-gray-700',
} as const

// Label size classes - padding, font size, line height
export const CssLabelSizeClassesTable = {
  '32': 'px-[8px] text-[14px] leading-[20px]',
  '40': 'px-[16px] text-[16px] leading-[24px]',
  '48': 'px-[16px] text-[16px] leading-[24px]',
} as const

// Label theme classes - text color and background
export const CssLabelThemeClassesTable = {
  light: 'text-gray-700 bg-gray-50',
  dark: 'text-gray-400 bg-gray-900',
  auto: 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900',
} as const

// Label border classes - separate light/dark entries, no dark: prefix
export const CssLabelBorderClassesTable = {
  left: {
    light: 'border-r border-gray-100',
    dark: 'border-r border-gray-800',
    auto: 'border-r border-gray-100 dark:border-r dark:border-gray-800',
  },
  right: {
    light: 'border-l border-gray-100',
    dark: 'border-l border-gray-800',
    auto: 'border-l border-gray-100 dark:border-l dark:border-gray-800',
  },
} as const

// Label rounded classes - based on textbox rounded prop
export const CssLabelRoundedClassesTable = {
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

// Label classes (deprecated - kept for backward compatibility, will be removed)
export const LabelClasses = {
  light: 'text-gray-700 bg-gray-50 border-gray-100 border border-1',
  dark: 'text-gray-400 bg-gray-900 border-gray-800 border border-1',
  auto: 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700',
} as const

// TypeScript types
export type TextboxTheme = 'auto' | 'light' | 'dark'
export type TextboxVariant = 'default' | 'valid' | 'invalid' | 'warning'
export type TextboxState =
  | 'placeholder'
  | 'default'
  | 'hover'
  | 'active'
  | 'focus-visible'
  | 'disabled'
export type TextboxSize = keyof typeof CssInputSizeClassesTable

export const DefaultTheme: TextboxTheme = 'light'
export const DefaultVariant: TextboxVariant = 'default'
export const DefaultSize: TextboxSize = '40'

// Props interface
export interface TextboxProps {
  /**
   * Theme mode: 'auto' adapts to system preference, 'light' or 'dark' forces a mode
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
  labelLeft?: string | any
  /**
   * Icon component on the left side
   */
  iconLeft?: any
  /**
   * Whether to show a divider between iconLeft and input
   */
  divider?: boolean
  /**
   * Icon component on the right side
   */
  iconRight?: any
  /**
   * Label text or element on the right side
   */
  labelRight?: string | any
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
