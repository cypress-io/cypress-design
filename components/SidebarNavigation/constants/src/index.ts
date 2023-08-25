import * as React from 'react'

export interface NavItemBase {
  text: string
  href?: string
  active?: boolean
}
export interface IconInterface {
  size?: number
  strokeColor?: string
  fillColor?: string
  style?: React.CSSProperties
}

export interface NavItemLink extends NavItemBase {
  href: string
  icon?: React.ComponentType<IconInterface>
}

export interface NavGroup extends NavItemBase {
  items: NavItemLink[]
}

export interface SidebarNavigationLinkInterface {
  item: NavItemLink
  depth?: number
  onActive?: (top: number) => void
}

export interface ProjectInterface {
  id: string | number
  label: string
}

export interface CurrentOrganizationInterface {
  name: string
  icon: React.ComponentType<IconInterface>
}

export interface SidebarNavigationHeadInterface
  extends React.HTMLAttributes<HTMLUListElement> {
  currentProject: string
  currentOrganization: CurrentOrganizationInterface
  projects: ProjectInterface[]
  onProjectChange: (project: ProjectInterface) => void
}

export interface SidebarNavigationInterface {
  className?: string
  items: (NavGroup | NavItemLink)[]
  currentProject: string
  currentOrganization: CurrentOrganizationInterface
  projects: Array<{ id: string; label: string }>
  onProjectChange?: (project: ProjectInterface) => void
}

export const classes = {
  button: 'flex leading-[24px] py-[10px] items-center relative w-full',
  topButton: 'leading-[24px] text-[16px] pl-[24px] font-medium',
  leafButton: 'leading-[20px] text-[14px] pl-[40px]',
} as const
