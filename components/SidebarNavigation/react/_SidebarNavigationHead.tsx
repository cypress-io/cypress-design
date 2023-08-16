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
      className={clsx('flex flex-col list-none p-0', rest.className)}
    >
      <Button
        className="w-full rounded-none px-[16px] block"
        variant="outline-dark"
        onClick={handleButtonClick}
      >
        <div className="flex flex-row items-center">
          {/* Organization logo, or placeholder icon */}
          {currentOrganization?.icon && (
            <div className="mr-[16px] py-2">
              <currentOrganization.icon
                style={{ width: '32px', height: '32px' }}
                strokeColor="purple-400"
                fillColor="white-100"
                size={24}
              />
            </div>
          )}
          <div className="flex flex-col items-start gap-[6px]">
            <div className="text-gray-600 font-normal text-[14px] leading-[10px]">
              {currentOrganization.name}
            </div>
            <div className="text-[16px] leading-[16px]">{currentProject}</div>
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
