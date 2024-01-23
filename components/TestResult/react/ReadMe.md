# TestResult

## Install

```bash
npm install @cypress-design/react-testresult
```

or with yarn

```bash
yarn add @cypress-design/react-testresult
```

## Usage

```tsx live
import TestResult from '@cypress-design/react-testresult'
import Button from '@cypress-design/react-button'
import {
  IconActionTestReplay,
  IconChevronRightSmall,
} from '@cypress-design/react-icon'

export const Demo = () => (
  <div className="bg-white p-2">
    <TestResult
      status="passed"
      names={['<TestResults />', 'playground']}
      flaky
      modified
      added
      hasGroups
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
        className="!px-[8px] hidden @xl/test-result:inline-block h-[32px]"
      >
        <IconChevronRightSmall stroke-color="gray-500" />
      </Button>
    </TestResult>
  </div>
)
```
