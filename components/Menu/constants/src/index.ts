export interface NavMenuItem {
  label: string
  href: string
}

export interface NavMenuGroup {
  label: string
  items: (NavMenuItem | NavMenuGroup)[]
}

export interface NavMenuProps {
  items: (NavMenuGroup | NavMenuItem)[]
}
