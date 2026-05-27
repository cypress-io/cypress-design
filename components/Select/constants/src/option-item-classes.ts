// Option Item per-state classes, keyed by `${theme}-default`.
// Each string includes :hover, data-[focused=true]:, data-[selected=true]:,
// aria-[disabled=true]: modifiers so the same key covers every visual state.
//
// Light- and dark-mode colors are extracted explicitly from the Figma spec
// rather than relying on `dark:` auto-mapping.

export const CssOptionItemBaseClasses = [
  // Base layout
  'flex items-center w-full',
  'rounded-[4px] cursor-pointer select-none',
  'text-gray-900 font-normal',
  'transition-colors duration-100',
].join(' ')

export const CssOptionItemClasses = {
  // Light mode
  'light-default': [
    // Default text
    'text-gray-900',
    // Hover (mouse) + keyboard-focused (data-focused) share the same look
    'hover:bg-gray-50',
    'data-[focused=true]:bg-gray-50',
    // Active (mouse down)
    'active:bg-indigo-100',
    // Selected
    'data-[selected=true]:bg-indigo-50 data-[selected=true]:text-indigo-500',
    // Selected + hover/focused: bump to slightly darker
    'data-[selected=true]:hover:bg-indigo-100',
    'data-[selected=true]:data-[focused=true]:bg-indigo-100',
    // Focus-visible ring (keyboard reached the row directly — rare since
    // arrows use data-focused, but keep it for completeness)
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300/35 focus-visible:outline-offset-[-2px]',
    // Disabled
    'aria-[disabled=true]:text-gray-300 aria-[disabled=true]:cursor-not-allowed',
    'aria-[disabled=true]:hover:bg-transparent aria-[disabled=true]:data-[focused=true]:bg-transparent',
  ].join(' '),

  // Dark mode
  'dark-default': [
    'text-gray-300',
    'hover:bg-gray-900',
    'data-[focused=true]:bg-gray-900',
    'active:bg-indigo-500/30',
    'data-[selected=true]:bg-indigo-500/20 data-[selected=true]:text-indigo-300',
    'data-[selected=true]:hover:bg-indigo-500/30',
    'data-[selected=true]:data-[focused=true]:bg-indigo-500/30',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300/35 focus-visible:outline-offset-[-2px]',
    'aria-[disabled=true]:text-gray-700 aria-[disabled=true]:cursor-not-allowed',
    'aria-[disabled=true]:hover:bg-transparent aria-[disabled=true]:data-[focused=true]:bg-transparent',
  ].join(' '),
} as const

// Icon (iconLeft) color per theme, mirrors the row text color.
export const CssOptionItemIconColorClasses = {
  light: 'text-gray-600 shrink-0',
  dark: 'text-gray-400 shrink-0',
} as const

// Label takes the remaining horizontal space inside a row.
export const CssOptionItemLabelClasses = 'flex-1 min-w-0 truncate'

// Sub-text (used by `checkbox`, `user` content types) — smaller, muted.
export const CssOptionItemSubTextClasses = {
  light: 'text-[12px] leading-[16px] text-gray-700',
  dark: 'text-[12px] leading-[16px] text-gray-500',
} as const

// Headline row — non-interactive section heading.
export const CssOptionHeadlineClasses = {
  light:
    'text-[12px] leading-[16px] font-medium uppercase tracking-wide text-gray-600 px-[12px] py-[6px]',
  dark: 'text-[12px] leading-[16px] font-medium uppercase tracking-wide text-gray-500 px-[12px] py-[6px]',
} as const

// Divider row — horizontal rule.
export const CssOptionDividerClasses = {
  light: 'h-[1px] bg-gray-100 my-[4px]',
  dark: 'h-[1px] bg-gray-800 my-[4px]',
} as const
