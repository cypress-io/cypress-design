import * as React from 'react'
import { SidebarNavigationHead } from './_SidebarNavigationHead'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { SidebarNavigationGroup } from './_SidebarNavigationGroup'
import { SidebarNavigationFooter } from './_SidebarNavigationFooter'
import type { SidebarNavigationInterface } from '../constants/dist'

import clsx from 'clsx'

export const SidebarNavigation: React.FC<SidebarNavigationInterface> = ({
  items,
  currentProject,
  onProjectChange,
  projects,
  className,
  currentOrganization,
  ...rest
}) => {
  return (
    <nav className="bg-gray-900 text-white h-[100%]">
      <SidebarNavigationHead
        currentOrganization={currentOrganization}
        currentProject={currentProject}
        onProjectChange={onProjectChange || (() => {})}
        projects={projects}
      />
      <ul {...rest} className={clsx('list-none p-0', className)}>
        {items.map((item, index) =>
          'items' in item ? (
            <SidebarNavigationGroup key={index} group={item} />
          ) : (
            <SidebarNavigationLink key={index} item={item} />
          ),
        )}
      </ul>
      <SidebarNavigationFooter />
    </nav>
  )
}

export default SidebarNavigation
