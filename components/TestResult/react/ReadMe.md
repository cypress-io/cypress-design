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
                <div className="px-[16px] py-[8px] border border-gray-100 flex">
                  <span className="flex-1">{group}</span>
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
                </div>
              ))
            : null
        }
      >
        <Button
          variant="outline-light"
          size="32"
          className="!px-[8px] hidden @xl/test-result:inline-block h-[32px]"
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
