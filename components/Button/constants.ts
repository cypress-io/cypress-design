export const VariantClassesTable = {
  primary: 'border-indigo-500 bg-indigo-500 text-white hocus-default',
  secondary: 'bg-jade-500 text-white hocus-secondary',
  tertiary: 'text-indigo-500 bg-indigo-50 border-transparent hocus-default',
  outline: 'border-gray-100 text-indigo-600 hocus-default',
  pending: 'bg-gray-500 text-white',
  link: 'border-transparent text-indigo-600 hocus-default',
  text: 'border-0',
  danger: 'border-0 bg-red-500 text-white hocus:ring-2 hocus:ring-red-200',
  warning:
    'border-0 bg-orange-200 text-orange-600 hocus:ring-2 hocus:ring-orange-50',
  info: 'border-0 bg-indigo-50 text-indigo-500',
} as const;

export const SizeClassesTable = {
  sm: 'px-6px py-2px text-14px h-24px',
  md: 'px-12px py-8px text-14px h-32px',
  lg: 'px-16px py-11px max-h-40px',
  'lg-wide': 'px-32px py-8px',
} as const;

export type ButtonSizes = keyof typeof SizeClassesTable;

export type ButtonVariants = keyof typeof VariantClassesTable;
