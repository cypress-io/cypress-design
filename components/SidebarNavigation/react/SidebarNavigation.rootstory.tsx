import * as React from 'react'
import type { SidebarNavigationInterface } from '../constants/dist'
import SidebarNavigation from './SidebarNavigation'

export default ({
  items,
  currentProject,
  currentOrganization,
  projects,
  icon,
}: SidebarNavigationInterface) => {
  return (
    <SidebarNavigation
      items={items}
      currentOrganization={currentOrganization}
      currentProject={currentProject}
      projects={projects}
      icon={icon}
    />
  )
}
