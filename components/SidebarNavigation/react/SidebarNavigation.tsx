import * as React from 'react'
import { SidebarNavigationHead } from './_SidebarNavigationHead'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { SidebarNavigationGroup } from './_SidebarNavigationGroup'
import clsx from 'clsx'
import { IconGeneralPlaceholder } from '@cypress-design/react-icon'

export type NavItem = NavGroup | NavItemLink

export interface SidebarNavigationProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: NavItem[]
  collapsible?: boolean
  currentProject: string
  onProjectChange: (project: string) => void
  projects: []
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items,
  collapsible = true,
  currentProject,
  onProjectChange,
  projects,
  ...rest
}) => {
  return (
    <div>
      <SidebarNavigationHead
        currentProject={currentProject}
        onProjectChange={onProjectChange}
        projects={projects}
      />
      <ul {...rest} className={clsx('list-none p-0', rest.className)}>
        {items.map((item, index) =>
          'items' in item ? (
            <li key={index} className="relative list-none p-0">
              <SidebarNavigationGroup group={item} collapsible={collapsible} />
            </li>
          ) : (
            <SidebarNavigationLink
              key={index}
              item={item}
              collapsible={collapsible}
              icon={<IconGeneralPlaceholder />}
            />
          ),
        )}
      </ul>
    </div>
  )
}

export default SidebarNavigation
