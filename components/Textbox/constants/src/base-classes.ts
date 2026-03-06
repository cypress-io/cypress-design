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
