import ProgressBar from '@cypress-design/react-progressbar'

// Set `theme` explicitly; the component doesn't read a parent `dark` class.
export default function DarkTheme() {
  return (
    <div className="flex flex-col gap-4 rounded bg-gray-1000 p-4">
      <ProgressBar theme="dark" value={36} aria-label="Included tests used" />
      <ProgressBar
        theme="dark"
        max={412}
        aria-label="Test runs by mode"
        segments={[
          { value: 233, label: 'Open mode' },
          { value: 179, label: 'Run mode', color: 'teal' },
        ]}
      />
    </div>
  )
}
