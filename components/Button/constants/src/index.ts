export const CssStaticClasses =
  'border border-solid rounded rounded-[4px] flex cy-button-width font-medium items-center transition duration-150 ' +
  'hover:shadow-ring-hover focus:shadow-ring-focus active:shadow-ring-focus ' +
  'disabled:hover:shadow-none ' +
  'disabled:cursor-not-allowed focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none'

export const CssVariantClassesTable = {
  link: 'text-indigo-600 border-transparent ring-transparent hover:underline disabled:text-gray-500 disabled:hocus:shadow-none disabled:no-underline hocus:shadow-transparent focus-visible:ring-gray-100 focus-visible:underline',
  white:
    'text-indigo-500 bg-white border-gray-100 hover:border-gray-200 disabled:hocus:shadow-none hocus:shadow-gray-50 disabled:text-gray-500 focus:ring-gray-200',
  disabled: 'text-gray-500 bg-gray-100 border-gray-100 hover:shadow-none',
  // outline variants
  'outline-indigo':
    'border-indigo-500 text-indigo-500 disabled:hocus:shadow-none hocus:shadow-indigo-300/[.35] disabled:text-gray-500 focus:ring-indigo-600',
  'outline-purple':
    'text-purple-500 border-purple-500 disabled:hocus:shadow-none hocus:shadow-purple-100 disabled:text-gray-500 focus:ring-purple-600',
  'outline-red':
    'text-red-500 border-red-500 disabled:hocus:shadow-none hocus:shadow-red-100 disabled:text-gray-500 focus:ring-red-600',
  'outline-gray-dark':
    'text-gray-1000 border-gray-1000 disabled:hocus:shadow-none hocus:shadow-gray-100 disabled:text-gray-500 focus:ring-gray-1000',
  'outline-light':
    'text-indigo-500 border-gray-100 hocus:border-gray-200 disabled:border-gray-100 disabled:hocus:shadow-none hocus:shadow-gray-50 disabled:text-gray-500 focus:ring-gray-200',
  'outline-gray-light':
    'text-gray-700 border-gray-100 hocus:border-gray-200 disabled:border-gray-100 disabled:hocus:shadow-none hocus:shadow-gray-50 disabled:text-gray-300 focus:ring-gray-200',
  'outline-orange-dark':
    'border-orange-500 text-orange-500 disabled:hocus:shadow-none hocus:shadow-orange-100 disabled:text-gray-500 focus:ring-orange-500',
  'outline-orange-light':
    'border-orange-200 text-orange-500 disabled:hocus:shadow-none hocus:shadow-orange-50 disabled:text-gray-500 focus:ring-orange-400',
  'outline-disabled':
    'text-gray-500 border-gray-100 hover:shadow-none bg-white',
  // light variants
  'indigo-light':
    'text-indigo-500 bg-indigo-50 border-indigo-50 hocus:border-indigo-200 disabled:hocus:shadow-none hocus:shadow-indigo-50 focus:ring-transparent',
  'jade-light':
    'text-teal-600 bg-jade-200 border-transparent hocus:border-jade-300 disabled:hocus:shadow-none hocus:shadow-jade-50 focus:ring-transparent',
  // dark variants
  'jade-dark':
    'text-white bg-jade-500 border-jade-500 disabled:hocus:shadow-none hocus:shadow-jade-100 focus:ring-transparent focus:border-jade-600 focus:bg-jade-600',
  'indigo-dark':
    'text-white bg-indigo-500 border-indigo-500 disabled:hocus:shadow-none hocus:shadow-indigo-100 focus:bg-indigo-600 focus:border-indigo-600 focus:ring-transparent',
  'teal-dark':
    'text-white bg-teal-500 border-teal-500 disabled:hocus:shadow-none hocus:shadow-teal-100 focus:bg-teal-600 focus:bg-teal-600 focus:border-teal-600 focus:ring-transparent',
  'purple-dark':
    'text-white bg-purple-500 border-purple-500 disabled:hocus:shadow-none hocus:shadow-purple-100 focus:bg-purple-600 focus:border-purple-600 focus:ring-transparent',
  'red-dark':
    'text-white bg-red-500 border-red-500 disabled:hocus:shadow-none hocus:shadow-red-100 focus:bg-red-600 focus:border-red-600 focus:ring-transparent',
  'gray-dark':
    'text-white bg-gray-800 border-gray-800 disabled:hocus:shadow-none hocus:shadow-gray-100 focus:bg-gray-900 focus:border-gray-900 focus:ring-transparent',
  'gray-darkest':
    'text-white bg-gray-1000 border-gray-1000 disabled:hocus:shadow-none hocus:shadow-gray-100 focus:bg-gray-900 focus:border-gray-900 focus:ring-transparent',
  // Dark mode
  'outline-red-dark-mode':
    'text-red-400 border-red-400 disabled:hocus:shadow-none hocus:shadow-red-300/35 disabled:text-gray-700 disabled:border-white/20 focus:ring-red-600',
  'outline-jade-dark-mode':
    'text-jade-400 border-jade-400 disabled:hocus:shadow-none hocus:shadow-jade-300/35 disabled:text-gray-700 disabled:border-white/20 focus:ring-jade-600',
  'outline-indigo-dark-mode':
    'text-indigo-400 border-indigo-400 disabled:hocus:shadow-none hocus:shadow-indigo-400/40 disabled:text-gray-700 disabled:border-white/20 focus:ring-indigo-300',
  'outline-dark':
    'text-white border-white/20 hocus:border-white/60 disabled:hocus:shadow-none hocus:shadow-white/20 disabled:border-white/20 disabled:hover:border-white/20 disabled:text-white/50 focus:ring-gray-200',
  'red-dark-mode':
    'text-white bg-red-500 border-red-500 disabled:hocus:shadow-none disabled:bg-gray-1000 disabled:text-gray-800 disabled:border-none hocus:shadow-red-400/40 disabled:mix-blend-screen focus:bg-red-600 focus:border-red-600 focus:ring-transparent',
} as const

export const DefaultVariant: keyof typeof CssVariantClassesTable = 'indigo-dark'

export const CssSizeClassesTable = {
  '20': 'text-[14px] leading-[18px] min-h-[20px]',
  '24': 'text-[14px] leading-[20px] min-h-[24px]',
  '32': 'text-[14px] leading-[20px] min-h-[32px]',
  '40': 'text-[16px] leading-[24px] min-h-[40px]',
  '48': 'text-[16px] leading-[24px] min-h-[48px]',
} as const

export const CssSizeClassesTableSquare = {
  '20': {
    wide: 'px-[4px] py-0',
    square: 'h-[20px] w-[20px] flex items-center justify-center',
  },
  '24': {
    wide: 'px-[8px] py-[1px]',
    square: 'h-[24px] w-[24px] flex items-center justify-center',
  },
  '32': {
    wide: 'px-[12px] py-[5px]',
    square: 'h-[32px] w-[32px] flex items-center justify-center',
  },
  '40': {
    wide: 'px-[16px] py-[7px]',
    square: 'h-[40px] w-[40px] flex items-center justify-center',
  },
  '48': {
    wide: 'px-[20px] py-[11px]',
    square: 'h-[48px] w-[48px] flex items-center justify-center',
  },
} as const

export const DefaultSize: keyof typeof CssSizeClassesTable = '40'

export type ButtonSizes = keyof typeof CssSizeClassesTable

export type ButtonVariants = keyof typeof CssVariantClassesTable

export interface ButtonProps {
  /**
   * Visual variant to display the button;
   * It will pick colors for font, background and border.
   */
  variant?: ButtonVariants
  /**
   * Size (height) of the button (in pixels)
   */
  size?: ButtonSizes
  /**
   * Is the button clickable and active?
   * Note that `variant="disabled"` will also set this
   */
  disabled?: boolean
  /**
   * When provided, renders the button as a link, with
   * its href attribute set to the given value.
   */
  href?: string
  /**
   * When provided together with a href property, determines where to open the linked URL.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target for significance of values.
   */
  target?: '_self' | '_blank' | '_parent' | '_top'
  /**
   * Type attribute of the button (only used when href is not set)
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Should the button be rendered as a square?
   */
  square?: boolean
}
