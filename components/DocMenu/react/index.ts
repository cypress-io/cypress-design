import type { ComponentProps } from 'react'
import type DocMenu from './DocMenu'
export type { NavItemLink, NavGroup } from '@cypress-design/constants-docmenu'
export { default } from './DocMenu'
export type { NavItem } from './DocMenu'
export type DocMenuProps = ComponentProps<typeof DocMenu>
