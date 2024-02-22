export interface NavMenuItem {
  label: string
  href?: string
}

export interface NavMenuGroup<T extends NavMenuItem> extends NavMenuItem {
  items: (T | NavMenuGroup<T>)[]
}
