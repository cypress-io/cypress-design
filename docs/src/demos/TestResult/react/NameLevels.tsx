import TestResult from '@cypress-design/react-testresult'

// Long titles truncate from the middle so the start and end stay readable.
const tests = [
  ['TestResult should render one level'],
  ['TestResult', 'should render two levels'],
  ['TestResult', 'should', 'render three levels'],
  ['TestResult', 'should', 'render', 'four levels'],
  ['TestResult', 'should', 'render', 'five', 'levels'],
  [
    'TestResult',
    'should',
    'render',
    'six',
    'levels',
    'and truncate the text from the middle when the title gets really really really really really long',
  ],
]

export default function NameLevels() {
  return (
    <div className="bg-white p-4">
      {tests.map((names) => (
        <TestResult key={names.join()} status="passed" names={names} />
      ))}
    </div>
  )
}
