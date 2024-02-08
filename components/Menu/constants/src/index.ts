export interface NavMenuItem {
  label: string
  href?: string
}

export interface NavMenuGroup<T extends NavMenuItem> {
  label: string
  items: (T | NavMenuGroup<T>)[]
}
