export const VariantClassesTable = {
  link: 'text-indigo-600 border-transparent hover:underline disabled:text-gray-500 disabled:no-underline enabled:hover:shadow-transparent ring-transparent',
  // outline variants
  'outline-indigo':
    'border-indigo-500 text-indigo-500 enabled:hocus:shadow-indigo-300/[.35] disabled:text-gray-500 focus:ring-indigo-600',
  'outline-purple':
    'text-purple-500 border-purple-500 enabled:hocus:shadow-purple-100 disabled:text-gray-500 focus:ring-purple-600',
  'outline-gray':
    'text-gray-1000 border-gray-1000 enabled:hocus:shadow-gray-100 disabled:text-gray-500 focus:ring-gray-600',
  'outline-light':
    'text-indigo-500 border-gray-100 hover:border-gray-200 disabled:border-gray-100 enabled:hocus:shadow-gray-50 disabled:text-gray-500 focus:ring-gray-200',
  'outline-dark':
    'text-white border-white/20 hover:border-white/60 enabled:hocus:shadow-white/20 disabled:border-white/20 disabled:text-white/50 focus:ring-gray-200',
  // light variants
  white:
    'text-indigo-500 bg-white border-gray-100 hover:border-gray-200 enabled:hocus:shadow-gray-50 disabled:text-gray-500 focus:ring-gray-200',
  'indigo-light':
    'text-indigo-500 bg-indigo-50 border-indigo-50 hover:border-indigo-200 enabled:hocus:shadow-indigo-50 focus:ring-indigo-100',
  'jade-light':
    'text-teal-600 bg-jade-200 border-transparent hover:border-jade-300 enabled:hocus:shadow-jade-50 focus:ring-jade-300',
  // dark variants
  'jade-dark':
    'text-white bg-jade-500 border-jade-500 enabled:hocus:shadow-jade-100 focus:ring-jade-600',
  'indigo-dark':
    'text-white bg-indigo-500 border-indigo-500 enabled:hocus:shadow-indigo-100 focus:bg-indigo-600 focus:border-indigo-700 focus:ring-indigo-700',
  'teal-dark':
    'text-white bg-teal-500 border-teal-500 enabled:hocus:shadow-teal-100 focus:bg-teal-600 focus:border-teal-700 focus:ring-teal-700',
  'purple-dark':
    'text-white bg-purple-500 border-purple-500 enabled:hocus:shadow-purple-100 focus:bg-purple-600 focus:border-purple-700 focus:ring-purple-700',
  'red-dark':
    'text-white bg-red-500 border-red-500 enabled:hocus:shadow-red-100 focus:bg-red-600 focus:border-red-700 focus:ring-red-700',
  'gray-dark':
    'text-white bg-gray-800 border-gray-800 enabled:hocus:shadow-gray-100 focus:border-gray-800 focus:ring-gray-800',
  'gray-darkest':
    'text-white bg-gray-1000 border-gray-1000 enabled:hocus:shadow-gray-100 focus:ring-gray-1000',
  disabled: 'text-white bg-gray-500 border-gray-500',
} as const

export const DefaultVariant: keyof typeof VariantClassesTable = 'indigo-dark'

export const SizeClassesTable = {
  '20': 'px-[4px] py-0 text-[14px] leading-[20px]',
  '24': 'px-[8px] py-[2px] text-[14px] leading-[20px]',
  '32': 'px-[12px] py-[6px] text-[14px] leading-[20px]',
  '40': 'px-[16px] py-[8px] text-[16px] leading-[24px]',
  '48': 'px-[20px] py-[12px] text-[16px] leading-[24px]',
} as const

export const DefaultSize: keyof typeof SizeClassesTable = '40'

export const StaticClasses =
  'border rounded rounded-[4px] flex font-medium items-center transition duration-150 enabled:hover:shadow-ring-hover enabled:focus:shadow-ring-focus enabled:active:shadow-ring-focus disabled:cursor-not-allowed focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none'

export type ButtonSizes = keyof typeof SizeClassesTable

export type ButtonVariants = keyof typeof VariantClassesTable

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
}
