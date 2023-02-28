export const VariantClassesTable = {
  link: 'border-transparent text-indigo-600 hover:underline disabled:text-gray-500 disabled:no-underline ring-transparent',
  'outline-indigo':
    'border-indigo-500 text-indigo-500 hover:ring-indigo-300/35 disabled:text-gray-500',
  'outline-purple':
    'border-purple-500 text-purple-500 hover:ring-purple-100 disabled:text-gray-500',
  'outline-gray':
    'border-gray-1000 text-gray-1000 hover:ring-gray-100 disabled:text-gray-500',
  'outline-light':
    'border-gray-100 text-indigo-500 hover:border-gray-200 disabled:border-gray-100 hover:ring-gray-50 disabled:text-gray-500',
  'outline-dark':
    'border-white/20 text-white hover:border-white/60 hover:ring-white/20 disabled:border-white/20 disabled:text-white/50',
  white:
    'border-gray-100 bg-white text-indigo-500 hover:border-gray-200 hover:ring-gray-50 disabled:text-gray-500',
  'indigo-light':
    'border-indigo-50 bg-indigo-50 text-indigo-500 hover:border-indigo-200 hover:ring-2 hover:ring-indigo-50',
  'indigo-dark':
    'border-indigo-500 bg-indigo-500 text-white hover:ring-2 hover:ring-indigo-100 focus:bg-indigo-600',
  'jade-light':
    'border-transparent bg-jade-200 text-teal-600 hover:border-jade-300 hover:ring-2 hover:ring-jade-50',
  'jade-dark':
    'border-jade-500 bg-jade-500 text-white hover:ring-2 hover:ring-jade-100',
  'teal-dark':
    'border-teal-500 bg-teal-500 text-white hover:ring-2 hover:ring-teal-100 focus:bg-teal-600',
  'purple-dark':
    'border-purple-500 bg-purple-500 text-white hover:ring-2 hover:ring-purple-100 focus:bg-purple-600',
  'red-dark':
    'border-red-500 bg-red-500 text-white hover:ring-2 hover:ring-red-100 focus:bg-red-600',
  'gray-dark':
    'border-gray-800 bg-gray-800 text-white hover:ring-2 hover:ring-gray-100',
  'gray-darkest':
    'border-gray-1000 bg-gray-1000 text-white hover:ring-2 hover:ring-gray-100',
  disabled: 'border-gray-500 bg-gray-500 text-white',
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
  'border rounded rounded-[4px] flex font-medium items-center transition duration-150 enabled:hover:ring-2 enabled:focus:ring-2 disabled:cursor-not-allowed'

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
