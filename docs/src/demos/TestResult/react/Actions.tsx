import TestResult from '@cypress-design/react-testresult'
import Button from '@cypress-design/react-button'
import { IconActionTestReplay } from '@cypress-design/react-icon'

export default function Actions() {
  return (
    <div className="bg-white p-4">
      {/* Children render as the row's actions. */}
      <TestResult
        status="passed"
        names={['TestResult', 'should render two levels']}
      >
        {/* @lg/test-result sizes the label to the row, not the viewport. */}
        <Button
          variant="outline-light"
          size="32"
          className="!px-2 @lg/test-result:!px-3"
        >
          <IconActionTestReplay />
          <span className="ml-2 hidden @lg/test-result:inline">
            Test Replay
          </span>
        </Button>
      </TestResult>
    </div>
  )
}
