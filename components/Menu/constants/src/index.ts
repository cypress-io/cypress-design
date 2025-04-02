export type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean
}

export interface NavMenuItem {
  label: string
  href?: string
  key?: string
  className?: string
  anchorClassName?: string
  labelClassName?: string
  interactiveColorsOnGroup?: boolean
}

export interface NavMenuGroup<T extends NavMenuItem> extends NavMenuItem {
  items: (T | NavMenuGroup<T>)[]
  submenuClassName?: string
}
