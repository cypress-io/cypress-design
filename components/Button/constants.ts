export const VariantClassesTable = {
  link: 'border-transparent text-indigo-600 hover:underline disabled:text-gray-500 disabled:no-underline ring-transparent',
  'outline-light':
    'border-gray-100 text-indigo-500 hocus:border-gray-200 disabled:border-gray-100 hocus:ring-gray-50 disabled:text-gray-500',
  'outline-dark':
    'border-white/20 text-white hocus:border-white/60 hocus:ring-white/20 disabled:border-white/20 disabled:text-white/50',
  white:
    'border-gray-100 bg-white text-indigo-500 hocus:border-gray-200 hocus:ring-gray-50 disabled:text-gray-500',
  'indigo-light':
    'border-indigo-50 bg-indigo-50 text-indigo-500 hocus:border-indigo-200 hocus:ring-2 hocus:ring-indigo-50',
  'indigo-dark':
    'border-indigo-500 bg-indigo-500 text-white hocus:ring-2 hocus:ring-indigo-100 focus:bg-indigo-600',
  'jade-light':
    'border-transparent bg-jade-200 text-teal-600 hocus:border-jade-300 hocus:ring-2 hocus:ring-jade-50',
  'jade-dark':
    'border-jade-500 bg-jade-500 text-white hocus:ring-2 hocus:ring-jade-100',
  'teal-dark':
    'border-teal-500 bg-teal-500 text-white hocus:ring-2 hocus:ring-teal-100 focus:bg-teal-600',
  'purple-dark':
    'border-purple-500 bg-purple-500 text-white hocus:ring-2 hocus:ring-purple-100 focus:bg-purple-600',
  'red-dark':
    'border-red-500 bg-red-500 text-white hocus:ring-2 hocus:ring-red-100 focus:bg-red-600',
  'gray-dark':
    'border-gray-800 bg-gray-800 text-white hocus:ring-2 hocus:ring-gray-100',
  'gray-darkest':
    'border-gray-1000 bg-gray-1000 text-white hocus:ring-2 hocus:ring-gray-100',
  disabled: 'border-gray-500 bg-gray-500 text-white',
} as const

export const SizeClassesTable = {
  '20': 'px-4px py-0 text-14px leading-20px',
  '24': 'px-8px py-2px text-14px leading-20px',
  '32': 'px-12px py-6px text-14px leading-20px',
  '40': 'px-16px py-8px text-16px leading-24px',
  '48': 'px-20px py-12px text-16px leading-24px',
} as const

export const StaticClasses =
  'border rounded rounded-4px flex font-medium items-center transition duration-150 enabled:hover:ring-2 enabled:focus:ring-2 disabled:cursor-not-allowed'

export type ButtonSizes = keyof typeof SizeClassesTable

export type ButtonVariants = keyof typeof VariantClassesTable
