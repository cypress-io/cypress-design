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

export const classes = {
  expandedIcon:
    'absolute left-0 transform transition-transform text-gray-400 dark:text-gray-700',
  button:
    'flex leading-[24px] py-[10px] items-center relative w-full text-start',
  topButton: 'leading-[24px] text-[16px] pl-[24px] font-medium',
  leafButton: 'leading-[20px] text-[14px] pl-[48px]',
  openListBorderLeft:
    'absolute left-[8px] top-0 w-[1px] h-full bg-gray-100 dark:bg-gray-900',
} as const
