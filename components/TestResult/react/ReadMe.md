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
import { IconActionTestReplay } from '@cypress-design/react-icon'

export const Demo = () => (
  <TestResult
    status="passed"
    names={['Test 1', 'Test 2']}
    flaky
    modified
    added
    hasGroups
    className="bg-white"
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
)
```
