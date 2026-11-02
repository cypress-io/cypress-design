import ProgressBar from '@cypress-design/react-progressbar'

// Labelled segments are read out as "Open mode 233, Run mode 179". Show the
// same numbers as text so the colors aren't the only cue.
export default function Segments() {
  return (
    <div className="flex flex-col gap-3 rounded bg-white p-4">
      <ProgressBar
        max={412}
        aria-label="Test runs by mode"
        segments={[
          { value: 233, label: 'Open mode' },
          { value: 179, label: 'Run mode', color: 'teal' },
        ]}
      />
      <ul className="flex flex-col gap-1 text-sm text-gray-800">
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
          Open mode <span className="text-gray-700">233 (57%)</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-teal-400" />
          Run mode <span className="text-gray-700">179 (43%)</span>
        </li>
      </ul>
    </div>
  )
}
