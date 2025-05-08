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
    'default-outline': 'bg-white text-gray-700 border-gray-200',
    'dark-outline': 'bg-gray-50 text-gray-700 border-gray-100',
  },
  gray: {
    default: 'bg-gray-50 text-gray-700 border-gray-50',
    dark: 'bg-gray-700 text-white border-gray-700',
    'default-outline': 'bg-gray-50 text-gray-700 border-gray-100',
    'dark-outline': 'bg-gray-700 text-white border-gray-800',
  },
  'gray-dark': {
    default: 'bg-gray-900 text-gray-300 border-gray-900',
    dark: 'bg-gray-1100 text-gray-500 border-gray-1100',
    'default-outline': 'bg-gray-900 text-gray-300 border-gray-800',
    'dark-outline': 'bg-gray-1100 text-gray-500 border-gray-800',
  },
  jade: {
    default: 'bg-jade-100 text-jade-600 border-jade-100',
    dark: 'bg-jade-500 text-white border-jade-500',
    'default-outline': 'bg-jade-100 text-jade-600 border-jade-200',
    'dark-outline': 'bg-jade-500 text-white border-jade-600',
  },
  teal: {
    default: 'bg-teal-100 text-teal-600 border-teal-100',
    dark: 'bg-teal-500 text-white border-teal-500',
    'default-outline': 'bg-teal-100 text-teal-600 border-teal-200',
    'dark-outline': 'bg-teal-500 text-white border-teal-600',
  },
  indigo: {
    default: 'bg-indigo-100 text-indigo-600 border-indigo-100',
    dark: 'bg-indigo-500 text-white border-indigo-500',
    'default-outline': 'bg-indigo-100 text-indigo-600 border-indigo-200',
    'dark-outline': 'bg-indigo-500 text-white border-indigo-600',
  },
  purple: {
    default: 'bg-purple-100 text-purple-600 border-purple-100',
    dark: 'bg-purple-500 text-white border-purple-500',
    'default-outline': 'bg-purple-100 text-purple-600 border-purple-200',
    'dark-outline': 'bg-purple-500 text-white border-purple-600',
  },
  red: {
    default: 'bg-red-100 text-red-600 border-red-100',
    dark: 'bg-red-500 text-white border-red-500',
    'default-outline': 'bg-red-100 text-red-600 border-red-200',
    'dark-outline': 'bg-red-500 text-white border-red-600',
  },
  orange: {
    default: 'bg-orange-100 text-orange-600 border-orange-100',
    dark: 'bg-orange-500 text-white border-orange-500',
    'default-outline': 'bg-orange-100 text-orange-600 border-orange-200',
    'dark-outline': 'bg-orange-500 text-white border-orange-600',
  },
} as const
