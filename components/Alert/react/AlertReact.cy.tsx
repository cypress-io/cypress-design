/// <reference types="cypress" />

import * as React from 'react'
import dedent from 'dedent'
import { mount } from 'cypress/react'
import Alert from './Alert'
import { IconArrowRight } from '@cypress-design/react-icon'

const AlertStory = () => {
  const [displayTimedAlert, setDisplayTimedAlert] = React.useState(false)

  return (
    <div className="flex flex-col p-4 gap-[16px]">
      <Alert
        variant="error"
        title="Spec not found"
        detailsTitle="Stack trace"
        data-cy="alert-1"
        key="alert-1"
        details={
          <pre className="bg-white rounded border border-red-500 px-[16px] py-[8px] overflow-x-auto">
            {dedent`Uncaught Error: Error occurred in defineConfig()
            Trace: add called with  2 and 3
                at sum (/home/dev/Documents/stacktrace.js:2:13)
                at start (/home/dev/Documents/stacktrace.js:11:13)
                at Object. (/home/dev/Documents/stacktrace.js:16:1)
                at Module._compile (internal/modules/cjs/loader.js:959:30)
                at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
                at Module.load (internal/modules/cjs/loader.js:815:32)
                at Function.Module._load (internal/modules/cjs/loader.js:727:14)
                at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
                at internal/main/run_main_module.js:17:11
            Trace: add called with  8 and 11
                at sum (/home/dev/Documents/stacktrace.js:2:13)
                at calc (/home/dev/Documents/stacktrace.js:7:12)
                at start (/home/dev/Documents/stacktrace.js:12:13)
                at Object. (/home/dev/Documents/stacktrace.js:16:1)
                at Module._compile (internal/modules/cjs/loader.js:959:30)
                at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
                at Module.load (internal/modules/cjs/loader.js:815:32)
                at Function.Module._load (internal/modules/cjs/loader.js:727:14)
                at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
                at internal/main/run_main_module.js:17:11
            Trace: add called with  9 and 14
                at sum (/home/dev/Documents/stacktrace.js:2:13)
                at calc (/home/dev/Documents/stacktrace.js:7:25)
                at start (/home/dev/Documents/stacktrace.js:12:13)
                at Object. (/home/dev/Documents/stacktrace.js:16:1)
                at Module._compile (internal/modules/cjs/loader.js:959:30)
                at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
                at Module.load (internal/modules/cjs/loader.js:815:32)
                at Function.Module._load (internal/modules/cjs/loader.js:727:14)
                at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
                at internal/main/run_main_module.js:17:11`}
          </pre>
        }
      >
        There is no spec matching the following location:
        <code className="bg-red-100 text-red-600 m-[8px] rounded px-[2px]">
          path/to/spec.cy.js
        </code>
        <br />
        <br />
        It is possible that the file has since been moved or deleted. Please
        choose from the list of specs below
      </Alert>
      <button
        className="border rounded p-[8px]"
        onClick={() => setDisplayTimedAlert(true)}
      >
        open alert for 5 seconds
      </button>
      {displayTimedAlert ? (
        <Alert
          key="alert-2"
          title="Wait 5 seconds please"
          duration={5000}
          onDismiss={() => setDisplayTimedAlert(false)}
          dismissible
          data-cy="alert-2"
        />
      ) : null}
      <Alert
        key="alert-3"
        variant="success"
        dismissible
        title="Success with body"
        data-cy="alert-3"
      >
        Success body
      </Alert>
      <Alert key="alert-4" variant="warning" title="Warning" notRounded />
      <Alert key="alert-5" variant="neutral" title="Neutral" />
      <Alert
        key="alert-6"
        variant="error"
        dismissible
        data-cy="alert-4"
        className="text-justify"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum."
      />
      <Alert key="alert-7" variant="info" title="Info" />
      <Alert
        key="alert-8"
        variant="info"
        title="Info"
        customIcon={IconArrowRight}
      />
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <React.Fragment key={`alert-9-${size}`}>
          <Alert
            variant="error"
            title={`${size} - Lorem ipsum dolor sit amet`}
            data-cy="alert-size"
            size={size}
          />
          <Alert
            key={`alert-10-${size}`}
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
            variant="error"
            data-cy="alert-size"
            size={size}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

describe('Alert', { viewportHeight: 800 }, () => {
  it('renders', () => {
    mount(<AlertStory />)
    cy.percySnapshot()
  })
})
