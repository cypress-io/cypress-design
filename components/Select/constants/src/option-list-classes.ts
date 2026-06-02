// Popover panel + header + footer classes, keyed by theme.
//
// Figma uses NO drop shadow on the panel. The chrome is a 1px inside border
// plus a 3px outside outline — light mode uses muted gray, dark mode uses
// indigo. Tokens come from Components/Inputs/Select/Option List/Card/Outline
// in Figma (light node 4980:25030, dark node 5116:122785).
export const CssPopoverClasses = {
  light:
    'bg-white border border-gray-400 rounded-[4px] outline outline-[3px] outline-offset-0 outline-gray-1000/[0.07]',
  dark: 'bg-gray-1000 border border-indigo-300 rounded-[4px] outline outline-[3px] outline-offset-0 outline-indigo-300/35',
} as const

export const CssHeaderClasses = {
  light: 'border-b border-gray-100',
  dark: 'border-b border-gray-800',
} as const

// Header title visually matches an in-list `headline` row: same font weight,
// same muted color, inherits font-size from the popover root so it scales
// with `size`. Render code applies the per-size `CssOptionItemPaddingClasses`
// so the title aligns with the option rows below it.
export const CssHeaderTitleClasses = {
  light: 'font-medium text-gray-600',
  dark: 'font-medium text-gray-500',
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
