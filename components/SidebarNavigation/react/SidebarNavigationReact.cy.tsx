/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import SidebarNavigationStory from './SidebarNavigation.rootstory'
import assertions from '../assertions'
import { NavGroup, NavItemLink } from '../constants/dist'

describe('<SidebarNavigation/>', () => {
  function mountStory(
    items: (NavItemLink | NavGroup)[] = [],
    currentProject: string,
    projects: [],
    icon?: React.ReactNode,
  ) {
    mount(
      <SidebarNavigationStory
        items={items}
        currentProject={currentProject}
        projects={projects}
        icon={icon}
      />,
    )
  }
  assertions(mountStory)
})
