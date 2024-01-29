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
import {
  IconChevronRightSmall,
  IconChevronDownSmall,
} from '@cypress-design/vue-icon'
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
      onClick={() => {
        if (result.groups) {
          showGroupBox.value = !showGroupBox.value
        }
      }}
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
            aria-label="expand"
            onClick={() => {
              if (result.groups) {
                showGroupBox.value = !showGroupBox.value
              }
            }}
          >
            <span class="sr-only">Expand</span>
            {result.groups ? (
              <IconChevronDownSmall
                stroke-color="gray-500"
                class={{
                  'transition-transform transform': true,
                  'rotate-180': showGroupBox.value,
                }}
              />
            ) : (
              <IconChevronRightSmall stroke-color="gray-500" />
            )}
          </Button>,
        ],
        groups: () =>
          showGroupBox.value ? (
            <div class="flex flex-col">
              {result.groups?.map((group) => (
                <div class="px-[16px] py-[12px] border border-gray-100 flex mb-[-1px] h-[56px]">
                  <span class="flex-1">{group}</span>
                  <Button
                    variant="outline-light"
                    size="32"
                    class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
                    aria-label="test replay"
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
