/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import TestResult from './TestResult'
import { TestResults } from '@cypress-design/constants-testresult'
import Button from '@cypress-design/react-button'
import { IconActionTestReplay } from '@cypress-design/react-icon'
import assertions from '../assertions'

describe('<TestResult/>', () => {
  function mountStory(options = {}) {
    mount(
      <div className="p-[16px]">
        <div>
          {TestResults.map((result) => (
            <TestResult
              key={result.id} // Assuming each result has a unique 'id' for key
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
                className="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
              >
                <IconActionTestReplay />
                <span className="hidden @lg/test-result:inline ml-[8px]">
                  Test Replay
                </span>
              </Button>
            </TestResult>
          ))}
        </div>
      </div>,
    )
  }

  assertions(mountStory)
})
