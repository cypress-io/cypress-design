import type { WindiColor } from '@cypress-design/icon-registry'

export type AlertType = 'info' | 'success' | 'error' | 'warning'

export type AlertClasses = {
  headerClass: string
  bodyClass: string
  borderClass: string
  detailsHeaderClass: string
  iconProps?: {
    strokeColor: WindiColor
  }
  iconChevronProps: {
    strokeColor: WindiColor
  }
}

export const alertClasses: Record<AlertType, AlertClasses> = {
  info: {
    headerClass: 'text-indigo-700 bg-indigo-100',
    bodyClass: 'bg-indigo-50 text-indigo-500',
    borderClass: 'border-indigo-100',
    detailsHeaderClass: 'text-indigo-600',
    // <for-windi strokeColor="indigo-500"/>
    iconProps: { strokeColor: 'indigo-500' },
    // <for-windi strokeColor="indigo-300"/>
    iconChevronProps: { strokeColor: 'indigo-300' },
  },
  warning: {
    headerClass: 'text-orange-700 bg-orange-100',
    bodyClass: 'bg-orange-50 text-orange-500',
    borderClass: 'border-orange-100',
    detailsHeaderClass: 'text-orange-600',
    // <for-windi strokeColor="orange-500"/>
    iconProps: { strokeColor: 'orange-500' },
    // <for-windi strokeColor="orange-300"/>
    iconChevronProps: { strokeColor: 'orange-300' },
  },
  error: {
    headerClass: 'text-red-700 bg-red-100',
    bodyClass: 'bg-red-50 text-red-500',
    borderClass: 'border-red-100',
    detailsHeaderClass: 'text-red-600',
    // <for-windi strokeColor="red-500"/>
    iconProps: { strokeColor: 'red-500' },
    // <for-windi strokeColor="red-300"/>
    iconChevronProps: { strokeColor: 'red-300' },
  },
  success: {
    headerClass: 'text-jade-700 bg-jade-100',
    bodyClass: 'bg-jade-50 text-jade-500',
    borderClass: 'border-jade-100',
    detailsHeaderClass: 'text-jade-600',
    // <for-windi strokeColor="jade-500"/>
    iconProps: { strokeColor: 'jade-500' },
    // <for-windi strokeColor="jade-300"/>
    iconChevronProps: { strokeColor: 'jade-300' },
  },
}
