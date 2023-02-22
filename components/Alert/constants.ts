import type { WindiColor } from '@cypress-design/icon-registry'

export type AlertType = 'info' | 'success' | 'error' | 'warning' | 'neutral'
export const alertSizesClasses = {
  xs: 'py-[4px] px-[8px] leading-[22px] text-[14px]',
  sm: 'py-[8px] px-[12px] leading-[22px] text-[14px]',
  md: 'py-[12px] px-[16px] leading-[24px] text-[16px]',
  lg: 'p-[16px] leading-[24px] text-[16px]',
} as const

export type AlertSize = keyof typeof alertSizesClasses
export const defaultAlertSize: AlertSize = 'lg'

export type AlertClasses = {
  headerClass: string
  bodyClass: string
  borderClass: string
  detailsHeaderClass: string
  iconCloseColor: WindiColor
  iconColor?: WindiColor
  iconChevronColor: WindiColor
}

export const alertClasses: Record<AlertType, AlertClasses> = {
  neutral: {
    headerClass: 'text-gray-800 bg-gray-100',
    bodyClass: 'bg-gray-50 text-gray-500',
    borderClass: 'border-gray-100',
    detailsHeaderClass: 'text-gray-600',
    /* <tw-keep strokeColor="gray-600"/> */
    iconCloseColor: 'gray-600',
    /* <tw-keep strokeColor="gray-500"/> */
    iconColor: 'gray-500',
    /* <tw-keep strokeColor="gray-300"/> */
    iconChevronColor: 'gray-300',
  },
  info: {
    headerClass: 'text-indigo-700 bg-indigo-100',
    bodyClass: 'bg-indigo-50 text-indigo-500',
    borderClass: 'border-indigo-100',
    detailsHeaderClass: 'text-indigo-600',
    /* <tw-keep strokeColor="indigo-500"/> */
    iconCloseColor: 'indigo-500',
    /* <tw-keep strokeColor="indigo-500"/> */
    iconColor: 'indigo-500',
    /* <tw-keep strokeColor="indigo-300"/> */
    iconChevronColor: 'indigo-300',
  },
  warning: {
    headerClass: 'text-orange-700 bg-orange-100',
    bodyClass: 'bg-orange-50 text-orange-500',
    borderClass: 'border-orange-100',
    detailsHeaderClass: 'text-orange-600',
    /* <tw-keep strokeColor="orange-500"/> */
    iconCloseColor: 'orange-500',
    /* <tw-keep strokeColor="orange-400"/> */
    iconColor: 'orange-400',
    /* <tw-keep strokeColor="orange-300"/> */
    iconChevronColor: 'orange-300',
  },
  error: {
    headerClass: 'text-red-700 bg-red-100',
    bodyClass: 'bg-red-50 text-red-500',
    borderClass: 'border-red-100',
    detailsHeaderClass: 'text-red-600',
    /* <tw-keep strokeColor="red-500"/> */
    iconCloseColor: 'red-500',
    /* <tw-keep strokeColor="red-400"/> */
    iconColor: 'red-400',
    /* <tw-keep strokeColor="red-300"/> */
    iconChevronColor: 'red-300',
  },
  success: {
    headerClass: 'text-jade-700 bg-jade-100',
    bodyClass: 'bg-jade-50 text-jade-600',
    borderClass: 'border-jade-100',
    detailsHeaderClass: 'text-jade-600',
    /* <tw-keep strokeColor="jade-600"/> */
    iconCloseColor: 'jade-600',
    /* <tw-keep strokeColor="jade-500"/> */
    iconColor: 'jade-500',
    /* <tw-keep strokeColor="jade-300"/> */
    iconChevronColor: 'jade-300',
  },
}

export const defaultAlertType: AlertType = 'info'

export const defaultAlertTitle = 'Additional details'
