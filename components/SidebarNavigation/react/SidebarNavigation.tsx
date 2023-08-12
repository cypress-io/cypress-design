import * as React from 'react'
import { SidebarNavigationHead } from './_SidebarNavigationHead'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { SidebarNavigationGroup } from './_SidebarNavigationGroup'
import type { SidebarNavigationInterface } from '../constants/dist'

import clsx from 'clsx'

export const SidebarNavigation: React.FC<SidebarNavigationInterface> = ({
  items,
  currentProject,
  currentTeam,
  onProjectChange,
  projects,
  className,
  ...rest
}) => {
  return (
    <div className="bg-gray-900 text-white">
      <SidebarNavigationHead
        currentProject={currentProject}
        currentTeam={currentTeam}
        onProjectChange={onProjectChange || (() => {})}
        projects={projects}
      />
      <ul {...rest} className={clsx('list-none p-0', className)}>
        {items.map((item, index) =>
          'items' in item ? (
            <li key={index} className="relative list-none p-0">
              <SidebarNavigationGroup group={item} />
            </li>
          ) : (
            <SidebarNavigationLink key={index} item={item} />
          ),
        )}
      </ul>
    </div>
  )
}

export default SidebarNavigation
