// Base static classes for textbox
export const CssStaticClasses =
  'border border-solid flex items-center w-full transition-colors duration-150 outline-none'

// Size classes
export const CssSizeClassesTable = {
  '32': 'h-[32px] text-[14px] leading-[20px]',
  '40': 'h-[40px] text-[14px] leading-[20px]',
  '48': 'h-[48px] text-[14px] leading-[20px]',
} as const

export const DefaultSize: keyof typeof CssSizeClassesTable = '40'

export type TextboxSizes = keyof typeof CssSizeClassesTable

// Rounded corners classes
export const CssRoundedClasses = {
  false: 'rounded-[4px]',
  true: 'rounded-[28px]',
} as const

export const DefaultRounded: keyof typeof CssRoundedClasses = 'false'

export type TextboxRounded = keyof typeof CssRoundedClasses

// State variant classes - Light Mode
// Each state has its own placeholder, hover, active, and focus styles
export const CssVariantClassesTableLight = {
  default: {
    placeholder: {
      background: 'bg-gray-50',
      stroke: 'border-gray-100',
      text: 'text-gray-700',
      iconFill: 'text-gray-50',
      iconStroke: 'text-gray-500',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-gray-100',
      text: 'text-gray-900',
      iconFill: 'text-gray-50',
      iconStroke: 'text-gray-500',
    },
    hover: {
      strokeOutside: 'border-gray-300/25',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-gray-200',
      groupHoverIconFill: 'group-hover:text-gray-50',
      groupHoverIconStroke: 'group-hover:text-gray-500',
    },
    active: {
      strokeOutside: 'border-[3px] border-indigo-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-white',
      groupFocusWithinStroke: 'group-focus-within:border-indigo-300',
      groupFocusWithinIconFill: 'group-focus-within:text-indigo-200',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-indigo-500',
    },
    focus: {
      strokeOutside: 'border-[3px] border-indigo-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-white',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-indigo-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-indigo-200',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-indigo-500',
    },
  },
  valid: {
    placeholder: {
      background: 'bg-white',
      stroke: 'border-jade-300',
      strokeOutside: 'border-2 border-jade-300/35',
      text: 'text-jade-500',
      iconFill: 'text-jade-200',
      iconStroke: 'text-jade-500',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-jade-300',
      strokeOutside: 'border-2 border-jade-300/35',
      text: 'text-jade-500',
      iconFill: 'text-jade-200',
      iconStroke: 'text-jade-500',
    },
    hover: {
      strokeOutside: 'border-2 border-jade-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-jade-300',
      groupHoverIconFill: 'group-hover:text-jade-200',
      groupHoverIconStroke: 'group-hover:text-jade-500',
    },
    active: {
      strokeOutside: 'border-[3px] border-jade-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-white',
      groupFocusWithinStroke: 'group-focus-within:border-jade-300',
      groupFocusWithinIconFill: 'group-focus-within:text-jade-200',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-jade-500',
    },
    focus: {
      strokeOutside: 'border-[3px] border-jade-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-white',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-jade-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-jade-200',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-jade-500',
    },
  },
  invalid: {
    placeholder: {
      background: 'bg-white',
      stroke: 'border-red-300',
      strokeOutside: 'border-2 border-red-300/35',
      text: 'text-red-500',
      iconFill: 'text-red-200',
      iconStroke: 'text-red-500',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-red-300',
      strokeOutside: 'border-2 border-red-300/35',
      text: 'text-red-500',
      iconFill: 'text-red-200',
      iconStroke: 'text-red-500',
    },
    hover: {
      strokeOutside: 'border-2 border-red-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-red-300',
      groupHoverIconFill: 'group-hover:text-red-200',
      groupHoverIconStroke: 'group-hover:text-red-500',
    },
    active: {
      strokeOutside: 'border-[3px] border-red-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-white',
      groupFocusWithinStroke: 'group-focus-within:border-red-300',
      groupFocusWithinIconFill: 'group-focus-within:text-red-200',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-red-500',
    },
    focus: {
      strokeOutside: 'border-[3px] border-red-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-white',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-red-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-red-200',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-red-500',
    },
  },
  warning: {
    placeholder: {
      background: 'bg-white',
      stroke: 'border-orange-300',
      strokeOutside: 'border-2 border-orange-300/35',
      text: 'text-orange-500',
      iconFill: 'text-orange-200',
      iconStroke: 'text-orange-500',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-orange-300',
      strokeOutside: 'border-2 border-orange-300/35',
      text: 'text-orange-500',
      iconFill: 'text-orange-200',
      iconStroke: 'text-orange-500',
    },
    hover: {
      strokeOutside: 'border-2 border-orange-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-orange-300',
      groupHoverIconFill: 'group-hover:text-orange-200',
      groupHoverIconStroke: 'group-hover:text-orange-500',
    },
    active: {
      strokeOutside: 'border-[3px] border-orange-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-white',
      groupFocusWithinStroke: 'group-focus-within:border-orange-300',
      groupFocusWithinIconFill: 'group-focus-within:text-orange-200',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-orange-500',
    },
    focus: {
      strokeOutside: 'border-[3px] border-orange-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-white',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-orange-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-orange-200',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-orange-500',
    },
  },
  disabled: {
    default: {
      background: 'bg-gray-50',
      stroke: 'border-gray-50',
      text: 'text-gray-500',
      iconFill: 'text-gray-50',
      iconStroke: 'text-gray-400',
    },
  },
} as const

// State variant classes - Dark Mode
export const CssVariantClassesTableDark = {
  default: {
    placeholder: {
      background: 'bg-gray-900',
      stroke: 'border-gray-800',
      text: 'text-gray-400',
      iconFill: 'text-gray-800',
      iconStroke: 'text-gray-500',
    },
    default: {
      background: 'bg-gray-950',
      stroke: 'border-gray-800',
      text: 'text-gray-300',
      iconFill: 'text-gray-800',
      iconStroke: 'text-gray-500',
    },
    hover: {
      strokeOutside: 'border-2 border-white/10',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-gray-950',
      groupHoverStroke: 'group-hover:border-gray-800',
      groupHoverIconFill: 'group-hover:text-indigo-500',
      groupHoverIconStroke: 'group-hover:text-indigo-300',
    },
    active: {
      strokeOutside: 'border-[3px] border-indigo-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-gray-950',
      groupFocusWithinStroke: 'group-focus-within:border-indigo-300',
      groupFocusWithinIconFill: 'group-focus-within:text-indigo-500',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-indigo-300',
    },
    focus: {
      strokeOutside: 'border-[3px] border-indigo-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-gray-950',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-indigo-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-indigo-500',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-indigo-300',
    },
  },
  valid: {
    placeholder: {
      background: 'bg-gray-950',
      stroke: 'border-jade-300',
      strokeOutside: 'border-2 border-jade-300/35',
      text: 'text-jade-400',
      iconFill: 'text-jade-500',
      iconStroke: 'text-jade-300',
    },
    default: {
      background: 'bg-gray-950',
      stroke: 'border-jade-300',
      strokeOutside: 'border-2 border-jade-300/35',
      text: 'text-jade-400',
      iconFill: 'text-jade-500',
      iconStroke: 'text-jade-300',
    },
    hover: {
      strokeOutside: 'border-2 border-jade-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-gray-950',
      groupHoverStroke: 'group-hover:border-jade-300',
      groupHoverIconFill: 'group-hover:text-jade-500',
      groupHoverIconStroke: 'group-hover:text-jade-300',
    },
    active: {
      strokeOutside: 'border-[3px] border-jade-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-gray-950',
      groupFocusWithinStroke: 'group-focus-within:border-jade-300',
      groupFocusWithinIconFill: 'group-focus-within:text-jade-500',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-jade-300',
    },
    focus: {
      strokeOutside: 'border-[3px] border-jade-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-gray-950',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-jade-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-jade-500',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-jade-300',
    },
  },
  invalid: {
    placeholder: {
      background: 'bg-gray-950',
      stroke: 'border-red-300',
      strokeOutside: 'border-2 border-red-300/35',
      text: 'text-red-400',
      iconFill: 'text-red-500',
      iconStroke: 'text-red-300',
    },
    default: {
      background: 'bg-gray-950',
      stroke: 'border-red-300',
      strokeOutside: 'border-2 border-red-300/35',
      text: 'text-red-400',
      iconFill: 'text-red-500',
      iconStroke: 'text-red-300',
    },
    hover: {
      strokeOutside: 'border-2 border-red-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-gray-950',
      groupHoverStroke: 'group-hover:border-red-300',
      groupHoverIconFill: 'group-hover:text-red-500',
      groupHoverIconStroke: 'group-hover:text-red-300',
    },
    active: {
      strokeOutside: 'border-[3px] border-red-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-gray-950',
      groupFocusWithinStroke: 'group-focus-within:border-red-300',
      groupFocusWithinIconFill: 'group-focus-within:text-red-500',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-red-300',
    },
    focus: {
      strokeOutside: 'border-[3px] border-red-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-gray-950',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-red-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-red-500',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-red-300',
    },
  },
  warning: {
    placeholder: {
      background: 'bg-gray-950',
      stroke: 'border-orange-300',
      strokeOutside: 'border-2 border-orange-300/35',
      text: 'text-orange-400',
      iconFill: 'text-orange-500',
      iconStroke: 'text-orange-300',
    },
    default: {
      background: 'bg-gray-950',
      stroke: 'border-orange-300',
      strokeOutside: 'border-2 border-orange-300/35',
      text: 'text-orange-400',
      iconFill: 'text-orange-500',
      iconStroke: 'text-orange-300',
    },
    hover: {
      strokeOutside: 'border-2 border-orange-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-gray-950',
      groupHoverStroke: 'group-hover:border-orange-300',
      groupHoverIconFill: 'group-hover:text-orange-500',
      groupHoverIconStroke: 'group-hover:text-orange-300',
    },
    active: {
      strokeOutside: 'border-[3px] border-orange-300/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-gray-950',
      groupFocusWithinStroke: 'group-focus-within:border-orange-300',
      groupFocusWithinIconFill: 'group-focus-within:text-orange-500',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-orange-300',
    },
    focus: {
      strokeOutside: 'border-[3px] border-orange-300/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-gray-950',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-orange-300',
      groupFocusVisibleIconFill: 'group-focus-visible:text-orange-500',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-orange-300',
    },
  },
  disabled: {
    default: {
      background: 'bg-gray-1000',
      stroke: 'border-gray-900',
      text: 'text-gray-700',
      iconFill: 'text-gray-800',
      iconStroke: 'text-gray-700',
    },
  },
} as const

export type TextboxVariants = keyof typeof CssVariantClassesTableLight
export type TextboxStateStyles =
  | 'placeholder'
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'

export const DefaultVariant: TextboxVariants = 'default'

// Note: All dynamically constructed classes (with group-hover: and group-focus-within: prefixes)
// are now included directly in the constants objects above. This ensures Tailwind can scan them
// directly from the source code without needing a separate safelist or rebuild step.
// When you modify a constant (e.g., stroke: 'border-gray-400'), also update the corresponding
// prefixed version (e.g., groupHoverStroke: 'group-hover:border-gray-400') in the same object.

// Label classes - Light Mode
export const CssLabelClasses = {
  background: 'bg-gray-50',
  stroke: 'border-gray-100',
  text: 'text-gray-700',
  padding: 'px-[16px]',
  rounded: {
    false: 'rounded-bl-[4px] rounded-tl-[4px]',
    true: 'rounded-bl-[38px] rounded-tl-[38px]',
  },
  // Border states that match input states - labels respond to group states
  default: {
    stroke: 'border-gray-100',
  },
  placeholder: {
    stroke: 'border-gray-100',
  },
  hover: {
    stroke: 'group-hover:border-gray-200',
  },
  active: {
    stroke: 'group-focus-within:border-indigo-300',
  },
  focus: {
    stroke:
      'group-focus-visible:border-2 group-focus-visible:border-indigo-300',
  },
} as const

// Label classes - Dark Mode
export const CssLabelClassesDark = {
  background: 'bg-gray-900',
  stroke: 'border-gray-800',
  text: 'text-gray-400',
  padding: 'px-[16px]',
  rounded: {
    false: 'rounded-bl-[4px] rounded-tl-[4px]',
    true: 'rounded-bl-[38px] rounded-tl-[38px]',
  },
  // Border states that match input states - labels respond to group states
  default: {
    stroke: 'border-gray-800',
  },
  placeholder: {
    stroke: 'border-gray-800',
  },
  hover: {
    stroke: 'group-hover:border-gray-800',
  },
  active: {
    stroke: 'group-focus-within:border-indigo-300',
  },
  focus: {
    stroke:
      'group-focus-visible:border-2 group-focus-visible:border-indigo-300',
  },
} as const

export interface TextboxProps {
  /**
   * Size (height) of the textbox (in pixels)
   */
  size?: TextboxSizes
  /**
   * Visual state variant of the textbox
   */
  variant?: TextboxVariants
  /**
   * Whether the textbox has rounded corners
   */
  rounded?: TextboxRounded
  /**
   * Whether to use dark mode styling
   */
  darkMode?: boolean
  /**
   * Label text to display on the left side
   */
  labelLeft?: string
  /**
   * Label text to display on the right side
   */
  labelRight?: string
  /**
   * Icon component to display on the left side
   */
  iconLeft?: any
  /**
   * Icon component to display on the right side
   */
  iconRight?: any
  /**
   * Whether the textbox is disabled
   */
  disabled?: boolean
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Input value
   */
  value?: string
}
