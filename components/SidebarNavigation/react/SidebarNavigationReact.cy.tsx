/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import SidebarNavigationStory from './SidebarNavigation.rootstory'
import assertions from '../assertions'
import { SidebarNavigationInterface } from '../constants/dist'

describe(
  '<SidebarNavigation/>',
  { viewportHeight: 700, viewportWidth: 300 },
  () => {
    function mountStory(args: SidebarNavigationInterface) {
      const { items, currentOrganization, currentProject, projects, icon } =
        args
      mount(
        <SidebarNavigationStory
          items={items}
          currentOrganization={currentOrganization}
          currentProject={currentProject}
          projects={projects}
          icon={icon}
        />,
      )
    }
    assertions(mountStory)
  },
)
