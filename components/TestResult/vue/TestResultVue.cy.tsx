/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import TestResult from './TestResult.vue'
import { TestResults } from '@cypress-design/constants-testresult'

describe('<TestResult/>', () => {
  function mountStory(options: ComponentProps<typeof TestResult> = {}) {
    mount(() => (
      <div class="p-[16px]">
        <div>
          {TestResults.map((result) => (
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
