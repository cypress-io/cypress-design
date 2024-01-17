/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import TestResult from './TestResult.vue'

const TEST_RESULTS = [
  {
    status: 'passed',
    names: ['Authentication'],
  },
  {
    status: 'passed',
    names: ['Authentication', 'renders'],
  },
  {
    status: 'failed',
    names: ['Authentication', 'Viewer role', 'should log in successfully'],
  },
  {
    status: 'errored',
    names: [
      'Authentication',
      'Admin role',
      'should log in successfully with proper credentials',
    ],
  },
  {
    status: 'skipped',
    names: [
      'Authentication',
      'All roles',
      'should be see error messages with improper credentials',
    ],
  },
  {
    status: 'running',
    names: [
      'Authentication',
      'All roles',
      'should logout successfully',
      'and be redirected to the homepage',
    ],
  },
]

describe('<TestResult/>', () => {
  function mountStory(options: ComponentProps<typeof TestResult> = {}) {
    mount(() => (
      <div class="p-[24px]">
        <div>
          {TEST_RESULTS.map((result) => (
            <TestResult status={result.status} names={result.names} />
          ))}
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
