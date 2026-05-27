// Popover panel + header + footer classes, keyed by theme.

export const CssPopoverClasses = {
  light:
    'bg-white border border-gray-100 rounded-[6px] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.16)]',
  dark: 'bg-gray-1000 border border-gray-800 rounded-[6px] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]',
} as const

export const CssHeaderClasses = {
  light: 'border-b border-gray-100',
  dark: 'border-b border-gray-800',
} as const

export const CssHeaderTitleClasses = {
  light: 'text-[14px] leading-[20px] font-medium text-gray-900 px-[4px]',
  dark: 'text-[14px] leading-[20px] font-medium text-gray-300 px-[4px]',
} as const

export const CssFooterClasses = {
  light: 'border-t border-gray-100',
  dark: 'border-t border-gray-800',
} as const

export const CssFooterLabelClasses = {
  light: 'text-[14px] leading-[20px] text-gray-700',
  dark: 'text-[14px] leading-[20px] text-gray-400',
} as const

// Empty-state message shown when search filtering returns no rows.
export const CssEmptyStateClasses = {
  light: 'text-[14px] leading-[20px] text-gray-500 text-center py-[12px]',
  dark: 'text-[14px] leading-[20px] text-gray-500 text-center py-[12px]',
} as const
