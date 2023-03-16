export interface NavItemLink {
  text: string
  href: string
  active?: boolean
}

export interface NavGroup {
  text?: string
  active?: boolean
  items: (NavItemLink | NavGroup)[]
}

export const classes = {
  button: 'flex leading-[24px] py-[8px] items-center relative',
  topButton: 'leading-[24px] text-[16px] pl-[24px] font-medium',
  leafButton: 'leading-[20px] text-[14px] pl-[40px]',
} as const
