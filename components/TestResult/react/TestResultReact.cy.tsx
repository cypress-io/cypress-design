/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import TestResult from './TestResult'
import {
  TestResultData,
  TestResults,
} from '@cypress-design/constants-testresult'
import Button from '@cypress-design/react-button'
import {
  IconActionTestReplay,
  IconChevronRightSmall,
} from '@cypress-design/react-icon'
import assertions from '../assertions'
import clsx from 'clsx'

const TestResultSut = (result: TestResultData & { groups?: string[] }) => {
  const [showGroupBox, setShowGroupBox] = React.useState(false)
  return (
    <TestResult
      {...result}
      groups={
        showGroupBox ? (
          <div className="flex flex-col">
            {result.groups?.map((group, index) => (
              <div
                key={group + index}
                className="mb-[-1px] flex h-[56px] border border-gray-100 px-[16px] py-[12px]"
              >
                <span className="flex-1">{group}</span>
                <Button
                  variant="outline-light"
                  size="32"
                  className="h-[32px] !px-[8px] @lg/test-result:!px-[12px]"
                >
                  <IconActionTestReplay />
                  <span className="ml-[8px] hidden @lg/test-result:inline">
                    Test Replay
                  </span>
                </Button>
              </div>
            ))}
          </div>
        ) : null
      }
      onClick={() => (result.groups ? setShowGroupBox(!showGroupBox) : null)}
    >
      {result.groups ? null : (
        <Button
          variant="outline-light"
          size="32"
          className="!px-[8px] @lg/test-result:!px-[12px]"
        >
          <IconActionTestReplay />
          <span className="ml-[8px] hidden @lg/test-result:inline">
            Test Replay
          </span>
        </Button>
      )}
      <Button
        variant="outline-light"
        size="32"
        className="hidden !px-[8px] @xl/test-result:inline-block"
        onClick={() => (result.groups ? setShowGroupBox(!showGroupBox) : null)}
      >
        <span className="sr-only">Expand Group</span>
        <IconChevronRightSmall
          stroke-color="gray-500"
          className={clsx({
            'transform transition-transform': true,
            'rotate-90': showGroupBox,
          })}
        />
      </Button>
    </TestResult>
  )
}

describe('<TestResult/>', () => {
  function mountStory() {
    mount(
      <div className="p-[16px]">
        {TestResults.map((result) => (
          <TestResultSut {...result} key={result.id} />
        ))}
      </div>,
    )
  }

  assertions(mountStory)
})
