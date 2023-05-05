import * as React from 'react'
import type { WindiColor } from '@cypress-design/icon-registry'

export const SharedSettings = {}

const enabledShadow =
  'hover:shadow-ring-hover focus:shadow-ring-focus active:shadow-ring-focus'

export const VariantClassesTable = {
  default: `text-gray-800 border-gray-100 hocus:shadow-indigo-300/[.35] hocus:border-indigo-300 ${enabledShadow}`,
  active: `text-gray-800 border-indigo-300 hocus:shadow-indigo-300/[.35] hocus:border-indigo-300 ${enabledShadow}`,
  valid: `text-jade-500 border-jade-300 hocus:shadow-jade-300/[.35] hocus:border-jade-300 ${enabledShadow}`,
  invalid: `text-red-500 border-red-300 hocus:shadow-red-300/[.35] hocus:border-red-300 ${enabledShadow}`,
  warning: `text-gray-800 border-orange-300 hocus:shadow-orange-300/[.35] hocus:border-orange-300 ${enabledShadow}`,
  disabled: `text-gray-600 bg-gray-50 border-gray-100 disabled:hocus:shadow-none`,
} as const
export type InputVariants = keyof typeof VariantClassesTable

type InputClasses = {
  icon: WindiColor
  // input: string
  // reset: string
  // results: string
}
export const inputClasses: Record<InputVariants, InputClasses> = {
  default: {
    icon: 'gray-800',
    // input: '',
    // reset: '',
    // results: '',
  },
  active: {
    icon: 'indigo-500',
    // input: '',
    // reset: '',
    // results: '',
  },
  valid: {
    icon: 'jade-500',
    // input: '',
    // reset: '',
    // results: '',
  },
  invalid: {
    icon: 'red-500',
    // input: '',
    // reset: '',
    // results: '',
  },
  warning: {
    icon: 'gray-800',
    // input: '',
    // reset: '',
    // results: '',
  },
  disabled: {
    icon: 'gray-600',
    // input: '',
    // reset: '',
    // results: '',
  },
} as const

export const SizeClassesTable = {
  '32': 'h-32px px-[12px] py-[6px] text-[14px]',
  '40': 'h-40px px-[16px] py-[8px] text-[16px]',
  '48': 'h-48px px-[16px] py-[12px] text-[16px]',
} as const
export type InputSizes = keyof typeof SizeClassesTable

export const StaticClasses =
  'border border-solid rounded rounded-[4px] flex items-center font-medium transition duration-150 '
export const ResultStaticClass =
  'whitespace-nowrap border-l-1 border-gray-100 ml-[16px] pl-[16px] '
export const StaticInputClasses = 'clear-none w-[100%] '
export const IconStaticClasses = 'mr-[8px] min-w-[16px] '
export const ResetStaticClasses = 'ml-[8px] '

export const DefaultVariant: keyof typeof VariantClassesTable = 'default'
export const DefaultSize: keyof typeof SizeClassesTable = '40'

export interface InputProps {
  /**package
   * Visual variant to display the button;
   * It will pick colors for font, background and border.
   */
  variant?: keyof typeof VariantClassesTable
  /**
   * Size (height) of the button (in pixels)
   */
  size?: InputSizes
  /**
   * Is the button clickable and active?
   * Note that `variant="disabled"` will also set this
   */
  disabled?: boolean
  /**
   * Replace the default left icon
   */
  customIcon?: React.FC<React.SVGProps<SVGSVGElement>>
  /**
   * Change handler for the text input field.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /**
   * Click handler for the reset button.
   * Button is only displayed when this is defined.
   */
  onReset?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Whether the input is meant for search
   * and to auto-include the MagnifyingGlass icon.
   */
  isSearch?: boolean
  /**
   * Optional details for search results.
   */
  searchResults?: {
    entity: string
    match: number
    total: number
  }
}
