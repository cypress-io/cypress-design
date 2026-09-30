import RunResults from '@cypress-design/react-runresults'

// Set `theme` explicitly; the component doesn't read a parent `dark` class.
export default function DarkTheme() {
  return (
    <div className="bg-gray-900 p-4 rounded">
      <RunResults
        passed={22}
        failed={4}
        skipped={0}
        pending={1}
        flaky={3}
        theme="dark"
      />
    </div>
  )
}
