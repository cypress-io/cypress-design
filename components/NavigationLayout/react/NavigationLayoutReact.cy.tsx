import * as React from 'react'
import { mount } from 'cypress/react18'
import NavigationLayoutStory from './NavigationLayout.rootstory'
import assertions from '../assertions'
import { NavigationLayoutInterface } from '../constants/dist'

describe(
  'NavigationLayout',
  { viewportHeight: 800, viewportWidth: 300 },
  () => {
    function mountStory(args: NavigationLayoutInterface) {
      const {
        items,
        currentProject,
        currentOrganization,
        projects,
        navigation,
      } = args
      mount(
        <NavigationLayoutStory
          items={items}
          currentProject={currentProject}
          currentOrganization={currentOrganization}
          projects={projects}
          navigation={navigation}
        />,
      )
    }
    assertions(mountStory)
  },
)
