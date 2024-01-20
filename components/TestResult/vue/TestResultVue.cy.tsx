/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import TestResult from './TestResult.vue'
import { TestResults } from '@cypress-design/constants-testresult'
import Button from '@cypress-design/vue-button'
import { IconActionTestReplay } from '@cypress-design/vue-icon'

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
            >
              <Button
                variant="outline-light"
                size="32"
                class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
              >
                <IconActionTestReplay />
                <span class="hidden @lg/test-result:inline ml-[8px]">
                  Test Replay
                </span>
              </Button>
            </TestResult>
          ))}
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
