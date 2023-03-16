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
} as const
