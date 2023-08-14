import * as React from 'react'
import Button from '@cypress-design/react-button'
import clsx from 'clsx'
import {
  SidebarNavigationHeadInterface,
  ProjectInterface,
} from '../constants/dist'

export const SidebarNavigationHead: React.FC<
  SidebarNavigationHeadInterface
> = ({
  currentProject,
  onProjectChange,
  projects,
  currentOrganization,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleProjectChange = (project: ProjectInterface) => {
    setIsOpen(false)
    onProjectChange(project)
  }

  return (
    <div
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      className={clsx('flex list-none p-0', rest.className)}
    >
      <Button
        className="w-full rounded-none"
        variant="outline-dark"
        onClick={handleButtonClick}
      >
        <div className="flex flex-row center">
          {/* Organization logo, or placeholder icon */}
          {currentOrganization?.icon && (
            <span className="mr-2">
              <currentOrganization.icon
                size="48"
                strokeColor="white-900"
                fillColor="white-100"
              />
            </span>
          )}
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500">
              {currentOrganization.name}
            </span>
            <span>{currentProject}</span>
          </div>
        </div>
      </Button>
      {isOpen && (
        <ul className="bg-white p-2 text-indigo-500">
          {projects.map((project) => (
            <li
              className="p-2"
              key={project.id}
              onClick={() => handleProjectChange(project)}
            >
              {project.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SidebarNavigationHead
