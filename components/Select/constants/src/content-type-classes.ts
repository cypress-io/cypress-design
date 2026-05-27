// Per-content-type structural classes (gap, alignment, two-line text layout).
// Color and state come from option-item-classes.ts.

// `default` row: icon | label (truncate) | tag | slotRight
export const CssDefaultRowClasses = 'flex items-center'

// `checkbox` row: Checkbox | (label / subText stacked)
export const CssCheckboxRowClasses = 'flex items-center'
export const CssCheckboxRowStackClasses = 'flex flex-col min-w-0'
export const CssCheckboxRowLabelClasses = 'text-[14px] leading-[20px]'

// `user` row: avatar (iconLeft) | (label / secondary stacked)
export const CssUserRowClasses = 'flex items-center'
export const CssUserRowStackClasses = 'flex flex-col min-w-0'
export const CssUserRowLabelClasses = 'text-[14px] leading-[20px] truncate'
export const CssUserRowSecondaryClasses = {
  light: 'text-[12px] leading-[16px] text-gray-600 truncate',
  dark: 'text-[12px] leading-[16px] text-gray-500 truncate',
} as const

// `button` row: full-width Button inside the row container
export const CssButtonRowClasses = 'flex items-center w-full'
