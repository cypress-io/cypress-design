/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
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

const TestResultSut = (result: TestResultData) => {
  const [hasGroups, setHasGroups] = React.useState(false)
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
        className="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
      >
        <IconActionTestReplay />
        <span className="hidden @lg/test-result:inline ml-[8px]">
          Test Replay
        </span>
      </Button>
      <Button
        variant="outline-light"
        size="32"
        className="!px-[8px] hidden @xl/test-result:inline-block"
        onClick={() => setHasGroups(!hasGroups)}
      >
        <IconChevronRightSmall
          stroke-color="gray-500"
          className={clsx({
            'transition-transform transform': true,
            'rotate-90': hasGroups,
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
        <div>
          {TestResults.map((result) => (
            <TestResultSut {...result} key={result.id} />
          ))}
        </div>
      </div>,
    )
  }

  assertions(mountStory)
})
