import * as React from 'react'
import Button from '@cypress-design/react-button'
import clsx from 'clsx'
// import {
//     NavGroup,
//     NavItemLink,
// } from '@cypress-design/constants-SidebarNavigation'

export interface Project {
  id: string | number
  label: string
}

export interface SidebarNavigationHeadProps
  extends React.HTMLAttributes<HTMLUListElement> {
  collapsible?: boolean
  currentProject: string
  currentTeam: string
  onProjectChange: (project: Project) => void
  projects: Project[]
}

export const SidebarNavigationHead: React.FC<SidebarNavigationHeadProps> = ({
  currentProject,
  currentTeam,
  onProjectChange,
  projects,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleProjectChange = (project: Project) => {
    setIsOpen(false)
    onProjectChange(project)
  }

  return (
    <div
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      className={clsx('list-none p-0', rest.className)}
    >
      <Button
        className="w-full"
        variant="outline-dark"
        onClick={handleButtonClick}
      >
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500">{currentTeam}</span>
          <span>{currentProject}</span>
        </div>
      </Button>
      {isOpen && (
        <div>
          {projects.map((project) => (
            <div key={project.id} onClick={() => handleProjectChange(project)}>
              {project.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarNavigationHead
