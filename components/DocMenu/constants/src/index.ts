export interface NavItemBase {
  label: string
  href?: string
}

export interface NavItemLink extends NavItemBase {
  href: string
}

export interface NavGroup extends NavItemBase {
  items: (NavItemLink | NavGroup)[]
  collapsed?: boolean
}

export const CssClasses = {
  expandedIcon:
    'absolute left-0 transform transition-transform text-gray-400 dark:text-gray-700',
  button:
    'flex leading-[24px] py-[10px] items-center relative w-full text-start',
  topButton: 'leading-[24px] text-[16px] pl-[24px] font-medium',
  leafButton: 'leading-[20px] text-[14px] pl-[48px]',
  openListBorderLeft:
    'absolute left-[8px] top-0 w-[1px] h-full bg-gray-100 dark:bg-gray-900',
} as const

export const CssLink = {
  wrapper: 'list-none p-0 scroll-my-10',
  static: 'group relative block w-full pl-[24px]',
  active: 'text-indigo-500 dark:text-indigo-400',
  inactive: 'text-gray-700 dark:text-gray-500',
  negativeDepth: 'py-[8px] text-[16px] leading-[24px]',
  positiveDepth: 'leading-[20px] text-[14px] py-[12px]',
  markerStatic:
    'left-[6.5px] absolute top-[4px] bottom-[4px] w-[4px] z-10 rounded-full',
} as const
