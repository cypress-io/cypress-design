import * as React from 'react'

// TODO: fix relative paths to types
import type { NavigationLayoutInterface } from '../../NavigationLayout/constants/dist'
import NavigationLayout from './NavigationLayout'

export default ({
  items,
  currentProject,
  currentOrganization,
  projects,
  icon,
}: NavigationLayoutInterface) => {
  return (
    <NavigationLayout
      items={items}
      currentOrganization={currentOrganization}
      currentProject={currentProject}
      projects={projects}
      icon={icon}
    />
  )
}
