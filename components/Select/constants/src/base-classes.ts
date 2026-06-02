// Base / static / sizing classes for the Select component.
// Theme- and state-specific styling lives in the other constants files.

export const CssWrapperClasses = 'relative inline-block'

// Width applied to the default trigger button. The popover handles its own width.
export const CssTriggerWidthClasses = 'w-fit'

// Trigger content (label + chevron) layout inside the Button.
export const CssTriggerContentClasses = 'flex items-center gap-[8px]'

// Chevron icon rotation when the popover is open. Pair with `transition-transform`.
export const CssChevronClasses = 'transition-transform duration-150 shrink-0'
export const CssChevronOpenClasses = 'rotate-180'

// Popover panel layout: stack header, scrollable items, footer vertically.
export const CssPopoverLayoutClasses =
  'absolute z-50 flex flex-col mt-[4px] overflow-hidden'

// Items area takes the remaining height, scrolls vertically when content overflows.
// `min-h-0` is required so `overflow-y-auto` actually clips inside a flex container.
// Figma spec: 8px padding all around the items, and a 1px gap between rows so
// each rounded option item reads as its own rectangle.
export const CssItemsContainerClasses =
  'flex-1 min-h-0 overflow-y-auto p-[8px] flex flex-col gap-[1px]'

// Header / footer are pinned (never scroll); items area scrolls between them.
// Both also use 8px inset padding so their content lines up with the items area.
export const CssHeaderContainerClasses =
  'shrink-0 flex flex-col gap-[8px] p-[8px]'
export const CssFooterContainerClasses =
  'shrink-0 flex items-center justify-between gap-[8px] p-[8px]'

// Popover alignment relative to the trigger.
export const CssAlignmentClasses = {
  left: 'left-0',
  right: 'right-0',
} as const

// Per-size font + line-height applied to the popover root so option items
// inherit it. Header title and footer label define their own font-size, so
// the panel-level text-size only governs row text.
// Figma spec:
//   32 → 14px / 20px line-height + 6px vertical padding = 32px tall row
//   40 → 16px / 24px line-height + 8px vertical padding = 40px tall row
export const CssPopoverSizeClasses = {
  '32': 'text-[14px] leading-[20px]',
  '40': 'text-[16px] leading-[24px]',
} as const

// Row height by size — applied to each option item wrapper as a floor so
// empty / single-icon rows still hit the spec'd height.
export const CssOptionItemHeightClasses = {
  '32': 'min-h-[32px]',
  '40': 'min-h-[40px]',
} as const

// Per-size padding for option rows. Vertical padding combined with the
// line-height produces the total row height (see CssPopoverSizeClasses).
export const CssOptionItemPaddingClasses = {
  '32': 'px-[8px] py-[6px]',
  '40': 'px-[8px] py-[8px]',
} as const

// Gap inside an option row between iconLeft, label, slotRight, etc.
export const CssOptionItemGapClasses = 'gap-[8px]'
