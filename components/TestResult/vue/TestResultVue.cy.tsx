/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import TestResult from './TestResult.vue'
import {
  TestResultData,
  TestResults,
} from '@cypress-design/constants-testresult'
import Button from '@cypress-design/vue-button'
import { IconActionTestReplay } from '@cypress-design/vue-icon'
import { IconChevronRightSmall } from '@cypress-design/vue-icon'
import { ref } from 'vue'

const TestResultSut = (result: TestResultData) => {
  const showGroupBox = ref(false)
  return (
    <TestResult
      status={result.status}
      names={result.names}
      flaky={result.flaky}
      modified={result.modified}
      added={result.added}
    >
      <Button
        variant="outline-light"
        size="32"
        class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
      >
        <IconActionTestReplay />
        <span class="hidden @lg/test-result:inline ml-[8px]">Test Replay</span>
      </Button>
      <Button
        variant="outline-light"
        size="32"
        class="!px-[8px] hidden @xl/test-result:inline-block h-[32px]"
        onClick={() => (showGroupBox.value = !showGroupBox.value)}
      >
        <IconChevronRightSmall
          stroke-color="gray-500"
          class={{
            'transition-transform transform': true,
            'rotate-90': showGroupBox,
          }}
        />
      </Button>
    </TestResult>
  )
}

describe('<TestResult/>', () => {
  function mountStory() {
    mount(() => (
      <div class="p-[16px]">
        <div>
          {TestResults.map((result) => (
            <TestResultSut key={result.id} {...result} />
          ))}
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
