import * as React from 'react'
import type { SidebarNavigationInterface } from '../constants/dist'
import SidebarNavigation from './SidebarNavigation'

export default ({
  items,
  currentProject,
  currentTeam,
  projects,
  icon,
}: SidebarNavigationInterface) => {
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
