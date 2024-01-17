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
    hasGroups: false,
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
    names: [
      'TestResult',
      'should',
      'render',
      'six',
      'levels',
      'and truncate the text from the middle when the title gets really really long',
    ],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as passed'],
  },
  {
    status: 'failed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as failed'],
  },
  {
    status: 'errored',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as errored'],
  },
  {
    status: 'skipped',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as skipped'],
  },
  {
    status: 'pending',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as pending'],
  },
  {
    status: 'cancelled',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as cancelled'],
  },
  {
    status: 'unclaimed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as unclaimed'],
  },
  {
    status: 'placeholder',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as placeholder'],
  },
  {
    status: 'running',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as running'],
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
    hasGroups: false,
    names: ['TestResult', 'should render as flaky and modified'],
  },
  {
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    hasGroups: true,
    names: ['TestResult', 'should render with multiple groups'],
  },
]

describe('<TestResult/>', () => {
  function mountStory(options: ComponentProps<typeof TestResult> = {}) {
    mount(() => (
      <div class="p-[16px]">
        <div>
          {TEST_RESULTS.map((result) => (
            <TestResult
              status={result.status}
              names={result.names}
              flaky={result.flaky}
              modified={result.modified}
              added={result.added}
              hasGroups={result.hasGroups}
            />
          ))}
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
