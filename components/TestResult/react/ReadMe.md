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

```ts
import TestResult from '@cypress-design/react-testresult'
```

```tsx live
import { useState } from 'react'
import TestResult from '@cypress-design/react-testresult'
import Button from '@cypress-design/react-button'
import {
  IconActionTestReplay,
  IconChevronRightSmall,
} from '@cypress-design/react-icon'

export const Demo = () => {
  const [toggled, setToggled] = useState(false)
  return (
    <div className="bg-white p-2">
      <TestResult
        status="passed"
        names={['<TestResults />', 'playground']}
        flaky
        modified
        added
        groups={
          toggled
            ? ['Chrome', 'Firefox'].map((group) => (
                <div className="flex border border-gray-100 px-[16px] py-[8px]">
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
              ))
            : null
        }
      >
        <Button
          variant="outline-light"
          size="32"
          className="hidden h-[32px] !px-[8px] @xl/test-result:inline-block"
          onClick={() => setToggled(!toggled)}
        >
          <IconChevronRightSmall
            stroke-color="gray-500"
            className={`${toggled ? 'rotate-90' : ''} transform transition-transform`}
          />
        </Button>
      </TestResult>
    </div>
  )
}
```
