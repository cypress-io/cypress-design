/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import TestResult from './TestResult.vue'

const TEST_RESULTS = [
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult should render one level'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should render two levels'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should', 'render three levels'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should', 'render', 'four levels'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should', 'render', 'five', 'levels'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should render as passed'],
  },
  {
    status: 'failed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should render as failed'],
  },
  {
    status: 'errored',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should render as errored'],
  },
  {
    status: 'skipped',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should render as skipped'],
  },
  {
    status: 'running',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should render as running'],
  },
  {
    status: 'passed',
    flaky: true,
    modified: false,
    added: false,
    names: ['TestResult', 'should render as flaky'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: true,
    added: false,
    names: ['TestResult', 'should render as modified'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: true,
    names: ['TestResult', 'should render as added'],
  },
  {
    status: 'passed',
    flaky: true,
    modified: false,
    added: true,
    names: ['TestResult', 'should render as flaky and added'],
  },
  {
    status: 'passed',
    flaky: true,
    modified: true,
    added: false,
    names: ['TestResult', 'should render as flaky and modified'],
  },
]

describe('<TestResult/>', () => {
  function mountStory(options: ComponentProps<typeof TestResult> = {}) {
    mount(() => (
      <div class="p-[24px]">
        <div>
          {TEST_RESULTS.map((result) => (
            <TestResult
              status={result.status}
              names={result.names}
              flaky={result.flaky}
              modified={result.modified}
              added={result.added}
            />
          ))}
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
