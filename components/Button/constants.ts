export const VariantClassesTable = {
  link: 'border-transparent text-indigo-600 hover:underline disabled:text-gray-500',
  secondary:
    'border-gray-200 bg-white text-indigo-500 hocus:ring-gray-50 disabled:text-gray-500',
  tertiary: 'border-indigo-50 bg-indigo-50 text-indigo-500 hocus-default',
  'jade-200': 'border-jade-200 bg-jade-200 text-teal-600 hocus:ring-jade-5',
  confirm: 'border-jade-500 bg-jade-500 text-white hocus-secondary',
  'teal-500': 'border-teal-500 bg-teal-500 text-white hocus:ring-teal-100',
  primary: 'border-indigo-500 bg-indigo-500 text-white hocus-default',
  'purple-500':
    'border-purple-500 bg-purple-500 text-white hocus:ring-purple-100',
  caution:
    'border-red-500 bg-red-500 text-white hocus:ring-2 hocus:ring-red-200',
  disabled: 'border-gray-500 bg-gray-500 text-white',
  'gray-800': 'border-gray-800 bg-gray-800 text-white hocus:ring-gray-200',
  'gray-1000': 'border-transparent bg-gray-1000 text-white hocus:ring-gray-300',
} as const;

export const SizeClassesTable = {
  '20': 'px-4px py-0 text-14px leading-20px',
  '24': 'px-8px py-2px text-14px leading-20px',
  '32': 'px-12px py-6px text-14px leading-20px',
  '40': 'px-16px py-8px text-16px leading-24px',
  '48': 'px-20px py-12px text-16px leading-24px',
} as const;

export type ButtonSizes = keyof typeof SizeClassesTable;

export type ButtonVariants = keyof typeof VariantClassesTable;
