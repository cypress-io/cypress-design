import type { iconsMetadata } from '@cypress-design/icon-registry'
export type { WindiColor } from '@cypress-design/icon-registry'
export { default } from './Icon'
export { compileReactIconProperties } from './compileProperties'
export * from './TreeShakableIcons'

export type IconId = keyof typeof iconsMetadata
