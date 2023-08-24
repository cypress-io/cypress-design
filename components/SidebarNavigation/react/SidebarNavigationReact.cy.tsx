/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import SidebarNavigationStory from './SidebarNavigation.rootstory'
import assertions from '../assertions'
import { SidebarNavigationInterface } from '@cypress-design/constants-SidebarNavigation'

describe(
  '<SidebarNavigation/>',
  { viewportHeight: 800, viewportWidth: 300 },
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

    // it('should handle exceptions', () => {
    //   cy.on('uncaught:exception', (err) => {
    //     // const error = {
    //     //   message: err.message ? err.message : '',
    //     //   stack: err.stack ? err.stack : '',
    //     //   name: err.name ? err.name : ''
    //     // };
    //     cy.task('plainLanguageAdvice')
    //     return false
    //   })
    // })

    // afterEach(function () {
    //   // if (this?.currentTest?.state === 'failed' && this.currentTest.err) {
    //   cy.task('plainLanguageAdvice')
    //   // }
    // })

    assertions(mountStory)
  },
)
