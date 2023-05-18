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
}

export const inputClasses: Record<InputVariants, InputClasses> = {
  default: {
    // <wind-keep strokeColor="gray-800" focusWithinStrokeColor="gray-800" interactiveColorsOnGroup/>
    icon: 'gray-800',
  },
  active: {
    // <wind-keep strokeColor="indigo-500" focusWithinStrokeColor="indigo-500" interactiveColorsOnGroup/>
    icon: 'indigo-500',
  },
  valid: {
    // <wind-keep strokeColor="jade-500" focusWithinStrokeColor="jade-500" interactiveColorsOnGroup/>
    icon: 'jade-500',
  },
  invalid: {
    // <wind-keep strokeColor="red-500" focusWithinStrokeColor="red-500" interactiveColorsOnGroup/>
    icon: 'red-500',
  },
  warning: {
    // <wind-keep strokeColor="gray-800" focusWithinStrokeColor="gray-800" interactiveColorsOnGroup/>
    icon: 'gray-800',
  },
  disabled: {
    // <wind-keep strokeColor="gray-600" focusWithinStrokeColor="gray-600" interactiveColorsOnGroup/>
    icon: 'gray-600',
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
