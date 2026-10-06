import TestResult from '@cypress-design/react-testresult'

export default function Default() {
  return (
    <div className="bg-white p-4">
      {/* The last name is the test title; the ones before it are its describe blocks. */}
      <TestResult
        status="passed"
        names={['TestResult', 'should render two levels']}
      />
    </div>
  )
}
