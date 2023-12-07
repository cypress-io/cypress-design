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
  button:
    'flex leading-[24px] py-[10px] items-center relative w-full text-start',
  topButton: 'leading-[24px] text-[16px] pl-[24px] font-medium',
  leafButton: 'leading-[20px] text-[14px] pl-[40px]',
} as const
