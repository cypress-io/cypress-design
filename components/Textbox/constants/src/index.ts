// Base static classes for textbox
export const CssStaticClasses =
  'border border-solid flex items-center w-full transition-colors duration-150 outline-none'

// Size classes
export const CssSizeClassesTable = {
  '32': 'h-[32px] text-[14px] leading-[20px] px-[12px]',
  '40': 'h-[40px] text-[14px] leading-[20px] px-[16px]',
  '48': 'h-[48px] text-[14px] leading-[20px] px-[16px]',
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
      iconFill: 'text-gray-500',
      iconStroke: 'text-gray-50',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-gray-100',
      text: 'text-[#2e3247]',
      iconFill: 'text-gray-500',
      iconStroke: 'text-gray-50',
    },
    hover: {
      strokeOutside: 'border-gray-300/25',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-gray-200',
      groupHoverIconFill: 'group-hover:text-gray-50',
      groupHoverIconStroke: 'group-hover:[&>*]:text-gray-500',
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
      stroke: 'border-[#69d3a7]',
      strokeOutside: 'border-2 border-[#69d3a7]/35',
      text: 'text-[#00814d]',
      iconFill: 'text-[#a3e7cb]',
      iconStroke: 'text-[#00814d]',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-[#69d3a7]',
      strokeOutside: 'border-2 border-[#69d3a7]/35',
      text: 'text-[#00814d]',
      iconFill: 'text-[#a3e7cb]',
      iconStroke: 'text-[#00814d]',
    },
    hover: {
      strokeOutside: 'border-2 border-[#69d3a7]/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-[#69d3a7]',
      groupHoverIconFill: 'group-hover:text-[#a3e7cb]',
      groupHoverIconStroke: 'group-hover:[&>*]:text-[#00814d]',
    },
    active: {
      strokeOutside: 'border-[3px] border-[#69d3a7]/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-white',
      groupFocusWithinStroke: 'group-focus-within:border-[#69d3a7]',
      groupFocusWithinIconFill: 'group-focus-within:text-[#a3e7cb]',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-[#00814d]',
    },
    focus: {
      strokeOutside: 'border-[3px] border-[#69d3a7]/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-white',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-[#69d3a7]',
      groupFocusVisibleIconFill: 'group-focus-visible:text-[#a3e7cb]',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-[#00814d]',
    },
  },
  invalid: {
    placeholder: {
      background: 'bg-white',
      stroke: 'border-[#f59aa9]',
      strokeOutside: 'border-2 border-[#f59aa9]/35',
      text: 'text-[#c62b49]',
      iconFill: 'text-[#f8c4cd]',
      iconStroke: 'text-[#c62b49]',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-[#f59aa9]',
      strokeOutside: 'border-2 border-[#f59aa9]/35',
      text: 'text-[#c62b49]',
      iconFill: 'text-[#f8c4cd]',
      iconStroke: 'text-[#c62b49]',
    },
    hover: {
      strokeOutside: 'border-2 border-[#f59aa9]/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-[#f59aa9]',
      groupHoverIconFill: 'group-hover:text-[#f8c4cd]',
      groupHoverIconStroke: 'group-hover:[&>*]:text-[#c62b49]',
    },
    active: {
      strokeOutside: 'border-[3px] border-[#f59aa9]/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-white',
      groupFocusWithinStroke: 'group-focus-within:border-[#f59aa9]',
      groupFocusWithinIconFill: 'group-focus-within:text-[#f8c4cd]',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-[#c62b49]',
    },
    focus: {
      strokeOutside: 'border-[3px] border-[#f59aa9]/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-white',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-[#f59aa9]',
      groupFocusVisibleIconFill: 'group-focus-visible:text-[#f8c4cd]',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-[#c62b49]',
    },
  },
  warning: {
    placeholder: {
      background: 'bg-white',
      stroke: 'border-[#edbb4a]',
      strokeOutside: 'border-2 border-[#edbb4a]/35',
      text: 'text-[#bd5800]',
      iconFill: 'text-[#f1e08f]',
      iconStroke: 'text-[#bd5800]',
    },
    default: {
      background: 'bg-white',
      stroke: 'border-[#edbb4a]',
      strokeOutside: 'border-2 border-[#edbb4a]/35',
      text: 'text-[#bd5800]',
      iconFill: 'text-[#f1e08f]',
      iconStroke: 'text-[#bd5800]',
    },
    hover: {
      strokeOutside: 'border-2 border-[#edbb4a]/35',
      // Tailwind prefixed classes (single source of truth)
      groupHoverBackground: 'group-hover:bg-white',
      groupHoverStroke: 'group-hover:border-[#edbb4a]',
      groupHoverIconFill: 'group-hover:text-[#f1e08f]',
      groupHoverIconStroke: 'group-hover:[&>*]:text-[#bd5800]',
    },
    active: {
      strokeOutside: 'border-[3px] border-[#edbb4a]/35',
      // Tailwind prefixed classes (single source of truth)
      groupFocusWithinBackground: 'group-focus-within:bg-white',
      groupFocusWithinStroke: 'group-focus-within:border-[#edbb4a]',
      groupFocusWithinIconFill: 'group-focus-within:text-[#f1e08f]',
      groupFocusWithinIconStroke: 'group-focus-within:[&>*]:text-[#bd5800]',
    },
    focus: {
      strokeOutside: 'border-[3px] border-[#edbb4a]/35',
      // Tailwind prefixed classes (single source of truth) - using focus-visible for keyboard navigation
      groupFocusVisibleBackground: 'group-focus-visible:bg-white',
      groupFocusVisibleStroke:
        'group-focus-visible:border-2 group-focus-visible:border-[#edbb4a]',
      groupFocusVisibleIconFill: 'group-focus-visible:text-[#f1e08f]',
      groupFocusVisibleIconStroke: 'group-focus-visible:[&>*]:text-[#bd5800]',
    },
  },
  disabled: {
    default: {
      background: 'bg-[#f3f4fa]',
      stroke: 'border-[#f3f4fa]',
      text: 'text-[#9095ad]',
      iconFill: 'text-[#f3f4fa]',
      iconStroke: 'text-[#afb3c7]',
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
      groupHoverIconStroke: 'group-hover:[&>*]:text-indigo-300',
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
      groupHoverIconStroke: 'group-hover:[&>*]:text-jade-300',
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
      groupHoverIconStroke: 'group-hover:[&>*]:text-red-300',
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
      groupHoverIconStroke: 'group-hover:[&>*]:text-orange-300',
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
