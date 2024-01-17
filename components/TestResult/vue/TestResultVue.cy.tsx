/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import TestResult from './TestResult.vue'

describe('<TestResult/>', () => {
  function mountStory(
    options: ComponentProps<typeof TestResult> = {
      names: [
        'Authentication',
        'Admin and owner roles',
        'should be able to login successfully with proper credentials before being redirected to dashboard',
      ],
    },
  ) {
    mount(() => (
      <div class="p-[24px]">
        <div>
          <TestResult status="passed" {...options} />
          <TestResult status="failed" {...options} />
          <TestResult status="errored" {...options} />
          <TestResult status="skipped" {...options} />
          <TestResult status="running" {...options} />
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
