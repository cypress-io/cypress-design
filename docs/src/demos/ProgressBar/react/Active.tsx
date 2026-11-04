import ProgressBar from '@cypress-design/react-progressbar'

// `active` animates the fill while the work is still going. Turn it off when
// it stops.
export default function Active() {
  return (
    <div className="rounded bg-white p-4">
      <ProgressBar value={36} active aria-label="Uploading test results" />
    </div>
  )
}
