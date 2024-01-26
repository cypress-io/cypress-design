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

const TestResultSut = (result: TestResultData & { groups?: string[] }) => {
  const showGroupBox = ref(false)

  return (
    <TestResult
      status={result.status}
      names={result.names}
      flaky={result.flaky}
      modified={result.modified}
      added={result.added}
    >
      {{
        actions: () => [
          !result.groups ? (
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
          ) : null,
          <Button
            variant="outline-light"
            size="32"
            class="!px-[8px] hidden @xl/test-result:inline-block"
            onClick={() => {
              if (result.groups) {
                showGroupBox.value = !showGroupBox.value
              }
            }}
          >
            <span class="sr-only">Expand Group</span>
            <IconChevronRightSmall
              stroke-color="gray-500"
              class={{
                'transition-transform transform': true,
                'rotate-90': showGroupBox.value,
              }}
            />
          </Button>,
        ],
        groups: () =>
          showGroupBox.value ? (
            <div>
              {result.groups?.map((group) => (
                <div class="px-[16px] py-[8px] border border-gray-100 flex">
                  <span class="flex-1">{group}</span>
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
                </div>
              ))}
            </div>
          ) : null,
      }}
    </TestResult>
  )
}

describe('<TestResult/>', () => {
  function mountStory() {
    mount(() => (
      <div class="p-[16px]">
        {TestResults.map((result) => (
          <TestResultSut key={result.id} {...result} />
        ))}
      </div>
    ))
  }
  assertions(mountStory)
})
