import * as React from 'react'
import type { SidebarNavigationInterface } from '@cypress-design/constants-SidebarNavigation'
import SidebarNavigation from '@cypress-design/react-SidebarNavigation'

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
