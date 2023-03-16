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
