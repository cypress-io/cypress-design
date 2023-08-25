import * as React from 'react'

import type { NavigationLayoutInterface } from '@cypress-design/constants-navigationlayout'
import NavigationLayout from '@cypress-design/react-navigationlayout'

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
