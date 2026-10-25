import { useState } from 'react'
import TestResult from '@cypress-design/react-testresult'
import Button from '@cypress-design/react-button'
import { IconChevronRightSmall } from '@cypress-design/react-icon'

const groups = ['Chrome', 'Firefox', 'Safari']

export default function Groups() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white p-4">
      <TestResult
        status="passed"
        names={['TestResult', 'should render with groups']}
        flaky
        modified
        // Pass `groups` only while expanded.
        groups={
          open &&
          groups.map((group) => (
            <div
              key={group}
              className="border border-t-0 border-gray-100 px-4 py-2 first:border-t"
            >
              {group}
            </div>
          ))
        }
      >
        <Button
          variant="outline-light"
          size="32"
          className="!px-2"
          aria-label="Show groups"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <IconChevronRightSmall
            strokeColor="gray-500"
            className={open ? 'rotate-90' : ''}
          />
        </Button>
      </TestResult>
    </div>
  )
}
