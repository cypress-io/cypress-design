import * as React from 'react'
import type { NavGroup, NavItemLink } from '../constants/dist'
import SidebarNavigation from './SidebarNavigation'

export default ({
  items,
  currentProject,
  projects,
  icon,
}: {
  items: (NavGroup | NavItemLink)[]
  currentProject: string
  projects: string[]
  icon?: React.ReactNode
}) => {
  return (
    <SidebarNavigation
      items={items}
      currentProject={currentProject}
      projects={projects}
      icon={icon}
    />
  )
}
