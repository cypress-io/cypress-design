import RunResults from '@cypress-design/react-runresults'

// `pillClassName` is merged with tailwind-merge, so it wins over the theme background.
export default function CustomBackground() {
  return (
    <div className="bg-gray-900 p-4 rounded">
      <RunResults
        passed={22}
        failed={4}
        skipped={0}
        pending={1}
        flaky={3}
        theme="dark"
        pillClassName="bg-gray-900"
      />
    </div>
  )
}
