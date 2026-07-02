// Per-content-type structural classes (gap, alignment, two-line text layout).
// Color and state come from option-item-classes.ts.

// `default` row: icon | label (truncate) | tag | slotRight
export const CssDefaultRowClasses = 'flex items-center'

// `checkbox` row: Checkbox | (label / subText stacked)
// Two-line rows use a slightly taller leading on the primary line so the two
// stacked lines breathe — `leading-[24px]` for both sizes. Font-size still
// tracks the popover size (14px @ 32, 16px @ 40).
// Row aligns to the top so the checkbox stays visually centered against the
// first line (24px tall) when sub-text is present. `!items-start` overrides
// the `items-center` baked into `CssOptionItemBaseClasses` (which still
// applies to default + user rows). The wrapper below boxes the checkbox to
// that same 24px so single- and two-line checkbox rows look identical.
export const CssCheckboxRowClasses = '!items-start'
export const CssCheckboxRowCheckboxWrapperClasses = 'flex items-center h-[24px]'
export const CssCheckboxRowStackClasses = 'flex flex-col min-w-0'
export const CssCheckboxRowLabelClasses = {
  '32': 'text-[14px] leading-[24px]',
  '40': 'text-[16px] leading-[24px]',
} as const

// `user` row: avatar (iconLeft) | (label / secondary stacked)
// Primary line follows the same two-line rule as the checkbox row above.
// Secondary line is always 14/20 regardless of popover size, muted.
export const CssUserRowClasses = 'flex items-center'
export const CssUserRowStackClasses = 'flex flex-col min-w-0'
export const CssUserRowLabelClasses = {
  '32': 'text-[14px] leading-[24px] truncate',
  '40': 'text-[16px] leading-[24px] truncate',
} as const
export const CssUserRowSecondaryClasses = {
  light: 'text-[14px] leading-[20px] text-gray-700 truncate',
  dark: 'text-[14px] leading-[20px] text-gray-500 truncate',
} as const

// `button` row: full-width Button inside the row container
export const CssButtonRowClasses = 'flex items-center w-full'
