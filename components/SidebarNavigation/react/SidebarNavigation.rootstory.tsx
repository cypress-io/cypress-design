import * as React from 'react'
import type { NavGroup, NavItemLink } from '../constants/dist'
import SidebarNavigation from './SidebarNavigation'

export default ({
  items,
  currentProject,
  currentTeam,
  projects,
  icon,
}: {
  items: (NavGroup | NavItemLink)[]
  currentProject: string
  currentTeam: string
  projects: any
  icon?: React.ReactNode
}) => {
  return (
    <SidebarNavigation
      items={items}
      currentTeam={currentTeam}
      currentProject={currentProject}
      projects={projects}
      icon={icon}
    />
  )
}
