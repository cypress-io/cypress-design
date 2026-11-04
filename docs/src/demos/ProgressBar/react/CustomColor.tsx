import ProgressBar from '@cypress-design/react-progressbar'

// `fillClassName` is merged last, so any design-token `bg-*` class replaces
// the preset. `className` does the same for the track.
export default function CustomColor() {
  return (
    <div className="rounded bg-white p-4">
      <ProgressBar
        value={36}
        fillClassName="bg-teal-600"
        className="bg-teal-50"
        aria-label="Included tests used"
      />
    </div>
  )
}
