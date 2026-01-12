// Base static classes for all textboxes
export const CssStaticClasses =
  'flex items-center border border-solid transition-colors duration-150 ' +
  'focus-within:outline-none focus-within:z-10 focus-visible:outline-2 focus-visible:outline-offset-0'

// Size classes - height, padding, font size
export const CssSizeClassesTable = {
  '32': 'h-[32px] px-[12px] text-[14px] leading-[20px]',
  '40': 'h-[40px] px-[16px] text-[14px] leading-[20px]',
  '48': 'h-[48px] px-[16px] text-[14px] leading-[20px]',
} as const

// Rounded classes
export const CssRoundedClasses = {
  false: 'rounded-[4px]',
  true: 'rounded-[28px]',
} as const

// Variant classes - structure: theme-type-state
// Light mode colors extracted from Figma
// Dark mode colors extracted from Figma (explicit, not auto-mapped)
export const CssVariantClassesTable = {
  // Light mode - Default type
  'light-default-placeholder':
    'bg-gray-50 border-gray-100 text-gray-700 placeholder:text-gray-700',
  'light-default-default':
    'bg-white border-gray-200 text-gray-900 hover:border-gray-300 hover:text-gray-900 focus-within:border-indigo-500 focus-within:text-gray-900 focus-within:hover:border-indigo-500 focus-visible:outline-indigo-500',
  'light-default-hover':
    'bg-white border-gray-600 text-gray-900 focus-within:border-indigo-500 focus-visible:outline-indigo-500 outline-2 outline-indigo-500',
  'light-default-active':
    'bg-white border-indigo-500 text-gray-900 focus-visible:outline-indigo-500',
  'light-default-focus-visible':
    'bg-white border-indigo-500 text-gray-900 focus-visible:outline-2 focus-visible:outline-indigo-500',
  'light-default-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',

  // Light mode - Valid type
  'light-valid-placeholder':
    'bg-white border-jade-400 text-gray-500 placeholder:text-gray-500',
  'light-valid-default':
    'bg-white border-jade-400 text-jade-600 hover:border-jade-500 focus-within:border-jade-500 focus-within:hover:border-jade-500 focus-visible:outline-jade-500',
  'light-valid-hover':
    'bg-white border-jade-500 text-jade-600 focus-within:border-jade-500 focus-visible:outline-jade-500',
  'light-valid-active':
    'bg-white border-jade-500 text-jade-600 focus-visible:outline-jade-500',
  'light-valid-focus-visible':
    'bg-white border-jade-500 text-jade-600 focus-visible:outline-2 focus-visible:outline-jade-500',
  'light-valid-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',

  // Light mode - Invalid type
  'light-invalid-placeholder':
    'bg-white border-red-300 text-gray-500 placeholder:text-gray-500',
  'light-invalid-default':
    'bg-white border-red-300 text-red-600 hover:border-red-400 focus-within:border-red-400 focus-within:hover:border-red-400 focus-visible:outline-red-500',
  'light-invalid-hover':
    'bg-white border-red-400 text-red-600 focus-within:border-red-400 focus-visible:outline-red-500',
  'light-invalid-active':
    'bg-white border-red-400 text-red-600 focus-visible:outline-red-500',
  'light-invalid-focus-visible':
    'bg-white border-red-400 text-red-600 focus-visible:outline-2 focus-visible:outline-red-500',
  'light-invalid-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',

  // Light mode - Warning type
  'light-warning-placeholder':
    'bg-white border-orange-300 text-gray-500 placeholder:text-gray-500',
  'light-warning-default':
    'bg-white border-orange-300 text-orange-600 hover:border-orange-400 focus-within:border-orange-400 focus-within:hover:border-orange-400 focus-visible:outline-orange-500',
  'light-warning-hover':
    'bg-white border-orange-400 text-orange-600 focus-within:border-orange-400 focus-visible:outline-orange-500',
  'light-warning-active':
    'bg-white border-orange-400 text-orange-600 focus-visible:outline-orange-500',
  'light-warning-focus-visible':
    'bg-white border-orange-400 text-orange-600 focus-visible:outline-2 focus-visible:outline-orange-500',
  'light-warning-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',

  // Dark mode - Default type (explicit colors from Figma)
  'dark-default-placeholder':
    'bg-gray-800 border-gray-700 text-gray-400 placeholder:text-gray-400',
  'dark-default-default':
    'bg-gray-800 border-gray-700 text-gray-200 hover:border-gray-600 focus-within:border-indigo-400 focus-within:hover:border-indigo-400 focus-visible:outline-indigo-400',
  'dark-default-hover':
    'bg-gray-800 border-gray-600 text-gray-200 focus-within:border-indigo-400 focus-visible:outline-indigo-400',
  'dark-default-active':
    'bg-gray-800 border-indigo-400 text-gray-200 focus-visible:outline-indigo-400',
  'dark-default-focus-visible':
    'bg-gray-800 border-indigo-400 text-gray-200 focus-visible:outline-2 focus-visible:outline-indigo-400',
  'dark-default-disabled':
    'bg-gray-1000 border-gray-800 text-gray-600 cursor-not-allowed',

  // Dark mode - Valid type
  'dark-valid-placeholder':
    'bg-gray-800 border-jade-400 text-gray-400 placeholder:text-gray-400',
  'dark-valid-default':
    'bg-gray-800 border-jade-400 text-jade-400 hover:border-jade-500 focus-within:border-jade-500 focus-within:hover:border-jade-500 focus-visible:outline-jade-500',
  'dark-valid-hover':
    'bg-gray-800 border-jade-500 text-jade-400 focus-within:border-jade-500 focus-visible:outline-jade-500',
  'dark-valid-active':
    'bg-gray-800 border-jade-400 text-jade-400 focus-visible:outline-jade-500',
  'dark-valid-focus-visible':
    'bg-gray-800 border-jade-400 text-jade-400 focus-visible:outline-2 focus-visible:outline-jade-500',
  'dark-valid-disabled':
    'bg-gray-1000 border-gray-800 text-gray-600 cursor-not-allowed',

  // Dark mode - Invalid type
  'dark-invalid-placeholder':
    'bg-gray-800 border-red-300 text-gray-400 placeholder:text-gray-400',
  'dark-invalid-default':
    'bg-gray-800 border-red-300 text-red-300 hover:border-red-400 focus-within:border-red-400 focus-within:hover:border-red-400 focus-visible:outline-red-400',
  'dark-invalid-hover':
    'bg-gray-800 border-red-400 text-red-300 focus-within:border-red-400 focus-visible:outline-red-400',
  'dark-invalid-active':
    'bg-gray-800 border-red-300 text-red-300 focus-visible:outline-red-400',
  'dark-invalid-focus-visible':
    'bg-gray-800 border-red-300 text-red-300 focus-visible:outline-2 focus-visible:outline-red-400',
  'dark-invalid-disabled':
    'bg-gray-1000 border-gray-800 text-gray-600 cursor-not-allowed',

  // Dark mode - Warning type
  'dark-warning-placeholder':
    'bg-gray-800 border-orange-400 text-gray-400 placeholder:text-gray-400',
  'dark-warning-default':
    'bg-gray-800 border-orange-400 text-orange-400 hover:border-orange-500 focus-within:border-orange-500 focus-within:hover:border-orange-500 focus-visible:outline-orange-500',
  'dark-warning-hover':
    'bg-gray-800 border-orange-500 text-orange-400 focus-within:border-orange-500 focus-visible:outline-orange-500',
  'dark-warning-active':
    'bg-gray-800 border-orange-400 text-orange-400 focus-visible:outline-orange-500',
  'dark-warning-focus-visible':
    'bg-gray-800 border-orange-400 text-orange-400 focus-visible:outline-2 focus-visible:outline-orange-500',
  'dark-warning-disabled':
    'bg-gray-1000 border-gray-800 text-gray-600 cursor-not-allowed',

  // Auto theme - combines light + dark with dark: prefix
  // Uses explicit dark mode colors from Figma (not auto-mapped)
  'auto-default-placeholder':
    'bg-white border-gray-200 text-gray-700 placeholder:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400',
  'auto-default-default':
    'bg-white border-gray-200 text-gray-900 hover:border-gray-300 hover:text-gray-900 focus-within:border-indigo-500 focus-within:hover:border-indigo-500 focus-visible:outline-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-600 dark:focus-within:border-indigo-400 dark:focus-within:hover:border-indigo-400 dark:focus-visible:outline-indigo-400',
  'auto-default-hover':
    'bg-white border-gray-300 text-gray-900 focus-within:border-indigo-500 focus-visible:outline-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:focus-within:border-indigo-400 dark:focus-visible:outline-indigo-400',
  'auto-default-active':
    'bg-white border-indigo-500 text-gray-900 focus-visible:outline-indigo-500 dark:bg-gray-800 dark:border-indigo-400 dark:text-gray-200 dark:focus-visible:outline-indigo-400',
  'auto-default-focus-visible':
    'bg-white border-indigo-500 text-gray-900 focus-visible:outline-2 focus-visible:outline-indigo-500 dark:bg-gray-800 dark:border-indigo-400 dark:text-gray-200 dark:focus-visible:outline-2 dark:focus-visible:outline-indigo-400',
  'auto-default-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-1000 dark:border-gray-800 dark:text-gray-600',

  'auto-valid-placeholder':
    'bg-white border-jade-400 text-gray-500 placeholder:text-gray-500 dark:bg-gray-800 dark:border-jade-400 dark:text-gray-400 dark:placeholder:text-gray-400',
  'auto-valid-default':
    'bg-white border-jade-400 text-jade-600 hover:border-jade-500 focus-within:border-jade-500 focus-within:hover:border-jade-500 focus-visible:outline-jade-500 dark:bg-gray-800 dark:border-jade-400 dark:text-jade-400 dark:hover:border-jade-500 dark:focus-within:border-jade-500 dark:focus-within:hover:border-jade-500 dark:focus-visible:outline-jade-500',
  'auto-valid-hover':
    'bg-white border-jade-500 text-jade-600 focus-within:border-jade-500 focus-visible:outline-jade-500 dark:bg-gray-800 dark:border-jade-500 dark:text-jade-400 dark:focus-within:border-jade-500 dark:focus-visible:outline-jade-500',
  'auto-valid-active':
    'bg-white border-jade-500 text-jade-600 focus-visible:outline-jade-500 dark:bg-gray-800 dark:border-jade-400 dark:text-jade-400 dark:focus-visible:outline-jade-500',
  'auto-valid-focus-visible':
    'bg-white border-jade-500 text-jade-600 focus-visible:outline-2 focus-visible:outline-jade-500 dark:bg-gray-800 dark:border-jade-400 dark:text-jade-400 dark:focus-visible:outline-2 dark:focus-visible:outline-jade-500',
  'auto-valid-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-1000 dark:border-gray-800 dark:text-gray-600',

  'auto-invalid-placeholder':
    'bg-white border-red-300 text-gray-500 placeholder:text-gray-500 dark:bg-gray-800 dark:border-red-300 dark:text-gray-400 dark:placeholder:text-gray-400',
  'auto-invalid-default':
    'bg-white border-red-300 text-red-600 hover:border-red-400 focus-within:border-red-400 focus-within:hover:border-red-400 focus-visible:outline-red-500 dark:bg-gray-800 dark:border-red-300 dark:text-red-300 dark:hover:border-red-400 dark:focus-within:border-red-400 dark:focus-within:hover:border-red-400 dark:focus-visible:outline-red-400',
  'auto-invalid-hover':
    'bg-white border-red-400 text-red-600 focus-within:border-red-400 focus-visible:outline-red-500 dark:bg-gray-800 dark:border-red-400 dark:text-red-300 dark:focus-within:border-red-400 dark:focus-visible:outline-red-400',
  'auto-invalid-active':
    'bg-white border-red-400 text-red-600 focus-visible:outline-red-500 dark:bg-gray-800 dark:border-red-300 dark:text-red-300 dark:focus-visible:outline-red-400',
  'auto-invalid-focus-visible':
    'bg-white border-red-400 text-red-600 focus-visible:outline-2 focus-visible:outline-red-500 dark:bg-gray-800 dark:border-red-300 dark:text-red-300 dark:focus-visible:outline-2 dark:focus-visible:outline-red-400',
  'auto-invalid-disabled':
    'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-1000 dark:border-gray-800 dark:text-gray-600',

  'auto-warning-placeholder':
    'bg-white border-orange-300 text-gray-500 placeholder:text-gray-500 dark:bg-gray-800 dark:border-orange-400 dark:text-gray-400 dark:placeholder:text-gray-400',
  'auto-warning-default':
    'bg-white border-orange-300 text-orange-600 hover:border-orange-400 focus-within:border-orange-400 focus-within:hover:border-orange-400 focus-visible:outline-orange-500 dark:bg-gray-800 dark:border-orange-400 dark:text-orange-400 dark:hover:border-orange-500 dark:focus-within:border-orange-500 dark:focus-within:hover:border-orange-500 dark:focus-visible:outline-orange-500',
  'auto-warning-hover':
    'bg-white border-orange-400 text-orange-600 focus-within:border-orange-400 focus-visible:outline-orange-500 dark:bg-gray-800 dark:border-orange-500 dark:text-orange-400 dark:focus-within:border-orange-500 dark:focus-visible:outline-orange-500',
  'auto-warning-active':
    'bg-white border-orange-400 text-orange-600 focus-visible:outline-orange-500 dark:bg-gray-800 dark:border-orange-400 dark:text-orange-400 dark:focus-visible:outline-orange-500',
  'auto-warning-focus-visible':
    'bg-white border-orange-400 text-orange-600 focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-gray-800 dark:border-orange-400 dark:text-orange-400 dark:focus-visible:outline-2 dark:focus-visible:outline-orange-500',
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

// Label classes
export const LabelClasses = {
  light: 'text-gray-600 bg-gray-50 border-gray-200',
  dark: 'text-gray-400 bg-gray-800 border-gray-700',
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
export type TextboxSize = keyof typeof CssSizeClassesTable

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
