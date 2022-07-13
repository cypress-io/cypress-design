import type { iconsMetadata } from '@cypress-design/icon-registry'
export type { WindiColor } from '@cypress-design/icon-registry'
export { default, SVGPropsWithoutColorsOrSize } from './Icon'
export * from './TreeShakableIcons'

export type IconId = keyof typeof iconsMetadata
