import * as React from 'react'
import Button from '@cypress-design/react-button'
import clsx from 'clsx'
// import {
//     NavGroup,
//     NavItemLink,
// } from '@cypress-design/constants-SidebarNavigation'

export interface SidebarNavigationHeadProps
  extends React.HTMLAttributes<HTMLUListElement> {
  collapsible?: boolean
  currentProject: string
  onProjectChange: (project: string) => void
  projects: []
}

export const SidebarNavigationHead: React.FC<SidebarNavigationHeadProps> = ({
  currentProject,
  onProjectChange,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleProjectChange = (project: string) => {
    setIsOpen(false)
    onProjectChange(project)
  }

  return (
    <div {...rest} className={clsx('list-none p-0', rest.className)}>
      <Button
        className="w-full"
        variant="outline-dark
"
        onClick={handleButtonClick}
      >
        {currentProject}
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
