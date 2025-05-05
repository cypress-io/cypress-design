export const CssShared =
  'rounded border align-middle font-medium inline-flex items-center'

export const CssSize = {
  '16': 'text-[12px] leading-[16px] h-[16px] px-[3px]',
  '20': 'text-[14px] leading-[20px] h-[20px] px-[3px]',
  '24': 'text-[16px] leading-[24px] h-[24px] px-[7px]',
  '32': 'text-[16px] leading-[24px] h-[32px] px-[11px]',
} as const

export const CssColor = {
  white: {
    default: 'bg-white text-gray-700 border-gray-100',
    dark: 'bg-gray-50 text-gray-700 border-gray-50',
  },
  gray: {
    default: 'bg-gray-50 text-gray-700 border-gray-100',
    dark: 'bg-gray-700 text-white border-gray-700',
  },
  grayDark: {
    default: 'bg-gray-900 text-gray-300 border-none',
    dark: 'bg-gray-900 text-gray-300 border-gray-800',
  },
  jade: {
    default: 'bg-jade-100 text-jade-600 border-jade-100',
    dark: 'bg-jade-500 text-white border-jade-500',
  },
  teal: {
    default: 'bg-teal-100 text-teal-600 border-teal-100',
    dark: 'bg-teal-500 text-white border-teal-500',
  },
  indigo: {
    default: 'bg-indigo-100 text-indigo-600 border-indigo-100',
    dark: 'bg-indigo-500 text-white border-indigo-500',
  },
  purple: {
    default: 'bg-purple-100 text-purple-600 border-purple-100',
    dark: 'bg-purple-500 text-white border-purple-500',
  },
  red: {
    default: 'bg-red-100 text-red-600 border-red-100',
    dark: 'bg-red-500 text-white border-red-500',
  },
  orange: {
    default: 'bg-orange-100 text-orange-600 border-orange-100',
    dark: 'bg-orange-500 text-white border-orange-500',
  },
} as const
